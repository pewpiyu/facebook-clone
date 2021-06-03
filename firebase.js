import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyC7oE6YSsEsz1VteHHYGq6qIbY3OF_rghE",
  authDomain: "facebook-6512a.firebaseapp.com",
  projectId: "facebook-6512a",
  storageBucket: "facebook-6512a.appspot.com",
  messagingSenderId: "566379642799",
  appId: "1:566379642799:web:71b63a513315f0f678f95a",
  measurementId: "G-MX2CM3T4JZ",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export { db, storage };
