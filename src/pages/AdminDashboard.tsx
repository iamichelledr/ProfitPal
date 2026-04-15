import { useEffect, useMemo, useState } from 'react';
import {
  Shield,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Crown,
  Mail,
  Calendar,
  CreditCard,
  BarChart3,
  TrendingUp,
  UserCheck,
  Settings,
  AlertCircle,
} from 'lucide-react';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  where,
} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected';

interface UserSubmission {
  id: string;
  name: string;
  email: string;
  submittedAt: string;
  paymentMethod: string;
  amount: string;
  status: 'pending' | 'approved' | 'rejected';
  receiptId: string;
  type: 'free' | 'premium' | 'admin';
  isPremiumVerified: boolean | null;
}

interface DashboardStats {
  totalUsers: number;
  premiumUsers: number;
  pendingVerifications: number;
  totalRevenue: string;
  monthlyGrowth: string;
}

const formatDate = (value: any) => {
  if (!value) return 'N/A';

  try {
    if (typeof value?.toDate === 'function') {
      return value.toDate().toLocaleString();
    }

    if (value instanceof Date) {
      return value.toLocaleString();
    }

    return String(value);
  } catch {
    return 'N/A';
  }
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    premiumUsers: 0,
    pendingVerifications: 0,
    totalRevenue: '₱0',
    monthlyGrowth: 'Live',
  });
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);

      const allUsers = usersSnapshot.docs.map((userDoc) => {
        const data = userDoc.data();

        const pendingRequest =
          data.type !== 'admin' &&
          (data.type === 'free' || !data.type) &&
          (data.isPremiumVerified === false || data.isPremiumVerified == null);

        const approvedPremium =
          data.type === 'premium' && data.isPremiumVerified === true;

        let status: 'pending' | 'approved' | 'rejected' = 'pending';
        if (approvedPremium) {
          status = 'approved';
        } else if (data.isPremiumVerified === false) {
          status = 'rejected';
        }

        return {
          id: userDoc.id,
          name: data.name || 'No name',
          email: data.email || 'No email',
          submittedAt: formatDate(data.updatedAt || data.createdAt),
          paymentMethod: data.paymentMethod || data.selectedPlan || 'GCash',
          amount: data.amount || data.planAmount || '₱149',
          status,
          receiptId: data.receiptId || data.paymentReference || userDoc.id,
          type: (data.type || 'free') as 'free' | 'premium' | 'admin',
          isPremiumVerified:
            typeof data.isPremiumVerified === 'boolean' ? data.isPremiumVerified : null,
          pendingRequest,
        };
      });

      const pendingOnly = allUsers.filter((entry: any) => entry.pendingRequest);

      const totalUsers = allUsers.filter((entry) => entry.type !== 'admin').length;
      const premiumUsers = allUsers.filter(
        (entry) => entry.type === 'premium' && entry.isPremiumVerified === true
      ).length;
      const pendingVerifications = pendingOnly.length;

      setSubmissions(
        pendingOnly.map(({ pendingRequest, ...rest }: any) => rest)
      );

      setStats({
        totalUsers,
        premiumUsers,
        pendingVerifications,
        totalRevenue: `₱${premiumUsers * 149}`,
        monthlyGrowth: 'Live',
      });
    } catch (err) {
      console.error('Error loading admin dashboard:', err);
      setError('Failed to load Firestore data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      setActionId(id);
      setError('');

      await updateDoc(doc(db, 'users', id), {
        type: 'premium',
        isPremiumVerified: true,
        updatedAt: serverTimestamp(),
      });

      await fetchDashboardData();
    } catch (err) {
      console.error('Error approving premium request:', err);
      setError('Failed to approve premium request.');
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setActionId(id);
      setError('');

      await updateDoc(doc(db, 'users', id), {
        type: 'free',
        isPremiumVerified: false,
        updatedAt: serverTimestamp(),
      });

      await fetchDashboardData();
    } catch (err) {
      console.error('Error rejecting premium request:', err);
      setError('Failed to reject premium request.');
    } finally {
      setActionId(null);
    }
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.receiptId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = filterStatus === 'all' || sub.status === filterStatus;

      return matchesSearch && matchesFilter;
    });
  }, [submissions, searchQuery, filterStatus]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            <XCircle className="w-3 h-3 mr-1" /> Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-pp-violet/10 text-pp-violet text-sm font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Admin
                </span>
              </div>
              <h1 className="font-heading text-3xl font-bold text-pp-dark">
                Admin Dashboard
              </h1>
              <p className="text-pp-slate mt-1">
                Payment verification and user management
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-soft">
                <UserCheck className="w-5 h-5 text-pp-blue" />
                <span className="text-sm text-pp-dark">{user?.name || 'Admin'}</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-pp-slate mb-1">Total Users</p>
                  <p className="text-2xl font-bold text-pp-dark">
                    {loading ? '...' : stats.totalUsers}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-pp-blue/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-pp-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-pp-slate mb-1">Premium Users</p>
                  <p className="text-2xl font-bold text-pp-violet">
                    {loading ? '...' : stats.premiumUsers}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-pp-violet/10 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-pp-violet" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-pp-slate mb-1">Pending Verification</p>
                  <p className="text-2xl font-bold text-amber-500">
                    {loading ? '...' : stats.pendingVerifications}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-pp-slate mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-pp-green">
                    {loading ? '...' : stats.totalRevenue}
                  </p>
                  <p className="text-xs text-pp-green flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stats.monthlyGrowth}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-pp-green/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-pp-green" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-pp-blue" />
                  Payment Verification
                </CardTitle>
                <CardDescription>
                  Review and approve premium subscription payments
                </CardDescription>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pp-slate" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                  className="px-3 py-2 rounded-lg border border-pp-slate/20 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-pp-slate/10">
                    <th className="text-left py-3 px-4 text-sm font-medium text-pp-slate">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-pp-slate">Receipt ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-pp-slate">Payment Method</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-pp-slate">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-pp-slate">Submitted</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-pp-slate">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-pp-slate">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    filteredSubmissions.map((submission) => (
                      <tr
                        key={submission.id}
                        className="border-b border-pp-slate/10 hover:bg-pp-blue/5 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-medium">
                              {submission.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-pp-dark">{submission.name}</p>
                              <p className="text-sm text-pp-slate flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {submission.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm text-pp-slate">
                            {submission.receiptId}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 rounded-full bg-pp-blue/10 text-pp-blue text-xs">
                            {submission.paymentMethod}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-pp-dark">{submission.amount}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-pp-slate flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {submission.submittedAt}
                          </span>
                        </td>
                        <td className="py-4 px-4">{getStatusBadge(submission.status)}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => handleApprove(submission.id)}
                              disabled={actionId === submission.id}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-1" />
                              {actionId === submission.id ? 'Processing...' : 'Approve'}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleReject(submission.id)}
                              disabled={actionId === submission.id}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              {actionId === submission.id ? 'Processing...' : 'Reject'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {loading && (
              <div className="text-center py-12">
                <p className="text-pp-slate">Loading pending premium requests...</p>
              </div>
            )}

            {!loading && filteredSubmissions.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-pp-slate/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-pp-slate" />
                </div>
                <p className="text-pp-slate">No pending submissions found</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-pp-blue/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-pp-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-pp-dark">User Management</h3>
                  <p className="text-sm text-pp-slate">Manage all users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-pp-violet/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-pp-violet" />
                </div>
                <div>
                  <h3 className="font-medium text-pp-dark">Analytics</h3>
                  <p className="text-sm text-pp-slate">View detailed reports</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-pp-green/10 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-pp-green" />
                </div>
                <div>
                  <h3 className="font-medium text-pp-dark">Settings</h3>
                  <p className="text-sm text-pp-slate">Configure system</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
