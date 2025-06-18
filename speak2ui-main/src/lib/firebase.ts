
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLsbftFpy902CR-D9wKuL889-DPgIFPDY",
  authDomain: "speak-2-ui.firebaseapp.com",
  projectId: "speak-2-ui",
  storageBucket: "speak-2-ui.firebasestorage.app",
  messagingSenderId: "301456886109",
  appId: "1:301456886109:web:2736c54b215ed3366500b4",
  measurementId: "G-00G85QD442"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };
