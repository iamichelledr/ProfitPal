import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Crown,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState<'free' | 'premium'>('free');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanFullName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    const cleanConfirmPassword = confirmPassword.trim();

    if (!cleanFullName) {
      setError('Full name is required');
      return;
    }

    if (!cleanEmail) {
      setError('Email is required');
      return;
    }

    if (cleanPassword !== cleanConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (cleanPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const createdUser = await signup(
        cleanEmail,
        cleanPassword,
        cleanFullName,
        accountType
      );

      if (createdUser) {
        if (accountType === 'premium') {
          navigate('/pricing');
        } else {
          navigate('/dashboard/free');
        }
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-soft">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-pp-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pp-violet/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md mx-auto px-4">
        <div className="flex justify-center mb-8">
          <Logo size="lg" showTagline />
        </div>

        <Card className="shadow-card">
          <CardHeader className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pp-green/10 text-pp-green text-xs font-medium mx-auto mb-3">
              <Sparkles className="w-3 h-3" />
              <span>Get Started</span>
            </div>
            <CardTitle className="font-heading text-2xl">Create Your Account</CardTitle>
            <CardDescription>
              Join ProfitPal and start pricing with confidence
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div>
                <Label htmlFor="fullName" className="text-pp-dark font-medium">
                  Full Name
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pp-slate" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-pp-dark font-medium">
                  Email Address
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pp-slate" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-pp-dark font-medium">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pp-slate" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password (min 6 characters)"
                    className="pl-10 pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-pp-slate hover:text-pp-dark"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-pp-dark font-medium">
                  Confirm Password
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pp-slate" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <Label className="text-pp-dark font-medium mb-3 block">
                  Choose Your Plan
                </Label>
                <RadioGroup
                  value={accountType}
                  onValueChange={(value) => setAccountType(value as 'free' | 'premium')}
                  className="space-y-3"
                >
                  <div
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      accountType === 'free'
                        ? 'border-pp-blue bg-pp-blue/5'
                        : 'border-pp-slate/10 hover:border-pp-slate/30'
                    }`}
                  >
                    <RadioGroupItem value="free" id="free" />
                    <Label htmlFor="free" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-pp-dark">Free Plan</p>
                          <p className="text-sm text-pp-slate">Basic calculator & features</p>
                        </div>
                        <span className="text-pp-green font-semibold">Free</span>
                      </div>
                    </Label>
                  </div>

                  <div
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      accountType === 'premium'
                        ? 'border-pp-violet bg-pp-violet/5'
                        : 'border-pp-slate/10 hover:border-pp-slate/30'
                    }`}
                  >
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-pp-dark flex items-center gap-2">
                            <Crown className="w-4 h-4 text-pp-violet" />
                            Premium Plan
                          </p>
                          <p className="text-sm text-pp-slate">Full features & history</p>
                        </div>
                        <span className="text-pp-violet font-semibold">₱149/mo</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {accountType === 'premium' && (
                <div className="p-4 rounded-lg bg-pp-violet/10 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-pp-violet flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-pp-violet mb-1">Premium Access</p>
                      <p className="text-pp-slate">
                        Premium access requires payment verification. After signing up,
                        you will be redirected to the payment instructions page to
                        complete your upgrade request.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-pp-slate/20" required />
                <span className="text-pp-slate">
                  I agree to the{' '}
                  <Link to="#" className="text-pp-blue hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="#" className="text-pp-blue hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-brand hover:opacity-90 text-white"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-pp-slate text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-pp-blue font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
