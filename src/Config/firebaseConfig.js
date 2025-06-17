// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiX3t8-y3C3oBdUnP64tjQtxHtYtP2y1U",
  authDomain: "gen-lang-client-0979980919.firebaseapp.com",
  databaseURL: "https://gen-lang-client-0979980919-default-rtdb.firebaseio.com",
  projectId: "gen-lang-client-0979980919",
  storageBucket: "gen-lang-client-0979980919.firebasestorage.app",
  messagingSenderId: "438521579997",
  appId: "1:438521579997:web:26d629d057533af3aa4e34",
  measurementId: "G-TFEN6HZKEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;