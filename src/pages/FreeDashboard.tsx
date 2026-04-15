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
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function FreeDashboard() {
  const { user } = useAuth();

  const quickStats = [
    { label: 'Calculations Today', value: '3', icon: Calculator, color: 'pp-blue' },
    { label: 'Saved Products', value: '0', icon: Save, color: 'pp-slate' },
    { label: 'Avg. Profit Margin', value: '32%', icon: TrendingUp, color: 'pp-green' },
  ];

  const recentCalculations = [
    { name: 'Chocolate Chip Cookies', date: 'Today', srp: '₱75.00', profit: '₱25.00' },
    { name: 'Brownies (12 pcs)', date: 'Yesterday', srp: '₱180.00', profit: '₱60.00' },
    { name: 'Cupcakes (6 pcs)', date: '2 days ago', srp: '₱120.00', profit: '₱40.00' },
  ];

  const premiumFeatures = [
    { icon: Save, title: 'Save Unlimited Products', description: 'Keep track of all your product recipes' },
    { icon: History, title: 'Full Pricing History', description: 'Access all your past calculations' },
    { icon: BarChart3, title: 'Advanced Analytics', description: 'Detailed reports and insights' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-pp-blue/10 text-pp-blue text-sm font-medium">
                  Free Plan
                </span>
              </div>
              <h1 className="font-heading text-3xl font-bold text-pp-dark">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-pp-slate mt-1">
                Here&apos;s what&apos;s happening with your pricing today.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/calculator">
                <Button className="bg-gradient-brand hover:opacity-90 text-white">
                  <Calculator className="w-4 h-4 mr-2" />
                  New Calculation
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-pp-slate mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-pp-dark">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Calculator Access */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-pp-blue" />
                  Quick Calculator
                </CardTitle>
                <CardDescription>
                  Calculate your product pricing in seconds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-pp-blue/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-pp-dark mb-2">
                    Ready to Price Your Next Product?
                  </h3>
                  <p className="text-pp-slate text-sm mb-4 max-w-md mx-auto">
                    Enter your costs and get instant pricing recommendations 
                    with profit breakdown.
                  </p>
                  <Link to="/calculator">
                    <Button className="bg-gradient-brand hover:opacity-90 text-white">
                      Open Calculator
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Calculations */}
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-pp-blue" />
                    Recent Calculations
                  </CardTitle>
                  <CardDescription>
                    Your last 3 calculations (Free limit)
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentCalculations.map((calc, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-pp-light hover:bg-pp-blue/5 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-pp-dark">{calc.name}</p>
                        <p className="text-sm text-pp-slate">{calc.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-pp-blue">{calc.srp}</p>
                        <p className="text-sm text-pp-green">+{calc.profit} profit</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-lg bg-pp-slate/5 text-center">
                  <p className="text-sm text-pp-slate">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    Upgrade to Premium to save unlimited calculations
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upgrade Banner */}
            <Card className="shadow-card border-pp-violet/20 bg-gradient-to-br from-pp-violet/5 to-pp-blue/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pp-violet">
                  <Crown className="w-5 h-5" />
                  Upgrade to Premium
                </CardTitle>
                <CardDescription>
                  Unlock the full power of ProfitPal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-pp-violet/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-pp-violet" />
                      </div>
                      <div>
                        <p className="font-medium text-pp-dark text-sm">{feature.title}</p>
                        <p className="text-xs text-pp-slate">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/pricing">
                  <Button className="w-full bg-gradient-brand hover:opacity-90 text-white">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Now - ₱149/mo
                  </Button>
                </Link>
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
                  <Link to="/features" className="flex items-center gap-3 p-3 rounded-lg hover:bg-pp-blue/5 transition-colors">
                    <Sparkles className="w-5 h-5 text-pp-violet" />
                    <span className="text-pp-dark">Features</span>
                  </Link>
                  <Link to="/pricing" className="flex items-center gap-3 p-3 rounded-lg hover:bg-pp-blue/5 transition-colors">
                    <Crown className="w-5 h-5 text-pp-green" />
                    <span className="text-pp-dark">Pricing</span>
                  </Link>
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

            {/* Plan Info */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-pp-slate">Current Plan</span>
                  <span className="px-2 py-1 rounded-full bg-pp-blue/10 text-pp-blue text-xs font-medium">
                    Free
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-pp-slate">Calculations/day</span>
                    <span className="text-pp-dark">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pp-slate">Saved products</span>
                    <span className="text-pp-dark">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pp-slate">History</span>
                    <span className="text-pp-dark">3 days</span>
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
