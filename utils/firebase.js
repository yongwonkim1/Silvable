
import * as firebase from 'firebase/app';
import config from '../firebase.json';
import * as firestore from "firebase/firestore";
import * as Auth from 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCNrG8HQQl3o4nDww5bTqNACCeK0ycv8OI",
    authDomain: "project-dankook.firebaseapp.com",
    projectId: "project-dankook",
    storageBucket: "project-dankook.appspot.com",
    messagingSenderId: "593786856662",
    appId: "1:593786856662:web:91b20319ad652fc3999577",
    measurementId: "G-BBJVQ1FBVC"
  };

  const app = initializeApp(firebaseConfig);

  const auth = Auth.getAuth();

  export const login = async ({ email, password }) => {
    const {user} = await Auth.signInWithEmailAndPassword(auth, email, password);
    return user;
};

export const signup = async ({ email, password }) => {
    const {user} = await Auth.createUserWithEmailAndPassword(auth, email, password);
    return user;
};

export const dbService = getFirestore();


