// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHva7MA-oieriPO_fberAblpO_IxWUtAs",
  authDomain: "projectm-e1638.firebaseapp.com",
  databaseURL: "https://projectm-e1638-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projectm-e1638",
  storageBucket: "projectm-e1638.appspot.com",
  messagingSenderId: "402807266817",
  appId: "1:402807266817:web:307b33f230421fd58a2a00",
  measurementId: "G-98L2TKEMPS"
};

// Initialize Firebase
const app = initializeApp ({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
  measurementId: firebaseConfig.measurementId,
});

const storages = getStorage(app);
export default storages;