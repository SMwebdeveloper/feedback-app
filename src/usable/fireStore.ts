import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";


// add store
export const addStore = async (payload: object, key: string) => {
  
    const colRef = collection(db, key);
    await addDoc(colRef, {
      ...payload,
    }).then(() => {
      console.log('add store')
    }).catch((error) => {
      console.log(error)
    })
  
    
};


//  fetch store
export const getStore = async (payload: string) => {
  let result: object[] = []
  const colRef = collection(db, payload)
  await onSnapshot(colRef, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      result.push({...doc.data(), id:doc.id})
    })
  })
  return result
}

