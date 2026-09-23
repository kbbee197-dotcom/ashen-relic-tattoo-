import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDI4Ijqc38FDw0Jc_0ON1Q88vN2X3cQ4yY",
  authDomain: "ashen-relic-tattoo-52711.firebaseapp.com",
  projectId: "ashen-relic-tattoo-52711",
  storageBucket: "ashen-relic-tattoo-52711.firebasestorage.app",
  messagingSenderId: "380981040603",
  appId: "1:380981040603:web:3d66235d2ec4aa14d143fe"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
