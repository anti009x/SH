import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBK_uS8cxhfuyJUG7UduCca7RIe_TrzG0Y",
  authDomain: "smarth-health-new.firebaseapp.com",
  projectId: 'chatingwithfirebase-f5dc2',
  storageBucket: "smarth-health-new.appspot.com",
  messagingSenderId: "943365956925",
  appId: "1:943365956925:web:5ef35dd9acd17e9c281154",
  measurementId: "G-Q6RTSDS0VS"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
