import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAd0MaHg07dNNVimBnzEQpdOxAeRFezLJc',
  authDomain: 'coderhouse-phone-app.firebaseapp.com',
  projectId: 'coderhouse-phone-app',
  storageBucket: 'coderhouse-phone-app.appspot.com',
  messagingSenderId: '740651294892',
  appId: '1:740651294892:web:cffc1ef13be8cf47f63f09',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const collectionProducts = collection(db, 'products');
