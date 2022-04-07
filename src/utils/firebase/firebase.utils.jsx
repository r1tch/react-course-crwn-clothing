import { initializeApp } from "firebase/app";
import {
  getAuth,
  signIn,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApA208ZzedCwdsY43jKqLKKeHDXIQ_Q1Y",
  authDomain: "crwn-db-7d0e4.firebaseapp.com",
  projectId: "crwn-db-7d0e4",
  storageBucket: "crwn-db-7d0e4.appspot.com",
  messagingSenderId: "639488604771",
  appId: "1:639488604771:web:b04ed660a50b2213109656",
  measurementId: "G-YT8ENZ63K3",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userauth, additionalInformation = {}) => {
  if (!userauth) return;

  const userDocRef = doc(db, "users", userauth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userauth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
