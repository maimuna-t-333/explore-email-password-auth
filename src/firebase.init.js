//Do not push config publicly
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCrO_Tn-x2DIQEnoWh4uHKDS33QPercNE",
  authDomain: "explore-email-password-a-37375.firebaseapp.com",
  projectId: "explore-email-password-a-37375",
  storageBucket: "explore-email-password-a-37375.firebasestorage.app",
  messagingSenderId: "772452179932",
  appId: "1:772452179932:web:714a25fdf80eb6af277919"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
