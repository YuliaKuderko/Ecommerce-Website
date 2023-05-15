import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDoBQJcU7FBAyLVxAKSIywoQ6iJrbmg7M0",
    authDomain: "mystore-8d174.firebaseapp.com",
    projectId: "mystore-8d174",
    storageBucket: "mystore-8d174.appspot.com",
    messagingSenderId: "632012794179",
    appId: "1:632012794179:web:0c45df66801ab143a1a7f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app