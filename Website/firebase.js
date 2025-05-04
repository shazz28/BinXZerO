// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9yjnkHH3CI0FfbHj8s6zVrloWSFrE654",
  authDomain: "binxzero-7d76f.firebaseapp.com",
  projectId: "binxzero-7d76f",
  storageBucket: "binxzero-7d76f.firebasestorage.app",
  messagingSenderId: "870557518976",
  appId: "1:870557518976:web:75e9df319f6500d9a0aa65",
  measurementId: "G-6V9C837NQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);