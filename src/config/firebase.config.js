// firebase.config.js

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyCukcA0TxdUZKKWS8fLpJZdpASibyqfAKY",
  authDomain: "codepen-clone-ff3f4.firebaseapp.com",
  projectId: "codepen-clone-ff3f4",
  storageBucket: "codepen-clone-ff3f4.appspot.com",
  messagingSenderId: "16865176633",
  appId: "1:16865176633:web:974b23291380ff0c8731e8"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
