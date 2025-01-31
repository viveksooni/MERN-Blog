// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mern-blog-258ac.firebaseapp.com",
  projectId: "mern-blog-258ac",
  storageBucket: "mern-blog-258ac.firebasestorage.app",
  messagingSenderId: "709294783380",
  appId: "1:709294783380:web:07aa26e8b5143cfd8eed81",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
