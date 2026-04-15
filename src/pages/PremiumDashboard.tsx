import { Link } from 'react-router-dom';
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
  Calendar,
  Package,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function PremiumDashboard() {
  const { user } = useAuth();

  const quickStats = [
    { label: 'Total Calculations', value: '156', icon: Calculator, color: 'pp-blue', change: '+12 this week' },
    { label: 'Saved Products', value: '24', icon: Save, color: 'pp-violet', change: '+3 new' },
    { label: 'Avg. Profit Margin', value: '38%', icon: TrendingUp, color: 'pp-green', change: '+5%' },
    { label: 'Total Profit Tracked', value: '₱45,230', icon: BarChart3, color: 'amber-500', change: 'This month' },
  ];

  const savedProducts = [
    { name: 'Chocolate Chip Cookies', category: 'Baked Goods', cost: '₱50.00', srp: '₱75.00', margin: '50%' },
    { name: 'Brownies (12 pcs)', category: 'Baked Goods', cost: '₱120.00', srp: '₱180.00', margin: '50%' },
    { name: 'Cupcakes (6 pcs)', category: 'Baked Goods', cost: '₱80.00', srp: '₱120.00', margin: '50%' },
    { name: 'Custom Cake 8"', category: 'Cakes', cost: '₱450.00', srp: '₱750.00', margin: '67%' },
  ];

  const recentHistory = [
    { name: 'Chocolate Chip Cookies', date: 'Today, 2:30 PM', srp: '₱75.00', profit: '₱25.00' },
    { name: 'Brownies (12 pcs)', date: 'Today, 10:15 AM', srp: '₱180.00', profit: '₱60.00' },
    { name: 'Cupcakes (6 pcs)', date: 'Yesterday, 4:45 PM', srp: '₱120.00', profit: '₱40.00' },
    { name: 'Custom Cake 8"', date: 'Yesterday, 11:20 AM', srp: '₱750.00', profit: '₱300.00' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
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
                Welcome back, {user?.name || 'Premium User'}!
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
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                  </div>
                </div>
                <p className="text-sm text-pp-slate mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-pp-dark">{stat.value}</p>
                <p className="text-xs text-pp-green mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Saved Products */}
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
                <Link to="/calculator">
                  <Button variant="ghost" size="sm" className="text-pp-blue">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-pp-slate/10">
                        <th className="text-left py-3 px-2 text-sm font-medium text-pp-slate">Product</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-pp-slate">Category</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-pp-slate">Cost</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-pp-slate">SRP</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-pp-slate">Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedProducts.map((product, index) => (
                        <tr key={index} className="border-b border-pp-slate/10 hover:bg-pp-blue/5 transition-colors">
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
              </CardContent>
            </Card>

            {/* Pricing History */}
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
                <Button variant="ghost" size="sm" className="text-pp-blue">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentHistory.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-pp-light hover:bg-pp-blue/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-pp-blue/10 flex items-center justify-center">
                          <Calculator className="w-5 h-5 text-pp-blue" />
                        </div>
                        <div>
                          <p className="font-medium text-pp-dark">{item.name}</p>
                          <p className="text-sm text-pp-slate flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-pp-blue">{item.srp}</p>
                        <p className="text-sm text-pp-green">+{item.profit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Batch Costing Tools */}
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
                    <p className="text-sm text-pp-slate mb-3">Analyze costs across multiple batches</p>
                    <Button variant="ghost" size="sm" className="text-pp-blue">
                      Open Tool <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  <div className="p-4 rounded-xl bg-pp-violet/5 border border-pp-violet/10">
                    <div className="w-10 h-10 rounded-lg bg-pp-violet/10 flex items-center justify-center mb-3">
                      <TrendingDown className="w-5 h-5 text-pp-violet" />
                    </div>
                    <h4 className="font-medium text-pp-dark mb-1">Price Optimization</h4>
                    <p className="text-sm text-pp-slate mb-3">Find the optimal price for maximum profit</p>
                    <Button variant="ghost" size="sm" className="text-pp-violet">
                      Open Tool <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Premium Badge */}
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

            {/* Quick Links */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link to="/calculator" className="flex items-center gap-3 p-3 rounded-lg hover:bg-pp-blue/5 transition-colors">
                    <Calculator className="w-5 h-5 text-pp-blue" />
                    <span className="text-pp-dark">Calculator</span>
                  </Link>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-pp-blue/5 transition-colors">
                    <Save className="w-5 h-5 text-pp-violet" />
                    <span className="text-pp-dark">Saved Products</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-pp-blue/5 transition-colors">
                    <History className="w-5 h-5 text-pp-green" />
                    <span className="text-pp-dark">Full History</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-pp-blue/5 transition-colors">
                    <BarChart3 className="w-5 h-5 text-pp-slate" />
                    <span className="text-pp-dark">Analytics</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-pp-blue/5 transition-colors">
                    <User className="w-5 h-5 text-pp-slate" />
                    <span className="text-pp-dark">Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-pp-blue/5 transition-colors">
                    <Settings className="w-5 h-5 text-pp-slate" />
                    <span className="text-pp-dark">Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-pp-blue/5 transition-colors">
                    <HelpCircle className="w-5 h-5 text-pp-slate" />
                    <span className="text-pp-dark">Help & Support</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Usage This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-pp-slate">Calculations</span>
                      <span className="text-pp-dark">156 / Unlimited</span>
                    </div>
                    <div className="h-2 rounded-full bg-pp-slate/10 overflow-hidden">
                      <div className="h-full w-1/4 rounded-full bg-pp-blue" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-pp-slate">Saved Products</span>
                      <span className="text-pp-dark">24 / Unlimited</span>
                    </div>
                    <div className="h-2 rounded-full bg-pp-slate/10 overflow-hidden">
                      <div className="h-full w-1/5 rounded-full bg-pp-violet" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-pp-slate">Storage</span>
                      <span className="text-pp-dark">45 MB / 1 GB</span>
                    </div>
                    <div className="h-2 rounded-full bg-pp-slate/10 overflow-hidden">
                      <div className="h-full w-[5%] rounded-full bg-pp-green" />
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
