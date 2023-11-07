// import Firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/app-check';

const firebaseConfig = {
  apiKey: "AIzaSyBK_uS8cxhfuyJUG7UduCca7RIe_TrzG0Y",
  authDomain: "smarth-health-new.firebaseapp.com",
  databaseURL: "https://smarth-health-new-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smarth-health-new",
  storageBucket: "smarth-health-new.appspot.com",
  messagingSenderId: "943365956925",
  appId: "1:943365956925:web:5ef35dd9acd17e9c281154",
  measurementId: "G-Q6RTSDS0VS"
};

const configfirebase = firebase.initializeApp(firebaseConfig);

export {configfirebase};
