// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCKGyBU7gM1dFgDkUFUGEwSqujH3e5na4",
  authDomain: "gofigure-b695c.firebaseapp.com",
  databaseURL: "https://gofigure-b695c-default-rtdb.firebaseio.com",
  projectId: "gofigure-b695c",
  storageBucket: "gofigure-b695c.appspot.com",
  messagingSenderId: "1061918588393",
  appId: "1:1061918588393:web:39f6a5bcd71df694d35f78",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export default firebase.initializeApp(firebaseConfig);