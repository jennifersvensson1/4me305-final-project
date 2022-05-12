import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQG7zJgouKBozQUg0BnD6v8gxPLrpIqtw",
    authDomain: "reactgallery-ecd5d.firebaseapp.com",
    projectId: "reactgallery-ecd5d",
    storageBucket: "reactgallery-ecd5d.appspot.com",
    messagingSenderId: "660847514958",
    appId: "1:660847514958:web:ff2b9a099b72959f03ba1f"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);


export { projectStorage, projectFirestore};