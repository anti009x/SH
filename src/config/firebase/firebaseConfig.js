import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAvaD6_r7MwqkgfkrbSdq6_m__n_D6rtZM',
  authDomain: 'chatingwithfirebase-f5dc2.firebaseapp.com',
  projectId: 'chatingwithfirebase-f5dc2',
  storageBucket: 'chatingwithfirebase-f5dc2.appspot.com',
  messagingSenderId: '1045817551204',
  appId: '1:1045817551204:web:53065c7be154216b95b271',
  measurementId: 'G-XD30Y5665F',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
