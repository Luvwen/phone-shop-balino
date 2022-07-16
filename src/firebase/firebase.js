import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

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
export const orders = collection(db, 'orders');

export const getItemsFromDb = (db, func1, func2) => {
  getDocs(db)
    .then((res) => {
      const getProducts = res.docs.map((product) => {
        const aux = product.data();
        aux.id = product.id;
        return aux;
      });
      func1(getProducts);
      func2(false);
    })
    .catch((err) => console.log(err));
};
