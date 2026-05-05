import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import type { StickerStatus, StickersMap } from "./figurinhas";

function stickersCollection(userId: string) {
  return collection(db, "users", userId, "stickers");
}

export function subscribeCloudStickers(
  userId: string,
  onChange: (stickers: StickersMap) => void
) {
  return onSnapshot(stickersCollection(userId), (snapshot) => {
    const result: StickersMap = {};

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const number = Number(docSnap.id);
      const status = data.status as StickerStatus;

      if (
        Number.isFinite(number) &&
        (status === "owned" || status === "repeated")
      ) {
        result[number] = status;
      }
    });

    onChange(result);
  });
}

export async function saveCloudSticker(
  userId: string,
  number: number,
  status: StickerStatus
) {
  const stickerRef = doc(db, "users", userId, "stickers", String(number));

  if (status === "missing") {
    await deleteDoc(stickerRef);
    return;
  }

  await setDoc(stickerRef, {
    number,
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function clearCloudStickers(userId: string) {
  const snapshot = await getDocs(stickersCollection(userId));
  const batch = writeBatch(db);

  snapshot.forEach((docSnap) => {
    batch.delete(docSnap.ref);
  });

  await batch.commit();
}