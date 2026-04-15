import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  DollarSign,
  Package,
  Users,
  Zap,
  ArrowRight,
  RotateCcw,
  Info,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { saveCalculation } from '@/lib/calculations';
import { useAuth } from '@/contexts/AuthContext';

interface CalculationResult {
  totalBatchCost: number;
  costPerProduct: number;
  suggestedSRP: number;
  profitPerItem: number;
  breakEvenQuantity: number;
  userPriceProfit: number;
  profitDifference: number;
}

export default function CalculatorPage() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    productName: '',
    materialsCost: '',
    laborCost: '',
    packagingCost: '',
    utilitiesCost: '',
    platformFees: '',
    otherCosts: '',
    quantity: '',
    profitMargin: '30',
    userTargetPrice: '',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setShowResults(false);
  };

  const calculate = () => {
    const materials = parseFloat(formData.materialsCost) || 0;
    const labor = parseFloat(formData.laborCost) || 0;
    const packaging = parseFloat(formData.packagingCost) || 0;
    const utilities = parseFloat(formData.utilitiesCost) || 0;
    const platform = parseFloat(formData.platformFees) || 0;
    const other = parseFloat(formData.otherCosts) || 0;
    const quantity = parseFloat(formData.quantity) || 1;
    const margin = parseFloat(formData.profitMargin) || 30;
    const userPrice = parseFloat(formData.userTargetPrice) || 0;

    const totalBatchCost = materials + labor + packaging + utilities + platform + other;
    const costPerProduct = totalBatchCost / quantity;
    const suggestedSRP = costPerProduct * (1 + margin / 100);
    const profitPerItem = suggestedSRP - costPerProduct;
    const breakEvenQuantity = suggestedSRP > 0 ? Math.ceil(totalBatchCost / suggestedSRP) : 0;
    const userPriceProfit = userPrice > 0 ? userPrice - costPerProduct : 0;
    const profitDifference = userPriceProfit - profitPerItem;

    setResult({
      totalBatchCost,
      costPerProduct,
      suggestedSRP,
      profitPerItem,
      breakEvenQuantity,
      userPriceProfit,
      profitDifference,
    });
    setShowResults(true);
  };

  const handleSave = async () => {
    if (!user) {
      alert('Please log in first.');
      return;
    }

    if (!result) {
      alert('Please calculate first.');
      return;
    }

    setIsSaving(true);

    try {
      await saveCalculation({
        userId: user.uid,
        productName: formData.productName.trim() || 'Untitled Product',
        category: 'General',
        totalCost: result.totalBatchCost,
        suggestedPrice: result.suggestedSRP,
        profitAmount: result.profitPerItem,
        profitMargin: parseFloat(formData.profitMargin) || 0,
      });

      alert('Calculation saved successfully!');
    } catch (error) {
      console.error('Failed to save calculation:', error);
      alert('Failed to save calculation.');
    } finally {
      setIsSaving(false);
    }
  };

  const reset = () => {
    setFormData({
      productName: '',
      materialsCost: '',
      laborCost: '',
      packagingCost: '',
      utilitiesCost: '',
      platformFees: '',
      otherCosts: '',
      quantity: '',
      profitMargin: '30',
      userTargetPrice: '',
    });
    setResult(null);
    setShowResults(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const costInputs = [
    {
      field: 'materialsCost',
      label: 'Materials Cost',
      icon: Package,
      placeholder: '0.00',
      description: 'Raw materials and ingredients',
    },
    {
      field: 'laborCost',
      label: 'Labor Cost',
      icon: Users,
      placeholder: '0.00',
      description: 'Your time or wages paid',
    },
    {
      field: 'packagingCost',
      label: 'Packaging Cost',
      icon: Package,
      placeholder: '0.00',
      description: 'Boxes, labels, bags',
    },
    {
      field: 'utilitiesCost',
      label: 'Utilities Cost',
      icon: Zap,
      placeholder: '0.00',
      description: 'Electricity, gas, water',
    },
    {
      field: 'platformFees',
      label: 'Platform/Delivery Fees',
      icon: DollarSign,
      placeholder: '0.00',
      description: 'Online marketplace fees',
    },
    {
      field: 'otherCosts',
      label: 'Other Costs',
      icon: Info,
      placeholder: '0.00',
      description: 'Rent, equipment, misc.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      <section className="py-12 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pp-blue/10 text-pp-blue text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              <span>Free Pricing Calculator</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-pp-dark mb-4">
              Calculate Your <span className="text-gradient">Perfect Price</span>
            </h1>
            <p className="text-pp-slate">
              Enter your costs below and let ProfitPal do the math. Get accurate
              pricing recommendations in seconds.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-pp-blue" />
                  Enter Your Costs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="productName" className="text-pp-dark font-medium">
                    Product Name <span className="text-pp-slate-light">(Optional)</span>
                  </Label>
                  <Input
                    id="productName"
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    placeholder="e.g., Chocolate Chip Cookies"
                    className="mt-1"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {costInputs.map((input) => (
                    <div key={input.field}>
                      <Label
                        htmlFor={input.field}
                        className="text-pp-dark font-medium flex items-center gap-2"
                      >
                        <input.icon className="w-4 h-4 text-pp-blue" />
                        {input.label}
                      </Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pp-slate">
                          ₱
                        </span>
                        <Input
                          id={input.field}
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData[input.field as keyof typeof formData]}
                          onChange={(e) => handleInputChange(input.field, e.target.value)}
                          placeholder={input.placeholder}
                          className="pl-8"
                        />
                      </div>
                      <p className="text-xs text-pp-slate-light mt-1">{input.description}</p>
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-pp-slate/10">
                  <div>
                    <Label htmlFor="quantity" className="text-pp-dark font-medium">
                      Quantity Produced *
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', e.target.value)}
                      placeholder="e.g., 50"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="profitMargin" className="text-pp-dark font-medium">
                      Desired Profit Margin (%)
                    </Label>
                    <Input
                      id="profitMargin"
                      type="number"
                      min="0"
                      max="500"
                      value={formData.profitMargin}
                      onChange={(e) => handleInputChange('profitMargin', e.target.value)}
                      placeholder="30"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-pp-slate/10">
                  <Label htmlFor="userTargetPrice" className="text-pp-dark font-medium">
                    Your Target Selling Price <span className="text-pp-slate-light">(Optional)</span>
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pp-slate">
                      ₱
                    </span>
                    <Input
                      id="userTargetPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.userTargetPrice}
                      onChange={(e) => handleInputChange('userTargetPrice', e.target.value)}
                      placeholder="Compare with suggested price"
                      className="pl-8"
                    />
                  </div>
                  <p className="text-xs text-pp-slate-light mt-1">
                    Enter your current price to see how it compares
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={calculate}
                    className="flex-1 bg-gradient-brand hover:opacity-90 text-white"
                    size="lg"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate
                  </Button>
                  <Button onClick={reset} variant="outline" size="lg">
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {!showResults ? (
                <Card className="shadow-card h-full flex items-center justify-center">
                  <CardContent className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-pp-blue/10 flex items-center justify-center mx-auto mb-4">
                      <Calculator className="w-10 h-10 text-pp-blue" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-pp-dark mb-2">
                      Ready to Calculate
                    </h3>
                    <p className="text-pp-slate max-w-xs mx-auto">
                      Enter your costs and click Calculate to see your pricing recommendations.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                result && (
                  <>
                    <Card className="shadow-card border-pp-green/20">
                      <CardHeader className="bg-pp-green/5">
                        <CardTitle className="flex items-center gap-2 text-pp-green">
                          <CheckCircle2 className="w-5 h-5" />
                          Suggested Selling Price
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-5xl font-bold text-pp-green mb-2">
                            {formatCurrency(result.suggestedSRP)}
                          </p>
                          <p className="text-pp-slate">per product</p>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Card className="shadow-card">
                        <CardContent className="p-4">
                          <p className="text-sm text-pp-slate mb-1">Total Batch Cost</p>
                          <p className="text-xl font-bold text-pp-dark">
                            {formatCurrency(result.totalBatchCost)}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-card">
                        <CardContent className="p-4">
                          <p className="text-sm text-pp-slate mb-1">Cost Per Product</p>
                          <p className="text-xl font-bold text-pp-blue">
                            {formatCurrency(result.costPerProduct)}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-card">
                        <CardContent className="p-4">
                          <p className="text-sm text-pp-slate mb-1">Profit Per Item</p>
                          <p className="text-xl font-bold text-pp-green">
                            {formatCurrency(result.profitPerItem)}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-card">
                        <CardContent className="p-4">
                          <p className="text-sm text-pp-slate mb-1">Break-Even Point</p>
                          <p className="text-xl font-bold text-pp-violet">
                            {result.breakEvenQuantity} units
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {formData.userTargetPrice && result.userPriceProfit > 0 && (
                      <Card
                        className={`shadow-card ${
                          result.profitDifference >= 0
                            ? 'border-pp-green/20'
                            : 'border-amber-400/50'
                        }`}
                      >
                        <CardHeader
                          className={
                            result.profitDifference >= 0 ? 'bg-pp-green/5' : 'bg-amber-50'
                          }
                        >
                          <CardTitle
                            className={`flex items-center gap-2 ${
                              result.profitDifference >= 0
                                ? 'text-pp-green'
                                : 'text-amber-600'
                            }`}
                          >
                            {result.profitDifference >= 0 ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <AlertTriangle className="w-5 h-5" />
                            )}
                            Price Comparison
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-pp-slate mb-1">Your Price Profit</p>
                              <p
                                className={`text-lg font-bold ${
                                  result.userPriceProfit >= 0 ? 'text-pp-green' : 'text-red-500'
                                }`}
                              >
                                {formatCurrency(result.userPriceProfit)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-pp-slate mb-1">Difference</p>
                              <p
                                className={`text-lg font-bold ${
                                  result.profitDifference >= 0
                                    ? 'text-pp-green'
                                    : 'text-amber-600'
                                }`}
                              >
                                {result.profitDifference >= 0 ? '+' : ''}
                                {formatCurrency(result.profitDifference)}
                              </p>
                            </div>
                          </div>
                          {result.profitDifference < 0 && (
                            <div className="mt-4 p-3 rounded-lg bg-amber-50 text-amber-700 text-sm">
                              <AlertTriangle className="w-4 h-4 inline mr-2" />
                              Your current price earns less profit than our suggestion.
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={handleSave}
                        className="flex-1 bg-gradient-brand hover:opacity-90 text-white"
                        disabled={isSaving}
                      >
                        {isSaving ? 'Saving...' : 'Save This Calculation'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>

                      <Link to="/pricing" className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Premium Features
                        </Button>
                      </Link>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-pp-blue/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-pp-dark mb-6 text-center">
            Pricing Tips
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Include All Costs',
                description:
                  "Don't forget hidden costs like utilities, packaging, and platform fees.",
              },
              {
                title: 'Know Your Market',
                description:
                  'Research competitor prices while ensuring you cover all costs.',
              },
              {
                title: 'Test Different Margins',
                description:
                  'Try different profit margins to find the sweet spot for your market.',
              },
            ].map((tip, index) => (
              <div key={index} className="bg-white rounded-xl p-5 shadow-soft">
                <h3 className="font-heading font-semibold text-pp-dark mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-pp-slate">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
