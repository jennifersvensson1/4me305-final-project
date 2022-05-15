import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABVVSPQ_v-TKm2omRnmUfwLJXebRrzk0E",
    authDomain: "me305-assign3.firebaseapp.com",
    projectId: "me305-assign3",
    storageBucket: "me305-assign3.appspot.com",
    messagingSenderId: "535373787715",
    appId: "1:535373787715:web:ac1945fd8269c64a24daf6"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

export { projectStorage, projectFirestore};