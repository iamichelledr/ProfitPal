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

  // ALL ZERO — NO FAKE DATA
  const quickStats = [
    { label: 'Calculations Today', value: '0', icon: Calculator, color: 'pp-blue' },
    { label: 'Saved Products', value: '0', icon: Save, color: 'pp-slate' },
    { label: 'Avg. Profit Margin', value: '0%', icon: TrendingUp, color: 'pp-green' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-pp-blue/10 text-pp-blue text-sm font-medium">
                Free Plan
              </span>
              <h1 className="font-heading text-3xl font-bold text-pp-dark mt-2">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-pp-slate mt-1">
                Start calculating your product pricing.
              </p>
            </div>

            <Link to="/calculator">
              <Button className="bg-gradient-brand text-white">
                <Calculator className="w-4 h-4 mr-2" />
                New Calculation
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-pp-slate">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="w-6 h-6 text-pp-slate" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Calculator</CardTitle>
                <CardDescription>
                  Calculate your product pricing in seconds
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center">
                <Calculator className="w-12 h-12 mx-auto text-pp-blue mb-3" />
                <p className="text-pp-slate mb-4">
                  No saved data in free plan.
                </p>

                <Link to="/calculator">
                  <Button className="bg-gradient-brand text-white">
                    Open Calculator
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* NO HISTORY */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing History</CardTitle>
                <CardDescription>
                  Available in Premium only
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center py-10">
                <History className="w-10 h-10 mx-auto text-pp-slate mb-3" />
                <p className="font-medium text-pp-dark">
                  No history available
                </p>
                <p className="text-sm text-pp-slate mb-4">
                  Upgrade to save and view your calculations
                </p>
              </CardContent>
            </Card>

          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* UPGRADE */}
            <Card className="border-pp-violet/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pp-violet">
                  <Crown className="w-5 h-5" />
                  Upgrade to Premium
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-pp-slate">
                    ✔ Save unlimited products
                  </p>
                  <p className="text-sm text-pp-slate">
                    ✔ Full pricing history
                  </p>
                  <p className="text-sm text-pp-slate">
                    ✔ Advanced analytics
                  </p>
                </div>

                <Link to="/pricing">
                  <Button className="w-full bg-gradient-brand text-white">
                    Upgrade - ₱149
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* QUICK LINKS */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <Link to="/calculator" className="flex gap-3 p-2">
                  <Calculator className="w-5 h-5" />
                  Calculator
                </Link>

                <Link to="/pricing" className="flex gap-3 p-2">
                  <Crown className="w-5 h-5" />
                  Upgrade
                </Link>
              </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </div>
  );
}
