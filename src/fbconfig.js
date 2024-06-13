// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ1pBEKZbe7NcukrjsYY8uU0cQW9I8NxA",
  authDomain: "scp-crud-react-86769.firebaseapp.com",
  projectId: "scp-crud-react-86769",
  storageBucket: "scp-crud-react-86769.appspot.com",
  messagingSenderId: "367892013191",
  appId: "1:367892013191:web:61d5c523f6c468d7d65822",
  measurementId: "G-VS76RLTFPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);




export { db, storage };