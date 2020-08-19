import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA9V7hNjPgrLqrHHs4fbcPA0RQ2-ElGYAY",
    authDomain: "insta-colne-1711.firebaseapp.com",
    databaseURL: "https://insta-colne-1711.firebaseio.com",
    projectId: "insta-colne-1711",
    storageBucket: "insta-colne-1711.appspot.com",
    messagingSenderId: "751024690855",
    appId: "1:751024690855:web:5a0da860636bfb70cc6d82",
    measurementId: "G-XD5VCX39CL"
});

const db= firebaseApp.firestore();
const auth= firebase.auth();
const storage= firebase.storage();

export {db,auth,storage};