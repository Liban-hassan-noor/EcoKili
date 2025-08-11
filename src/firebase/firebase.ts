// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYZRtIpb1SZZI_NLqrhnzKjBUZ3CrWJb8",
  authDomain: "eco-kili-auth.firebaseapp.com",
  projectId: "eco-kili-auth",
  storageBucket: "eco-kili-auth.firebasestorage.app",
  messagingSenderId: "614992216476",
  appId: "1:614992216476:web:b90d8dbfc9089b09d9c859",
  measurementId: "G-KZ9N2LH79P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
