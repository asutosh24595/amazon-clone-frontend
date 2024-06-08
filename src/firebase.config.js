import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDFRP9MVuDuc2ZDSHprswLyYbL521TUhDQ",
  authDomain: "clone-9c1ef.firebaseapp.com",
  projectId: "clone-9c1ef",
  storageBucket: "clone-9c1ef.appspot.com",
  messagingSenderId: "732883786478",
  appId: "1:732883786478:web:c3d09ccc451ff7a53c71ff",
  measurementId: "G-XE5HL7VY4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

