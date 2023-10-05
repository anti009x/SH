// import Firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/app-check';

const firebaseConfig = {

  apiKey: "AIzaSyD_deh476Mdq9ri_74dFn6ooCFt5HFq_Do",
  authDomain: "smarthealth-360f7.firebaseapp.com",
  databaseURL: "https://smarthealth-360f7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smarthealth-360f7",
  storageBucket: "smarthealth-360f7.appspot.com",
  messagingSenderId: "578290916365",
  appId: "1:578290916365:web:8c689a536f9479d15fc944",
  measurementId: "G-M6CYMSJDD9"




};

const configfirebase = firebase.initializeApp(firebaseConfig);

export {configfirebase};
