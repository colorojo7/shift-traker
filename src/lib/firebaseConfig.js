// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, } from "firebase/auth";
import {getFirestore }  from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAdqWrgXHOnw6jcGH0WfNLZaVOyySmzImY",
  authDomain: "shift-tracker-37294.firebaseapp.com",
  projectId: "shift-tracker-37294",
  storageBucket: "shift-tracker-37294.appspot.com",
  messagingSenderId: "892520372152",
  appId: "1:892520372152:web:1fbeea1cf70f1f85f2e14d",
  measurementId: "G-5YW4LHS02B"
};

const appFirebase =  !getApps().length? initializeApp(firebaseConfig) :getApp()

const auth = getAuth(appFirebase)
const db = getFirestore(appFirebase)
const googleAuthProvider = new GoogleAuthProvider()

export {appFirebase,auth,db, googleAuthProvider }

