// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrURgv2NDn0piLr6nylYsI-5SLRl0Qp1Q",
  authDomain: "jobdata-dfe58.firebaseapp.com",
  projectId: "jobdata-dfe58",
  storageBucket: "jobdata-dfe58.firebasestorage.app",
  messagingSenderId: "413217940558",
  appId: "1:413217940558:web:138211d8a3133cc8bbcf1f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
