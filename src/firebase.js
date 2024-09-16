import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl8dz7_ZymnIBCEXJ87beCwVLf4PQHV0o",
  authDomain: "chat-app-d80fd.firebaseapp.com",
  projectId: "chat-app-d80fd",
  storageBucket: "chat-app-d80fd.appspot.com",
  messagingSenderId: "536563437458",
  appId: "1:536563437458:web:5d97799d36e49bf7affb4b",
  measurementId: "G-FRJZWM021Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()