import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import dotenv from 'dotenv';
dotenv.config();

var firebaseConfig = {
  apiKey: "AIzaSyA_Dh4PKIE5yDuc3IlRcuq_qA7PDeRlaaM",
  authDomain: "insta-clone-react-87637.firebaseapp.com",
  projectId: "insta-clone-react-87637",
  storageBucket: "insta-clone-react-87637.appspot.com",
  messagingSenderId: "17728028731",
  appId: "1:17728028731:web:f4df1ae45f302c0e689c1e",
  measurementId: "G-CD8GGJ7Y0D",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

