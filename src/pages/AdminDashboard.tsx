import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Search, Users, Crown, Clock3, BarChart3, CheckCircle2, XCircle } from "lucide-react";
import { db } from "../lib/firebase";
import type { AppUser } from "@/contexts/AuthContext";

type DashboardUser = AppUser & {
  createdAt?: any;
  updatedAt?: any;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedUsers: DashboardUser[] = snapshot.docs.map((docSnap) => ({
        uid: docSnap.id,
        ...(docSnap.data() as Omit<DashboardUser, "uid">),
      }));
      setUsers(fetchedUsers);
    });

    return () => unsubscribe();
  }, []);

  const premiumRequests = useMemo(() => {
    return users.filter((user) => user.requestedPlan === "premium");
  }, [users]);

  const filteredRequests = useMemo(() => {
    return premiumRequests.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "pending" && user.paymentStatus === "pending") ||
        (statusFilter === "approved" && user.paymentStatus === "approved") ||
        (statusFilter === "rejected" && user.paymentStatus === "rejected");

      return matchesSearch && matchesStatus;
    });
  }, [premiumRequests, searchTerm, statusFilter]);

  const totalUsers = users.length;
  const premiumUsers = users.filter(
    (user) => user.type === "premium" && user.isPremiumVerified === true
  ).length;
  const pendingVerification = premiumRequests.filter(
    (user) => user.paymentStatus === "pending"
  ).length;

  const totalRevenue = users
    .filter((user) => user.type === "premium" && user.isPremiumVerified === true)
    .reduce((sum, user) => sum + (user.paymentAmount || 149), 0);

  const handleApprove = async (userId: string) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      type: "premium",
      requestedPlan: "premium",
      isPremiumVerified: true,
      paymentStatus: "approved",
      paymentMethod: "GCash",
      paymentAmount: 149,
      receiptId: "Verified via Google Form",
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error approving user:", error);
  }
};

const handleReject = async (userId: string) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      type: "free",
      requestedPlan: "premium",
      isPremiumVerified: false,
      paymentStatus: "rejected",
      paymentMethod: "GCash",
      paymentAmount: 149,
      receiptId: "Rejected via Google Form review",
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error rejecting user:", error);
  }
};

  const formatDate = (value: any) => {
    if (!value) return "-";
    try {
      if (value?.toDate) {
        return value.toDate().toLocaleString();
      }
      return new Date(value).toLocaleString();
    } catch {
      return "-";
    }
  };

  const statusBadge = (status: DashboardUser["paymentStatus"]) => {
    if (status === "approved") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          Approved
        </span>
      );
    }

    if (status === "rejected") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm text-red-700">
          <XCircle className="h-4 w-4" />
          Rejected
        </span>
      );
    }

    if (status === "pending") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-sm text-yellow-700">
          <Clock3 className="h-4 w-4" />
          Pending
        </span>
      );
    }

    return <span className="text-sm text-slate-400">-</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <p className="mb-8 text-xl text-slate-600">
        Payment verification and user management
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Total Users</p>
              <h2 className="mt-2 text-4xl font-bold text-slate-900">{totalUsers}</h2>
            </div>
            <div className="rounded-2xl bg-indigo-100 p-4 text-indigo-600">
              <Users className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Premium Users</p>
              <h2 className="mt-2 text-4xl font-bold text-violet-600">{premiumUsers}</h2>
            </div>
            <div className="rounded-2xl bg-violet-100 p-4 text-violet-600">
              <Crown className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Pending Verification</p>
              <h2 className="mt-2 text-4xl font-bold text-amber-500">{pendingVerification}</h2>
            </div>
            <div className="rounded-2xl bg-amber-100 p-4 text-amber-500">
              <Clock3 className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Total Revenue</p>
              <h2 className="mt-2 text-4xl font-bold text-emerald-500">₱{totalRevenue}</h2>
              <p className="mt-2 text-sm text-emerald-500">Live</p>
            </div>
            <div className="rounded-2xl bg-emerald-100 p-4 text-emerald-500">
              <BarChart3 className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Payment Verification</h2>
            <p className="text-slate-500">
              Review and approve premium subscription requests
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-violet-400 sm:w-72"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-400"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm text-slate-500">
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Receipt ID</th>
                <th className="px-4 py-2">Payment Method</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Submitted</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                    No premium requests found.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((user) => (
                  <tr key={user.uid} className="rounded-2xl bg-slate-50">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {user.receiptId || "-"}
                    </td>

                    <td className="px-4 py-4">
                      {user.paymentMethod ? (
                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
                          {user.paymentMethod}
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>

                    <td className="px-4 py-4 font-medium text-slate-800">
                      {user.paymentAmount ? `₱${user.paymentAmount}` : "-"}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {formatDate(user.submittedAt || user.updatedAt || user.createdAt)}
                    </td>

                    <td className="px-4 py-4">{statusBadge(user.paymentStatus)}</td>

                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleApprove(user.uid)}
                          className="rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-green-700 transition hover:bg-green-100"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user.uid)}
                          className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-red-700 transition hover:bg-red-100"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
