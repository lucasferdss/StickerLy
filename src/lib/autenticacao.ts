import {
  GoogleAuthProvider,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

const googleProvider = new GoogleAuthProvider();

function getErrorCode(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error
    ? String(error.code)
    : "";
}

export async function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function loginWithEmail(email: string, password: string) {
  const cleanEmail = email.trim().toLowerCase();

  try {
    return await signInWithEmailAndPassword(auth, cleanEmail, password);
  } catch (error: unknown) {
    const methods = await fetchSignInMethodsForEmail(auth, cleanEmail);

    if (methods.includes("google.com")) {
      const result = await signInWithPopup(auth, googleProvider);

      if (result.user.email?.toLowerCase() === cleanEmail) {
        const credential = EmailAuthProvider.credential(cleanEmail, password);

        try {
          await linkWithCredential(result.user, credential);
        } catch (linkError: unknown) {
          if (getErrorCode(linkError) !== "auth/provider-already-linked") {
            throw linkError;
          }
        }

        return result;
      }
    }

    throw error;
  }
}

export async function registerWithEmail(
  name: string,
  email: string,
  password: string
) {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  const methods = await fetchSignInMethodsForEmail(auth, cleanEmail);

  if (methods.includes("google.com")) {
    const result = await signInWithPopup(auth, googleProvider);

    if (result.user.email?.toLowerCase() === cleanEmail) {
      const credential = EmailAuthProvider.credential(cleanEmail, password);

      try {
        await linkWithCredential(result.user, credential);
      } catch (linkError: unknown) {
        if (getErrorCode(linkError) !== "auth/provider-already-linked") {
          throw linkError;
        }
      }

      if (cleanName && !result.user.displayName) {
        await updateProfile(result.user, {
          displayName: cleanName,
        });
      }

      return result;
    }
  }

  const result = await createUserWithEmailAndPassword(
    auth,
    cleanEmail,
    password
  );

  if (cleanName) {
    await updateProfile(result.user, {
      displayName: cleanName,
    });
  }

  return result;
}

export async function resetPassword(email: string) {
  const cleanEmail = email.trim().toLowerCase();
  return sendPasswordResetEmail(auth, cleanEmail);
}

export async function logoutUser() {
  return signOut(auth);
}
