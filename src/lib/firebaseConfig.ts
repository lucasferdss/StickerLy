import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmI4hhPWCoiu7sTcAxSC93jX4O3kckUtM",
  authDomain: "stickerly-a8dc4.firebaseapp.com",
  projectId: "stickerly-a8dc4",
  storageBucket: "stickerly-a8dc4.firebasestorage.app",
  messagingSenderId: "701162606632",
  appId: "1:701162606632:web:e99648a6e99ef33c99e51d",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);