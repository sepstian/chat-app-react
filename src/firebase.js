import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWWoXxlvwxIbmCVJtX4mRRjldduQmwGl0",
  authDomain: "chat-app-react-55fdc.firebaseapp.com",
  projectId: "chat-app-react-55fdc",
  storageBucket: "chat-app-react-55fdc.appspot.com",
  messagingSenderId: "706473759059",
  appId: "1:706473759059:web:f408a9b06192166bf051a6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()