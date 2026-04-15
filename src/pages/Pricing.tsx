import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  Sparkles, 
  Calculator, 
  ArrowRight,
  Crown,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started with basic pricing calculations.',
      price: { monthly: 0, annual: 0 },
      icon: Calculator,
      popular: false,
      features: [
        { text: 'Basic profit calculator', included: true, highlight: false },
        { text: 'Cost breakdown', included: true, highlight: false },
        { text: 'Suggested SRP', included: true, highlight: false },
        { text: 'Profit per product', included: true, highlight: false },
        { text: 'Limited calculations per day', included: true, highlight: false },
        { text: 'Save products', included: false, highlight: false },
        { text: 'Pricing history', included: false, highlight: false },
        { text: 'Batch costing records', included: false, highlight: false },
        { text: 'Advanced analytics', included: false, highlight: false },
        { text: 'Priority support', included: false, highlight: false },
      ],
      cta: 'Get Started Free',
      ctaLink: '/signup',
      ctaVariant: 'outline' as const,
    },
    {
      name: 'Premium',
      description: 'For serious business owners who want full control and insights.',
      price: { monthly: 149, annual: 1490 },
      icon: Crown,
      popular: true,
      features: [
        { text: 'Everything in Free, plus:', included: true, highlight: true },
        { text: 'Unlimited calculations', included: true, highlight: false },
        { text: 'Save unlimited products', included: true, highlight: false },
        { text: 'Full pricing history', included: true, highlight: false },
        { text: 'Batch costing records', included: true, highlight: false },
        { text: 'Advanced analytics & reports', included: true, highlight: false },
        { text: 'Export data (CSV/PDF)', included: true, highlight: false },
        { text: 'Price comparison tools', included: true, highlight: false },
        { text: 'Break-even analysis', included: true, highlight: false },
        { text: 'Priority email support', included: true, highlight: false },
      ],
      cta: 'Upgrade to Premium',
      ctaLink: '/signup',
      ctaVariant: 'default' as const,
      badge: 'Most Popular',
    },
  ];

  const savings = isAnnual ? 'Save ₱298/year' : '';

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-soft relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-pp-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pp-violet/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pp-violet/10 text-pp-violet text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Simple, Transparent Pricing</span>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-pp-dark mb-6">
              Choose Your <span className="text-gradient">Plan</span>
            </h1>
            
            <p className="text-lg text-pp-slate mb-8">
              Start free and upgrade when you\'re ready. No hidden fees, no surprises.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-pp-dark' : 'text-pp-slate'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <span className={`text-sm font-medium ${isAnnual ? 'text-pp-dark' : 'text-pp-slate'}`}>
                Annual
              </span>
              {savings && (
                <span className="px-3 py-1 rounded-full bg-pp-green/10 text-pp-green text-xs font-medium">
                  {savings}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative rounded-2xl p-8 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-pp-blue/5 to-pp-violet/5 border-2 border-pp-blue shadow-card' 
                    : 'bg-pp-light border border-pp-slate/10'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-brand text-white text-sm font-medium">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                    plan.popular ? 'bg-gradient-brand' : 'bg-pp-blue/10'
                  }`}>
                    <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-pp-blue'}`} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-pp-dark mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-pp-slate text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-pp-slate">₱</span>
                    <span className="font-heading text-5xl font-bold text-pp-dark">
                      {isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-pp-slate">
                      {plan.price.monthly > 0 ? (isAnnual ? '/year' : '/month') : ''}
                    </span>
                  </div>
                  {plan.price.monthly > 0 && isAnnual && (
                    <p className="text-sm text-pp-green mt-1">
                      ₱124/month billed annually
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          feature.highlight ? 'bg-pp-violet/20' : 'bg-pp-green/20'
                        }`}>
                          <Check className={`w-3 h-3 ${feature.highlight ? 'text-pp-violet' : 'text-pp-green'}`} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-pp-slate/10 flex items-center justify-center">
                          <X className="w-3 h-3 text-pp-slate-light" />
                        </div>
                      )}
                      <span className={`text-sm ${
                        feature.included ? 'text-pp-dark' : 'text-pp-slate-light'
                      } ${feature.highlight ? 'font-medium' : ''}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Link to={plan.ctaLink}>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-brand hover:opacity-90 text-white' 
                        : 'border-pp-blue text-pp-blue hover:bg-pp-blue hover:text-white'
                    }`}
                    variant={plan.ctaVariant}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Note */}
      <section className="py-12 bg-pp-blue/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 shadow-soft flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-pp-violet/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-pp-violet" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-pp-dark mb-1">
                Premium Verification
              </h3>
              <p className="text-pp-slate text-sm">
                Premium users are verified through our admin payment approval process. 
                Once payment is confirmed, your account will be upgraded within 24 hours. 
                You\'ll receive an email notification when your Premium access is active.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-pp-dark mb-4">
              Feature Comparison
            </h2>
            <p className="text-pp-slate">
              See exactly what you get with each plan.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-pp-slate/10">
                  <th className="text-left py-4 px-4 font-heading font-semibold text-pp-dark">Feature</th>
                  <th className="text-center py-4 px-4 font-heading font-semibold text-pp-dark">Free</th>
                  <th className="text-center py-4 px-4 font-heading font-semibold text-pp-violet">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Basic Calculator', free: true, premium: true },
                  { feature: 'Cost Breakdown', free: true, premium: true },
                  { feature: 'Suggested SRP', free: true, premium: true },
                  { feature: 'Profit Per Item', free: true, premium: true },
                  { feature: 'Daily Calculations', free: '5 per day', premium: 'Unlimited' },
                  { feature: 'Save Products', free: false, premium: true },
                  { feature: 'Pricing History', free: false, premium: true },
                  { feature: 'Batch Costing', free: false, premium: true },
                  { feature: 'Advanced Analytics', free: false, premium: true },
                  { feature: 'Data Export', free: false, premium: 'CSV/PDF' },
                  { feature: 'Break-Even Analysis', free: false, premium: true },
                  { feature: 'Priority Support', free: false, premium: true },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-pp-slate/10">
                    <td className="py-4 px-4 text-pp-dark">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <Check className="w-5 h-5 text-pp-green mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-pp-slate-light mx-auto" />
                        )
                      ) : (
                        <span className="text-pp-slate">{row.free}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <Check className="w-5 h-5 text-pp-violet mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-pp-slate-light mx-auto" />
                        )
                      ) : (
                        <span className="text-pp-violet font-medium">{row.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-pp-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-pp-dark mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Can I switch plans anytime?',
                a: 'Yes! You can upgrade from Free to Premium at any time. Your Premium features will be activated after payment verification.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept GCash, Maya, bank transfers, and credit/debit cards for Premium subscriptions.'
              },
              {
                q: 'Is there a refund policy?',
                a: 'Yes, we offer a 7-day money-back guarantee for Premium subscriptions if you\'re not satisfied.'
              },
              {
                q: 'How long does verification take?',
                a: 'Payment verification typically takes 24 hours or less. You\'ll receive an email once your Premium access is active.'
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
                <h3 className="font-heading font-semibold text-pp-dark mb-2">
                  {faq.q}
                </h3>
                <p className="text-pp-slate text-sm">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-brand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of small business owners who trust ProfitPal for their pricing decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-white text-pp-blue hover:bg-white/90 px-8"
              >
                Create Free Account
              </Button>
            </Link>
            <Link to="/calculator">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Try Calculator First
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
