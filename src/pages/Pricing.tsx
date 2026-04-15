import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "₱0",
      description: "Perfect for getting started with basic pricing calculations.",
      features: [
        "Basic price calculator",
        "Manual cost input",
        "Instant results",
      ],
      isPremium: false,
    },
    {
      name: "Premium",
      price: "₱149 per month",
      description: "Unlock advanced features for accurate and scalable pricing.",
      features: [
        "Save product history",
        "Advanced cost breakdown",
        "Profit comparison",
        "Priority support",
      ],
      isPremium: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Pricing Plans
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-2xl p-6 shadow-sm ${
              plan.isPremium ? "border-yellow-400" : ""
            }`}
          >
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              {plan.isPremium && <Crown className="text-yellow-500" />}
              {plan.name}
            </h2>

            <p className="text-2xl font-bold mb-2">{plan.price}</p>
            <p className="text-gray-600 mb-4">{plan.description}</p>

            <ul className="mb-4 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check size={16} />
                  {feature}
                </li>
              ))}
            </ul>

            {!plan.isPremium ? (
              <Button variant="outline" className="w-full">
                Current Plan
              </Button>
            ) : (
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                Upgrade to Premium
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* 🔥 PAYMENT SECTION */}
      <div className="mt-10 border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Upgrade to Premium via GCash
        </h2>

        <p className="mb-2">
          <strong>Step 1:</strong> Send payment via GCash
        </p>
        <p>Name: Michelle Del Rosario</p>
        <p>Number: 09215673543</p>
        <p>Amount: ₱149</p>

        <p className="mt-4">
          <strong>Step 2:</strong> Submit your payment details
        </p>

        <a
          href="https://forms.gle/QSW5mM4h2ZajgvF46"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="mt-3 w-full">
            Submit Payment
          </Button>
        </a>

        <p className="text-sm text-gray-500 mt-3">
          After submitting, please wait for admin verification (12–24 hours).
        </p>
      </div>
    </div>
  );
}
