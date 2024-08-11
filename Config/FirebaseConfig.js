// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-connect-2949a.firebaseapp.com",
  projectId: "pet-connect-2949a",
  storageBucket: "pet-connect-2949a.appspot.com",
  messagingSenderId: "649660721455",
  appId: "1:649660721455:web:189633581b14ff96a699da",
  measurementId: "G-HHSF3H5LHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const storage=getStorage(app)
// const analytics = getAnalytics(app);