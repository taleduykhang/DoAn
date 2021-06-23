import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDo6qdpEHJTq4GjHqrHSD-CD_DJNHAfDz4",
    authDomain: "hutech-math.firebaseapp.com",
    databaseURL: "https://hutech-math-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hutech-math",
    storageBucket: "hutech-math.appspot.com",
    messagingSenderId: "301570823749",
    appId: "1:301570823749:web:31905323944f63750d352c",
    measurementId: "G-51G9X4MFXB"
  };




const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
// firebase.analytics();