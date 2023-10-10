import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC60n8EfUjire9DbeoPUOD7RRZafL2TykQ",
  authDomain: "feedback-8e94b.firebaseapp.com",
  databaseURL: "https://feedback-8e94b-default-rtdb.firebaseio.com",
  projectId: "feedback-8e94b",
  storageBucket: "feedback-8e94b.appspot.com",
  messagingSenderId: "610695347689",
  appId: "1:610695347689:web:d9ceee562f8420100c9f78",
};

const firebase = initializeApp(firebaseConfig)

const auth = getAuth(firebase)

const db = getFirestore()

export {firebase, db, auth}

