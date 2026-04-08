import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Copy, Plus, TrendingUp, Users, DollarSign, Link2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AffiliateDashboard() {
  const [newCode, setNewCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(5);
  const [maxUses, setMaxUses] = useState("");

  // Queries
  const { data: affiliate, isLoading: profileLoading } = trpc.affiliate.getProfile.useQuery(undefined, {
    retry: false,
  });

  const { data: stats, isLoading: statsLoading } = trpc.affiliate.getStats.useQuery(undefined, {
    retry: false,
  });

  const { data: clicks, isLoading: clicksLoading } = trpc.affiliate.getClicks.useQuery(undefined, {
    retry: false,
  });

  // Mutations
  const createCodeMutation = trpc.affiliate.createCode.useMutation({
    onSuccess: () => {
      toast.success("Discount code created!");
      setNewCode("");
      setDiscountPercent(5);
      setMaxUses("");
      // Refetch stats
      trpc.useUtils().affiliate.getStats.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateCode = () => {
    if (!newCode.trim()) {
      toast.error("Please enter a code");
      return;
    }
    if (discountPercent < 5 || discountPercent > 10) {
      toast.error("Discount must be between 5-10%");
      return;
    }
    createCodeMutation.mutate({
      code: newCode,
      discountPercentage: discountPercent,
      maxUses: maxUses ? parseInt(maxUses) : undefined,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const conversionRate = clicks && clicks.length > 0 
    ? ((clicks.filter(c => c.converted).length / clicks.length) * 100).toFixed(1)
    : "0";

  const earnings = affiliate ? (affiliate.totalEarnings / 100).toFixed(2) : "0";

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Affiliate Dashboard</h1>
          <span className="text-muted-foreground">Affiliate Dashboard</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Earnings</p>
                <p className="text-3xl font-bold text-primary">${earnings}</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary/50" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Clicks</p>
                <p className="text-3xl font-bold text-primary">{affiliate?.totalClicks || 0}</p>
              </div>
              <Link2 className="w-8 h-8 text-primary/50" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Conversions</p>
                <p className="text-3xl font-bold text-primary">{affiliate?.totalConversions || 0}</p>
              </div>
              <Users className="w-8 h-8 text-primary/50" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Conversion Rate</p>
                <p className="text-3xl font-bold text-primary">{conversionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary/50" />
            </div>
          </Card>
        </div>

        {/* Create Code Section */}
        <Card className="p-8 bg-card border-border mb-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Create Discount Code</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Code</label>
                <Input
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="e.g., SAVE10"
                  className="bg-black border-border text-foreground"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Discount %</label>
                <Input
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Math.min(10, Math.max(5, parseInt(e.target.value) || 5)))}
                  min="5"
                  max="10"
                  className="bg-black border-border text-foreground"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Max Uses (Optional)</label>
                <Input
                  type="number"
                  value={maxUses}
                  onChange={(e) => setMaxUses(e.target.value)}
                  placeholder="Unlimited"
                  className="bg-black border-border text-foreground"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleCreateCode}
                  disabled={createCodeMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-black font-semibold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Code
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Discount Codes */}
        <Card className="p-8 bg-card border-border mb-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Your Discount Codes</h2>
          {stats?.codes && stats.codes.length > 0 ? (
            <div className="space-y-4">
              {stats.codes.map((code) => (
                <div key={code.id} className="flex items-center justify-between p-4 bg-black rounded-lg border border-border">
                  <div>
                    <p className="font-mono font-bold text-primary text-lg">{code.code}</p>
                    <p className="text-sm text-muted-foreground">
                      {code.discountPercentage}% off • {code.currentUses || 0} uses
                      {code.maxUses && ` / ${code.maxUses}`}
                    </p>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(code.code)}
                    variant="outline"
                    className="border-border text-foreground hover:bg-muted"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No discount codes yet. Create one above!</p>
          )}
        </Card>

        {/* Recent Clicks */}
        <Card className="p-8 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Recent Activity</h2>
          {clicks && clicks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground">Code</th>
                    <th className="text-left py-2 text-muted-foreground">Status</th>
                    <th className="text-left py-2 text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {clicks.slice(0, 10).map((click) => (
                    <tr key={click.id} className="border-b border-border/50">
                      <td className="py-3 font-mono text-foreground">{click.referralCode}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${click.converted ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                          {click.converted ? "Converted" : "Pending"}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">{new Date(click.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No clicks yet. Share your codes to get started!</p>
          )}
        </Card>
      </main>
    </div>
  );
}
