import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOJhCE-cKBqt0UbREJy3CinR2TSk05FAo",
  authDomain: "personal-finance-tracker-cdedb.firebaseapp.com",
  projectId: "personal-finance-tracker-cdedb",
  storageBucket: "personal-finance-tracker-cdedb.appspot.com",
  messagingSenderId: "433165170723",
  appId: "1:433165170723:web:ff3f1b5de21bcaf94d5996",
  measurementId: "G-MWZRW9CNWH",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
