import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Calculator,
  TrendingUp,
  Crown,
  ArrowRight,
  Sparkles,
  History,
  Save,
  BarChart3,
  User,
  Settings,
  HelpCircle,
  Download,
  TrendingDown,
  Package,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getUserCalculations } from '@/lib/calculations';

type SavedProduct = {
  id: string;
  name: string;
  category: string;
  cost: string;
  srp: string;
  margin: string;
};

type CalculationHistoryItem = {
  id: string;
  productName: string;
  category: string;
  totalCost: number;
  suggestedPrice: number;
  profitAmount: number;
  profitMargin: number;
  createdAt?: {
    toDate?: () => Date;
  };
};

export default function PremiumDashboard() {
  const { user, loading } = useAuth();

  const [historyLoading, setHistoryLoading] = useState(true);
  const [recentHistory, setRecentHistory] = useState<CalculationHistoryItem[]>([]);
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);

  useEffect(() => {
    const loadCalculations = async () => {
      if (!user?.uid) {
        setRecentHistory([]);
        setSavedProducts([]);
        setHistoryLoading(false);
        return;
      }

      try {
        setHistoryLoading(true);

        const records = (await getUserCalculations(user.uid)) as CalculationHistoryItem[];

        setRecentHistory(records);

        const uniqueProductsMap = new Map<string, SavedProduct>();

        records.forEach((item) => {
          const key = item.productName?.trim().toLowerCase() || item.id;

          if (!uniqueProductsMap.has(key)) {
            uniqueProductsMap.set(key, {
              id: item.id,
              name: item.productName || 'Untitled Product',
              category: item.category || 'General',
              cost: formatCurrency(Number(item.totalCost || 0)),
              srp: formatCurrency(Number(item.suggestedPrice || 0)),
              margin: `${Math.round(Number(item.profitMargin || 0))}%`,
            });
          }
        });

        setSavedProducts(Array.from(uniqueProductsMap.values()));
      } catch (error) {
        console.error('Failed to load calculations:', error);
        setRecentHistory([]);
        setSavedProducts([]);
      } finally {
        setHistoryLoading(false);
      }
    };

    loadCalculations();
  }, [user?.uid]);

  const totalCalculations = recentHistory.length;
  const totalSavedProducts = savedProducts.length;

  const avgProfitMargin = useMemo(() => {
    if (recentHistory.length === 0) return 0;

    const total = recentHistory.reduce(
      (sum, item) => sum + Number(item.profitMargin || 0),
      0
    );

    return Math.round(total / recentHistory.length);
  }, [recentHistory]);

  const totalProfitTracked = useMemo(() => {
    if (recentHistory.length === 0) return 0;

    return recentHistory.reduce(
      (sum, item) => sum + Number(item.profitAmount || 0),
      0
    );
  }, [recentHistory]);

  const quickStats = [
    {
      label: 'Total Calculations',
      value: totalCalculations.toString(),
      icon: Calculator,
      bgClass: 'bg-pp-blue/10',
      textClass: 'text-pp-blue',
      change: totalCalculations > 0 ? 'Based on saved history' : 'No history yet',
    },
    {
      label: 'Saved Products',
      value: totalSavedProducts.toString(),
      icon: Save,
      bgClass: 'bg-pp-violet/10',
      textClass: 'text-pp-violet',
      change: totalSavedProducts > 0 ? 'Unique saved products' : 'No saved products yet',
    },
    {
      label: 'Avg. Profit Margin',
      value: `${avgProfitMargin}%`,
      icon: TrendingUp,
      bgClass: 'bg-pp-green/10',
      textClass: 'text-pp-green',
      change: recentHistory.length > 0 ? 'From saved calculations' : 'No data yet',
    },
    {
      label: 'Total Profit Tracked',
      value: formatCurrency(totalProfitTracked),
      icon: BarChart3,
      bgClass: 'bg-amber-500/10',
      textClass: 'text-amber-500',
      change: recentHistory.length > 0 ? 'Accumulated saved profit' : 'No data yet',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-20 bg-gradient-soft flex items-center justify-center">
        <p className="text-pp-slate">Loading premium dashboard...</p>
      </div>
    );
  }

  if (!user || user.type !== 'premium' || user.isPremiumVerified !== true) {
    return <Navigate to="/pricing" replace />;
  }

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-gradient-brand text-white text-sm font-medium flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Premium
                </span>
                <span className="px-3 py-1 rounded-full bg-pp-green/10 text-pp-green text-sm font-medium">
                  Active
                </span>
              </div>
              <h1 className="font-heading text-3xl font-bold text-pp-dark">
                Welcome back, {user.name || 'Premium User'}!
              </h1>
              <p className="text-pp-slate mt-1">
                Your Premium dashboard with full access to all features.
              </p>
            </div>

            <div className="flex gap-3">
              <Link to="/calculator">
                <Button className="bg-gradient-brand hover:opacity-90 text-white">
                  <Calculator className="w-4 h-4 mr-2" />
                  New Calculation
                </Button>
              </Link>

              <Button variant="outline" disabled={recentHistory.length === 0}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bgClass}`}>
                    <stat.icon className={`w-5 h-5 ${stat.textClass}`} />
                  </div>
                </div>
                <p className="text-sm text-pp-slate mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-pp-dark">{stat.value}</p>
                <p className="text-xs text-pp-slate mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Save className="w-5 h-5 text-pp-violet" />
                    Saved Products
                  </CardTitle>
                  <CardDescription>
                    Your product library with pricing details
                  </CardDescription>
                </div>

                {savedProducts.length > 0 && (
                  <Link to="/calculator">
                    <Button variant="ghost" size="sm" className="text-pp-blue">
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                )}
              </CardHeader>

              <CardContent>
                {historyLoading ? (
                  <div className="rounded-xl bg-pp-light p-6 text-center">
                    <p className="text-pp-slate">Loading saved products...</p>
                  </div>
                ) : savedProducts.length === 0 ? (
                  <div className="rounded-xl bg-pp-light p-6 text-center">
                    <Save className="w-10 h-10 text-pp-violet mx-auto mb-3" />
                    <p className="font-medium text-pp-dark mb-1">No saved products yet</p>
                    <p className="text-sm text-pp-slate mb-4">
                      Your saved product pricing records will appear here after you save calculations.
                    </p>
                    <Link to="/calculator">
                      <Button variant="outline">Go to Calculator</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-pp-slate/10">
                          <th className="text-left py-3 px-2 text-sm font-medium text-pp-slate">
                            Product
                          </th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-pp-slate">
                            Category
                          </th>
                          <th className="text-right py-3 px-2 text-sm font-medium text-pp-slate">
                            Cost
                          </th>
                          <th className="text-right py-3 px-2 text-sm font-medium text-pp-slate">
                            SRP
                          </th>
                          <th className="text-right py-3 px-2 text-sm font-medium text-pp-slate">
                            Margin
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {savedProducts.map((product) => (
                          <tr
                            key={product.id}
                            className="border-b border-pp-slate/10 hover:bg-pp-blue/5 transition-colors"
                          >
                            <td className="py-3 px-2">
                              <p className="font-medium text-pp-dark">{product.name}</p>
                            </td>
                            <td className="py-3 px-2">
                              <span className="px-2 py-1 rounded-full bg-pp-blue/10 text-pp-blue text-xs">
                                {product.category}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-right text-pp-slate">{product.cost}</td>
                            <td className="py-3 px-2 text-right font-medium text-pp-blue">{product.srp}</td>
                            <td className="py-3 px-2 text-right">
                              <span className="text-pp-green font-medium">{product.margin}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-pp-blue" />
                    Pricing History
                  </CardTitle>
                  <CardDescription>
                    Your complete calculation history
                  </CardDescription>
                </div>

                {recentHistory.length > 0 && (
                  <Button variant="ghost" size="sm" className="text-pp-blue" disabled>
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                )}
              </CardHeader>

              <CardContent>
                {historyLoading ? (
                  <div className="rounded-xl bg-pp-light p-6 text-center">
                    <p className="text-pp-slate">Loading pricing history...</p>
                  </div>
                ) : recentHistory.length === 0 ? (
                  <div className="rounded-xl bg-pp-light p-6 text-center">
                    <History className="w-10 h-10 text-pp-blue mx-auto mb-3" />
                    <p className="font-medium text-pp-dark mb-1">No pricing history yet</p>
                    <p className="text-sm text-pp-slate mb-4">
                      Your completed pricing calculations will appear here after saving them.
                    </p>
                    <Link to="/calculator">
                      <Button variant="outline">Create First Calculation</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentHistory.slice(0, 5).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-pp-light hover:bg-pp-blue/5 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-pp-blue/10 flex items-center justify-center">
                            <Calculator className="w-5 h-5 text-pp-blue" />
                          </div>
                          <div>
                            <p className="font-medium text-pp-dark">
                              {item.productName || 'Untitled Product'}
                            </p>
                            <p className="text-sm text-pp-slate">
                              {item.createdAt?.toDate
                                ? item.createdAt.toDate().toLocaleString()
                                : 'Recently saved'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-pp-blue">
                            {formatCurrency(Number(item.suggestedPrice || 0))}
                          </p>
                          <p className="text-sm text-pp-green">
                            +{formatCurrency(Number(item.profitAmount || 0))}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-pp-green" />
                  Batch Costing Tools
                </CardTitle>
                <CardDescription>
                  Advanced tools for bulk production costing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-pp-blue/5 border border-pp-blue/10">
                    <div className="w-10 h-10 rounded-lg bg-pp-blue/10 flex items-center justify-center mb-3">
                      <BarChart3 className="w-5 h-5 text-pp-blue" />
                    </div>
                    <h4 className="font-medium text-pp-dark mb-1">Production Analysis</h4>
                    <p className="text-sm text-pp-slate mb-3">
                      Analyze costs across multiple batches
                    </p>
                    <Button variant="ghost" size="sm" className="text-pp-blue" disabled>
                      Open Tool <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>

                  <div className="p-4 rounded-xl bg-pp-violet/5 border border-pp-violet/10">
                    <div className="w-10 h-10 rounded-lg bg-pp-violet/10 flex items-center justify-center mb-3">
                      <TrendingDown className="w-5 h-5 text-pp-violet" />
                    </div>
                    <h4 className="font-medium text-pp-dark mb-1">Price Optimization</h4>
                    <p className="text-sm text-pp-slate mb-3">
                      Find the optimal price for maximum profit
                    </p>
                    <Button variant="ghost" size="sm" className="text-pp-violet" disabled>
                      Open Tool <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="shadow-card bg-gradient-to-br from-pp-violet/10 to-pp-blue/10 border-pp-violet/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-pp-dark mb-2">
                  Premium Member
                </h3>
                <p className="text-sm text-pp-slate mb-4">
                  You have access to all Premium features
                </p>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-pp-violet" />
                  <span className="text-pp-violet font-medium">All features unlocked</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link
                    to="/calculator"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-pp-blue/5 transition-colors"
                  >
                    <Calculator className="w-5 h-5 text-pp-blue" />
                    <span className="text-pp-dark">Calculator</span>
                  </Link>

                  <button
                    disabled
                    className="w-full flex items-center gap-3 p-3 rounded-lg opacity-60 cursor-not-allowed"
                  >
                    <Save className="w-5 h-5 text-pp-violet" />
                    <span className="text-pp-dark">Saved Products</span>
                  </button>

                  <button
                    disabled
                    className="w-full flex items-center gap-3 p-3 rounded-lg opacity-60 cursor-not-allowed"
                  >
                    <History className="w-5 h-5 text-pp-green" />
                    <span className="text-pp-dark">Full History</span>
                  </button>

                  <button
                    disabled
                    className="w-full flex items-center gap-3 p-3 rounded-lg opacity-60 cursor-not-allowed"
                  >
                    <BarChart3 className="w-5 h-5 text-pp-slate" />
                    <span className="text-pp-dark">Analytics</span>
                  </button>

                  <button
                    disabled
                    className="w-full flex items-center gap-3 p-3 rounded-lg opacity-60 cursor-not-allowed"
                  >
                    <User className="w-5 h-5 text-pp-slate" />
                    <span className="text-pp-dark">Profile</span>
                  </button>

                  <button
                    disabled
                    className="w-full flex items-center gap-3 p-3 rounded-lg opacity-60 cursor-not-allowed"
                  >
                    <Settings className="w-5 h-5 text-pp-slate" />
                    <span className="text-pp-dark">Settings</span>
                  </button>

                  <button
                    disabled
                    className="w-full flex items-center gap-3 p-3 rounded-lg opacity-60 cursor-not-allowed"
                  >
                    <HelpCircle className="w-5 h-5 text-pp-slate" />
                    <span className="text-pp-dark">Help & Support</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Usage This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-pp-slate">Calculations</span>
                      <span className="text-pp-dark">{totalCalculations} / Unlimited</span>
                    </div>
                    <div className="h-2 rounded-full bg-pp-slate/10 overflow-hidden">
                      <div className="h-full rounded-full bg-pp-blue" style={{ width: totalCalculations > 0 ? '25%' : '0%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-pp-slate">Saved Products</span>
                      <span className="text-pp-dark">{totalSavedProducts} / Unlimited</span>
                    </div>
                    <div className="h-2 rounded-full bg-pp-slate/10 overflow-hidden">
                      <div className="h-full rounded-full bg-pp-violet" style={{ width: totalSavedProducts > 0 ? '20%' : '0%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-pp-slate">Storage</span>
                      <span className="text-pp-dark">{totalCalculations > 0 ? '1 MB' : '0 MB'} / 1 GB</span>
                    </div>
                    <div className="h-2 rounded-full bg-pp-slate/10 overflow-hidden">
                      <div className="h-full rounded-full bg-pp-green" style={{ width: totalCalculations > 0 ? '1%' : '0%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(value);
}
