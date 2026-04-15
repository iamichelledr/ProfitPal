import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Package,
  Clock,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Features() {
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

  const mainFeatures = [
    {
      icon: Calculator,
      title: 'Total Batch Cost Input',
      description: 'Enter all your costs in one place—materials, labor, packaging, utilities, delivery fees, and more. Our guided input makes sure you don\'t miss anything.',
      benefits: [
        'Comprehensive cost categories',
        'Guided step-by-step input',
        'Save and edit calculations',
        'Historical cost tracking (Premium)'
      ],
      color: 'pp-blue',
      gradient: 'from-pp-blue to-pp-blue-light'
    },
    {
      icon: DollarSign,
      title: 'Cost Per Product Calculation',
      description: 'Automatically calculate exactly how much each product costs you to make. No more manual spreadsheets or calculator errors.',
      benefits: [
        'Instant accurate calculations',
        'Detailed cost breakdown',
        'Batch costing support',
        'Export results (Premium)'
      ],
      color: 'pp-violet',
      gradient: 'from-pp-violet to-pp-violet-light'
    },
    {
      icon: TrendingUp,
      title: 'Suggested SRP Per Product',
      description: 'Get intelligent selling price recommendations based on your costs and desired profit margin. Never underprice again.',
      benefits: [
        'Smart price suggestions',
        'Customizable profit margins',
        'Market-aware pricing',
        'Competitive analysis (Premium)'
      ],
      color: 'pp-green',
      gradient: 'from-pp-green to-pp-green-light'
    },
    {
      icon: BarChart3,
      title: 'Profit Per Item Analysis',
      description: 'See exactly how much profit you make on every single sale. Understand which products are your real money-makers.',
      benefits: [
        'Clear profit visibility',
        'Per-product breakdown',
        'Profit margin percentage',
        'Comparison tools'
      ],
      color: 'amber-500',
      gradient: 'from-amber-500 to-amber-400'
    },
    {
      icon: Target,
      title: 'Break-Even Point Calculator',
      description: 'Know exactly how many units you need to sell to cover all your costs. Plan your sales targets with confidence.',
      benefits: [
        'Break-even quantity',
        'Sales target planning',
        'Timeline projections',
        'Goal tracking (Premium)'
      ],
      color: 'rose-500',
      gradient: 'from-rose-500 to-rose-400'
    },
    {
      icon: CheckCircle2,
      title: 'Price Comparison Tool',
      description: 'Compare your current selling price with our suggested price. See the difference in potential earnings.',
      benefits: [
        'Side-by-side comparison',
        'Profit difference calculator',
        'Price optimization tips',
        'What-if scenarios'
      ],
      color: 'cyan-500',
      gradient: 'from-cyan-500 to-cyan-400'
    }
  ];

  const guidedCategories = [
    { icon: Package, name: 'Materials', description: 'Raw ingredients, supplies, components' },
    { icon: Clock, name: 'Labor', description: 'Your time, helper wages, preparation' },
    { icon: Shield, name: 'Packaging', description: 'Boxes, labels, bags, wrapping' },
    { icon: Zap, name: 'Utilities', description: 'Electricity, gas, water for production' },
    { icon: DollarSign, name: 'Platform Fees', description: 'Delivery apps, online marketplaces' },
    { icon: Sparkles, name: 'Other Costs', description: 'Rent, equipment, miscellaneous' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-soft relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-pp-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pp-violet/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pp-blue/10 text-pp-blue text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Powerful Features</span>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-pp-dark mb-6">
              Everything You Need to{' '}
              <span className="text-gradient">Price with Confidence</span>
            </h1>
            
            <p className="text-lg text-pp-slate mb-8">
              ProfitPal combines powerful calculation tools with an intuitive interface 
              designed specifically for small business owners. No spreadsheets. No guesswork. 
              No hidden cost blindness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculator">
                <Button 
                  size="lg" 
                  className="bg-gradient-brand hover:opacity-90 text-white px-8"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Try the Calculator
                </Button>
              </Link>
              <Link to="/pricing">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-pp-blue text-pp-blue hover:bg-pp-blue hover:text-white"
                >
                  View Pricing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-pp-dark mb-4">
              Core Features
            </h2>
            <p className="text-pp-slate max-w-2xl mx-auto">
              Powerful tools designed to take the guesswork out of pricing your products.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <div 
                key={index}
                className="reveal-on-scroll group bg-pp-light rounded-2xl p-8 border border-pp-slate/10 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-semibold text-pp-dark mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-pp-slate mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-pp-slate">
                          <CheckCircle2 className={`w-4 h-4 text-${feature.color}`} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guided Cost Categories */}
      <section className="py-20 bg-pp-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-on-scroll">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-pp-dark mb-6">
                Guided <span className="text-gradient">Cost Categories</span>
              </h2>
              <p className="text-pp-slate mb-6">
                Never forget a cost again. Our guided input walks you through every 
                possible expense category, ensuring your calculations are complete and accurate.
              </p>
              <p className="text-pp-slate mb-8">
                From raw materials to platform fees, we help you account for every 
                peso that goes into making your product.
              </p>
              <Link to="/calculator">
                <Button className="bg-gradient-brand hover:opacity-90 text-white">
                  <Calculator className="w-5 h-5 mr-2" />
                  Start Calculating
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {guidedCategories.map((category, index) => (
                <div 
                  key={index}
                  className="reveal-on-scroll bg-white rounded-xl p-5 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-pp-blue/10 flex items-center justify-center mb-3">
                    <category.icon className="w-5 h-5 text-pp-blue" />
                  </div>
                  <h3 className="font-heading font-semibold text-pp-dark mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-pp-slate">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* No More Section */}
      <section className="py-20 bg-pp-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#1e40af_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,#7c3aed_0%,transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Say Goodbye To
            </h2>
            <p className="text-pp-slate-light max-w-2xl mx-auto">
              Stop struggling with these common pricing challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'No Spreadsheets',
                description: 'Forget complex Excel formulas and manual calculations. ProfitPal does all the math for you instantly.',
                icon: Calculator
              },
              {
                title: 'No Guesswork',
                description: 'Stop relying on "tancha" or copying competitors. Get data-driven price recommendations.',
                icon: Target
              },
              {
                title: 'No Hidden Cost Blindness',
                description: 'Never miss a cost again. Our guided categories ensure you account for everything.',
                icon: CheckCircle2
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="reveal-on-scroll text-center p-8"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-pp-green" />
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

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="reveal-on-scroll bg-gradient-soft rounded-3xl p-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-pp-dark mb-4">
              Ready to Price with Confidence?
            </h2>
            <p className="text-pp-slate mb-8 max-w-xl mx-auto">
              Start using ProfitPal today and transform how you price your products. 
              It\'s free to get started!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculator">
                <Button 
                  size="lg" 
                  className="bg-gradient-brand hover:opacity-90 text-white px-8"
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
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
