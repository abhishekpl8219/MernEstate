// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  "AIzaSyBDwTzZJI2lFdx54Lc25fPt9cntqSQAvOc",
  authDomain: "mern-state-4f18e.firebaseapp.com",
  projectId: "mern-state-4f18e",
  storageBucket: "mern-state-4f18e.appspot.com",
  messagingSenderId: "266536614348",
  appId: "1:266536614348:web:704b0be8ee5995598cc569"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);