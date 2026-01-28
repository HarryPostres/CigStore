import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // <--- Agregá esto

const firebaseConfig = {
  apiKey: "AIzaSyCDMKI3nkefC2SOS9MHq6US4yRQhrq37Qk",
  authDomain: "cigstore.firebaseapp.com",
  projectId: "cigstore",
  storageBucket: "cigstore-uploads-curso",
  messagingSenderId: "470758211840",
  appId: "1:470758211840:web:59d67bcefdaf545f3133e5"
};

// FIX: Si ya existe una app, usala; si no, inicializala.
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);