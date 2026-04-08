import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createAffiliate, getAffiliateByUserId, getAffiliateStats, createDiscountCode, getDiscountCode, trackAffiliateClick, recordAffiliateConversion, getAffiliateClicks } from "./affiliates";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  affiliate: router({
    // Get or create affiliate profile
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      const affiliate = await getAffiliateByUserId(ctx.user.id);
      if (!affiliate) {
        // Create new affiliate with 5% default commission
        await createAffiliate(ctx.user.id, 5);
        return await getAffiliateByUserId(ctx.user.id);
      }
      return affiliate;
    }),

    // Get affiliate stats
    getStats: protectedProcedure.query(async ({ ctx }) => {
      const affiliate = await getAffiliateByUserId(ctx.user.id);
      if (!affiliate) return null;
      return await getAffiliateStats(affiliate.id);
    }),

    // Create new discount code
    createCode: protectedProcedure
      .input(z.object({
        code: z.string().min(3).max(32),
        discountPercentage: z.number().min(5).max(10),
        maxUses: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const affiliate = await getAffiliateByUserId(ctx.user.id);
        if (!affiliate) throw new Error("Affiliate profile not found");

        await createDiscountCode(affiliate.id, input.code, input.discountPercentage, input.maxUses);
        return { success: true, code: input.code.toUpperCase() };
      }),

    // Get all affiliate clicks
    getClicks: protectedProcedure.query(async ({ ctx }) => {
      const affiliate = await getAffiliateByUserId(ctx.user.id);
      if (!affiliate) return [];
      return await getAffiliateClicks(affiliate.id);
    }),

    // Public: Track click when user uses referral link
    trackClick: publicProcedure
      .input(z.object({
        referralCode: z.string(),
        ipAddress: z.string().optional(),
        userAgent: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const code = await getDiscountCode(input.referralCode);
        if (!code) throw new Error("Invalid referral code");
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
