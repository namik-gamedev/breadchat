import { FirebaseOptions, initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig: FirebaseOptions = {
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
   appId: import.meta.env.VITE_FIREBASE_APP_ID,
   databaseURL: 'https://bread-9b5cb-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);

export const appAuth = getAuth(app);
export const authProvider = new GoogleAuthProvider();

export const db = getDatabase(app);

export const storage = getStorage(app);
