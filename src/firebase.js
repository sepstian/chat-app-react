import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMOeI2cMtZPAVFlJH2hOxPMk7KbaWhgDA",
  authDomain: "chat-app-react-963a2.firebaseapp.com",
  projectId: "chat-app-react-963a2",
  storageBucket: "chat-app-react-963a2.appspot.com",
  messagingSenderId: "747343950890",
  appId: "1:747343950890:web:b6956f1c0d874249debf53",
  measurementId: "G-7REF1Z6DWE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()