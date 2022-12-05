import firebase from 'firebase';
import * as dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'whatsapp-clone-97ccd.firebaseapp.com',
  projectId: 'whatsapp-clone-97ccd',
  storageBucket: 'whatsapp-clone-97ccd.appspot.com',
  messagingSenderId: '847463200097',
  appId: '1:847463200097:web:1ac04a300cb3f4aee14120',
  measurementId: 'G-HJY8CWYGVV',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

function timeStamp() {
  return firebase.firestore.Timestamp.fromDate(new Date());
}
export { auth, provider, timeStamp };
export default db;
