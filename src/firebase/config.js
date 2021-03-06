import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAD1vUTVvjgIvFHqEhjby2nVALdsSYSyOY",
  authDomain: "charlierobotstore.firebaseapp.com",
  projectId: "charlierobotstore",
  storageBucket: "charlierobotstore.appspot.com",
  messagingSenderId: "301439873710",
  appId: "1:301439873710:web:dbb44f20dea3883bd3f33f",
  measurementId: "G-SW1PQ6XDB0"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };