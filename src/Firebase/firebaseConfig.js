import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDMKI3nkefC2SOS9MHq6US4yRQhrq37Qk",
  authDomain: "cigstore.firebaseapp.com",
  projectId: "cigstore",
  storageBucket: "cigstore.firebasestorage.app",
  messagingSenderId: "470758211840",
  appId: "1:470758211840:web:59d67bcefdaf545f3133e5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);