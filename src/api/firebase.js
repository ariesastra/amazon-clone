// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBVm9u1QeJhwkkpBUeLtnKFI0rTTLATWZE",
    authDomain: "clone-5c7be.firebaseapp.com",
    databaseURL: "https://clone-5c7be.firebaseio.com",
    projectId: "clone-5c7be",
    storageBucket: "clone-5c7be.appspot.com",
    messagingSenderId: "847123668035",
    appId: "1:847123668035:web:8158f9f661a814780bc8f6",
    measurementId: "G-G71RJVLY5W"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };