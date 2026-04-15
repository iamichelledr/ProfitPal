import {
  addDoc,
  collection,
  getDocs,
  orderBy,
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
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
