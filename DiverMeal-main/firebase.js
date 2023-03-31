// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqg9xUHYhC27MIl-XbbtBJkLOrbjXsYaI",
  authDomain: "divermeal-2feeb.firebaseapp.com",
  projectId: "divermeal-2feeb",
  storageBucket: "divermeal-2feeb.appspot.com",
  messagingSenderId: "728097494215",
  appId: "1:728097494215:web:95add5b9e27a6eb9015ae2",
  measurementId: "G-E347963P0X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
