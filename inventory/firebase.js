// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4yHqX6-42J7AKOf1xuC0_KFFpTfDFiVs",
  authDomain: "inventory-management-2c464.firebaseapp.com",
  projectId: "inventory-management-2c464",
  storageBucket: "inventory-management-2c464.appspot.com",
  messagingSenderId: "436658572290",
  appId: "1:436658572290:web:b6328015b82c4f516ceb1b",
  measurementId: "G-5077DLV0E7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app, firebaseConfig }