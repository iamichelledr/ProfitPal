import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Package,
  Users,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0', 'translate-y-6');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-pp-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pp-violet/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pp-green/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pp-blue/10 text-pp-blue text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Free Pricing Calculator for Everyone</span>
              </div>
              
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-pp-dark leading-tight mb-6">
                Stop Guessing Your Prices.{' '}
                <span className="text-gradient">Start Earning Real Profit.</span>
              </h1>
              
              <p className="text-lg text-pp-slate max-w-xl mx-auto lg:mx-0 mb-8">
                ProfitPal helps small business owners calculate the right selling price 
                by considering all costs—materials, labor, packaging, and more—so every 
                sale is actually profitable.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/calculator">
                  <Button 
                    size="lg" 
                    className="bg-gradient-brand hover:opacity-90 text-white px-8 shadow-glow"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Try Free Calculator
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-pp-blue text-pp-blue hover:bg-pp-blue hover:text-white"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-pp-slate">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-pp-green" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-pp-green" />
                  <span>No Registration Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-pp-green" />
                  <span>Beginner-Friendly</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative animate-float">
                <div className="bg-white rounded-3xl shadow-card p-8 border border-pp-slate/10">
                  {/* Calculator Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-pp-slate/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
                          <Calculator className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-pp-dark">Profit Calculator</p>
                          <p className="text-xs text-pp-slate">Batch Costing Tool</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-pp-green/10 text-pp-green text-xs font-medium">
                        Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-pp-blue/5">
                        <p className="text-xs text-pp-slate mb-1">Total Batch Cost</p>
                        <p className="text-xl font-bold text-pp-blue">₱2,500.00</p>
                      </div>
                      <div className="p-4 rounded-xl bg-pp-violet/5">
                        <p className="text-xs text-pp-slate mb-1">Quantity</p>
                        <p className="text-xl font-bold text-pp-violet">50 pcs</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-pp-green/5 border border-pp-green/20">
                      <p className="text-xs text-pp-slate mb-1">Suggested SRP</p>
                      <p className="text-3xl font-bold text-pp-green">₱75.00</p>
                      <p className="text-xs text-pp-green mt-1">per product</p>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-pp-slate/5">
                      <span className="text-sm text-pp-slate">Profit per item</span>
                      <span className="font-semibold text-pp-dark">₱25.00</span>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card p-4 border border-pp-slate/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-pp-green/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-pp-green" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-pp-dark">+47%</p>
                      <p className="text-xs text-pp-slate">Profit Increase</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-pp-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#1e40af_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,#7c3aed_0%,transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              The Hidden Costs of <span className="text-pp-green">Guesswork</span>
            </h2>
            <p className="text-pp-slate-light max-w-2xl mx-auto">
              Many small business owners struggle with pricing because they rely on 
              intuition instead of data. Here are the most common mistakes:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: AlertTriangle,
                title: 'Relying on "Tancha"',
                description: 'Guessing prices or copying competitors without understanding your actual costs.',
                color: 'text-amber-400',
                bgColor: 'bg-amber-400/10',
              },
              {
                icon: DollarSign,
                title: 'Forgetting Hidden Costs',
                description: 'Overlooking labor, utilities, packaging, and platform fees that eat into profits.',
                color: 'text-rose-400',
                bgColor: 'bg-rose-400/10',
              },
              {
                icon: TrendingUp,
                title: 'Thinking You\'re Profitable',
                description: 'Believing there\'s profit when you\'re actually losing money on every sale.',
                color: 'text-red-400',
                bgColor: 'bg-red-400/10',
              },
            ].map((item, index) => (
              <div 
                key={index}
                className="reveal-on-scroll p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl ${item.bgColor} flex items-center justify-center mb-6`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-pp-slate-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-pp-dark mb-4">
              How <span className="text-gradient">ProfitPal</span> Works
            </h2>
            <p className="text-pp-slate max-w-2xl mx-auto">
              Our simple 5-step process takes the guesswork out of pricing. 
              Just enter your costs and let ProfitPal do the math.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Enter Costs',
                description: 'Input your total batch costs including materials, labor, and overhead.',
                icon: Package,
              },
              {
                step: '02',
                title: 'Add Quantity',
                description: 'Enter how many products you produced in this batch.',
                icon: Users,
              },
              {
                step: '03',
                title: 'Get Cost Per Item',
                description: 'ProfitPal automatically calculates your cost per product.',
                icon: Calculator,
              },
              {
                step: '04',
                title: 'See Suggested SRP',
                description: 'Get a recommended selling price based on your desired profit margin.',
                icon: DollarSign,
              },
              {
                step: '05',
                title: 'Review & Compare',
                description: 'See profit breakdown and compare with your current pricing.',
                icon: TrendingUp,
              },
            ].map((item, index) => (
              <div 
                key={index}
                className="reveal-on-scroll relative"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-card border border-pp-slate/10 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-heading font-bold text-pp-blue/20">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-pp-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-pp-slate">
                    {item.description}
                  </p>
                </div>
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-pp-blue/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-pp-dark mb-4">
              Everything You Need to <span className="text-gradient">Price with Confidence</span>
            </h2>
            <p className="text-pp-slate max-w-2xl mx-auto">
              Powerful features designed specifically for micro-entrepreneurs and small business owners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calculator,
                title: 'Cost Breakdown',
                description: 'See exactly where your money goes with detailed cost categorization.',
                color: 'from-pp-blue to-pp-blue-light',
              },
              {
                icon: DollarSign,
                title: 'Suggested Selling Price',
                description: 'Get AI-powered SRP recommendations based on your costs and market.',
                color: 'from-pp-violet to-pp-violet-light',
              },
              {
                icon: TrendingUp,
                title: 'Profit Per Item',
                description: 'Know exactly how much you earn on every single sale.',
                color: 'from-pp-green to-pp-green-light',
              },
              {
                icon: Shield,
                title: 'Break-Even Point',
                description: 'Calculate how many units you need to sell to cover all costs.',
                color: 'from-amber-500 to-amber-400',
              },
              {
                icon: Zap,
                title: 'Price Comparison',
                description: 'Compare your current price with the suggested optimal price.',
                color: 'from-rose-500 to-rose-400',
              },
              {
                icon: CheckCircle2,
                title: 'Beginner-Friendly',
                description: 'Simple, guided input that anyone can use—no accounting knowledge needed.',
                color: 'from-cyan-500 to-cyan-400',
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="reveal-on-scroll group p-6 rounded-2xl bg-pp-light border border-pp-slate/10 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-pp-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-pp-slate text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="py-20 bg-pp-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-pp-dark mb-4">
              Built for <span className="text-gradient">Small Business Owners</span>
            </h2>
            <p className="text-pp-slate max-w-2xl mx-auto">
              Whether you\'re selling homemade goods, offering services, or running an online store, 
              ProfitPal is designed for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Micro-Entrepreneurs',
                description: 'Small business owners who need simple, accurate pricing.',
                icon: Users,
              },
              {
                title: 'Student Sellers',
                description: 'Young entrepreneurs starting their first business ventures.',
                icon: Sparkles,
              },
              {
                title: 'Home-Based Food Sellers',
                description: 'Cottage food businesses calculating costs for baked goods and meals.',
                icon: Package,
              },
              {
                title: 'Freelancers',
                description: 'Independent professionals pricing their services competitively.',
                icon: Zap,
              },
            ].map((user, index) => (
              <div 
                key={index}
                className="reveal-on-scroll bg-white rounded-2xl p-6 shadow-soft text-center hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center mx-auto mb-4">
                  <user.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-pp-dark mb-2">
                  {user.title}
                </h3>
                <p className="text-sm text-pp-slate">
                  {user.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-brand relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,white_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,white_0%,transparent_50%)]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="reveal-on-scroll">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Start Pricing with Confidence Today
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of small business owners who have transformed their 
              pricing strategy with ProfitPal. It\'s free to get started!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculator">
                <Button 
                  size="lg" 
                  className="bg-white text-pp-blue hover:bg-white/90 px-8"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Try Free Calculator
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
