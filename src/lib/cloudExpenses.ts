import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type Expense = {
  id: string;
  value: number;
  createdAt: string;
};

export function subscribeCloudExpenses(
  userId: string,
  onChange: (expenses: Expense[]) => void
) {
  const ref = collection(db, "users", userId, "expenses");

  return onSnapshot(ref, (snapshot) => {
    const expenses: Expense[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        value: Number(data.value ?? 0),
        createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
      };
    });

    expenses.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    onChange(expenses);
  });
}

export async function addCloudExpense(userId: string, value: number) {
  const ref = collection(db, "users", userId, "expenses");

  await addDoc(ref, {
    value,
    createdAt: serverTimestamp(),
  });
}

export async function deleteCloudExpense(userId: string, expenseId: string) {
  const ref = doc(db, "users", userId, "expenses", expenseId);
  await deleteDoc(ref);
}