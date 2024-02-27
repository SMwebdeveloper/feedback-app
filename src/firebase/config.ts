import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getDatabase} from "firebase/database"

import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBWixqRrszfxworE60onMeNs15_1ldjl58",
  authDomain: "portfolio-project-dc366.firebaseapp.com",
  projectId: "portfolio-project-dc366",
  storageBucket: "portfolio-project-dc366.appspot.com",
  messagingSenderId: "351145686661",
  appId: "1:351145686661:web:1bf9a44c2567a04c6d1bec"
};
const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)
const db = getFirestore(firebase)
const database = getDatabase(firebase)

export {firebase, auth, db, database}