import { eq, and } from "drizzle-orm";
import { affiliates, affiliateClicks, discountCodes, type InsertAffiliate, type InsertAffiliateClick, type InsertDiscountCode } from "../drizzle/schema";
import { getDb } from "./db";

export async function createAffiliate(userId: number, commissionRate: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const referralCode = `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
  const result = await db.insert(affiliates).values({
    userId,
    referralCode,
    commissionRate,
    totalEarnings: 0,
    totalClicks: 0,
    totalConversions: 0,
    isActive: 1,
  });

  return result;
}

export async function getAffiliateByUserId(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(affiliates).where(eq(affiliates.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAffiliateStats(affiliateId: number) {
  const db = await getDb();
  if (!db) return null;

  const affiliate = await db.select().from(affiliates).where(eq(affiliates.id, affiliateId)).limit(1);
  if (!affiliate.length) return null;

  const codes = await db.select().from(discountCodes).where(eq(discountCodes.affiliateId, affiliateId));
  
  return {
    ...affiliate[0],
    codes,
  };
}

export async function createDiscountCode(affiliateId: number, code: string, discountPercentage: number, maxUses?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(discountCodes).values({
    affiliateId,
    code: code.toUpperCase(),
    discountPercentage,
    maxUses,
    currentUses: 0,
    isActive: 1,
  });

  return result;
}

export async function getDiscountCode(code: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(discountCodes).where(eq(discountCodes.code, code.toUpperCase())).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function trackAffiliateClick(affiliateId: number, referralCode: string, ipAddress?: string, userAgent?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(affiliateClicks).values({
    affiliateId,
    referralCode,
    ipAddress,
    userAgent,
    converted: 0,
  });

  // Update total clicks
  const affiliate = await db.select().from(affiliates).where(eq(affiliates.id, affiliateId)).limit(1);
  if (affiliate.length) {
    await db.update(affiliates).set({ totalClicks: (affiliate[0].totalClicks || 0) + 1 }).where(eq(affiliates.id, affiliateId));
  }
}

export async function recordAffiliateConversion(referralCode: string, orderId: number, amount: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Find the discount code and affiliate
  const code = await db.select().from(discountCodes).where(eq(discountCodes.code, referralCode.toUpperCase())).limit(1);
  if (!code.length) return;

  const affiliateId = code[0].affiliateId;
  const commissionAmount = Math.round((amount * code[0].discountPercentage) / 100);

  // Update click to converted
  await db.update(affiliateClicks).set({ converted: 1, orderId }).where(
    and(eq(affiliateClicks.affiliateId, affiliateId), eq(affiliateClicks.referralCode, referralCode.toUpperCase()))
  );

  // Update affiliate stats
  const affiliate = await db.select().from(affiliates).where(eq(affiliates.id, affiliateId)).limit(1);
  if (affiliate.length) {
    await db.update(affiliates).set({
      totalConversions: (affiliate[0].totalConversions || 0) + 1,
      totalEarnings: (affiliate[0].totalEarnings || 0) + commissionAmount,
    }).where(eq(affiliates.id, affiliateId));
  }

  // Update discount code uses
  await db.update(discountCodes).set({ currentUses: (code[0].currentUses || 0) + 1 }).where(eq(discountCodes.id, code[0].id));
}

export async function getAffiliateClicks(affiliateId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(affiliateClicks).where(eq(affiliateClicks.affiliateId, affiliateId)).limit(limit);
  return result;
}
