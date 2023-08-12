// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_TMliy6EC4f6zgZcLKEe-uhjCu28OaXo",
  authDomain: "twitter-clone-232fd.firebaseapp.com",
  projectId: "twitter-clone-232fd",
  storageBucket: "twitter-clone-232fd.appspot.com",
  messagingSenderId: "875280026347",
  appId: "1:875280026347:web:c16468cb48afc588d98cae",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp;
const db = getFirestore(app);
const storage = getStorage();
export default app;
export { db, storage };
