// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 export const firebaseConfig = {
  apiKey: "AIzaSyAYUu_nNAOfVhjjVUcBkmnYkCY-8RyJ8Tw",
  authDomain: "mpesa-fe4f6.firebaseapp.com",
  projectId: "mpesa-fe4f6",
  storageBucket: "mpesa-fe4f6.appspot.com",
  messagingSenderId: "819061164493",
  appId: "1:819061164493:web:f5f2925f2c71a84da59c84",
  measurementId: "G-Y2DFLMBS6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);