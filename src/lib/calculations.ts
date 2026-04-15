import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export interface CalculationRecord {
  userId: string;
  productName: string;
  category: string;
  totalCost: number;
  suggestedPrice: number;
  profitAmount: number;
  profitMargin: number;
  createdAt?: Timestamp;
}

export async function saveCalculation(data: CalculationRecord) {
  await addDoc(collection(db, "calculations"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function getUserCalculations(userId: string) {
  const q = query(
    collection(db, "calculations"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  const records = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Array<{
    id: string;
    userId: string;
    productName: string;
    category: string;
    totalCost: number;
    suggestedPrice: number;
    profitAmount: number;
    profitMargin: number;
    createdAt?: { toDate?: () => Date } | null;
  }>;

  records.sort((a, b) => {
    const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
    const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
    return bTime - aTime;
  });

  return records;
}
