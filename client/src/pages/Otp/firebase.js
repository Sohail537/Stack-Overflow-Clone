import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCcOhiChlhDovJMLCKjHVo5_LkAf-q0mo",
  authDomain: "stackoverflow-clone-537.firebaseapp.com",
  projectId: "stackoverflow-clone-537",
  storageBucket: "stackoverflow-clone-537.appspot.com",
  messagingSenderId: "656432647427",
  appId: "1:656432647427:web:7a6aa98714399fa6b16d36"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;