import { db } from "@/firebase/config";
import { ref, watchEffect } from "vue";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

// add store
export const addStore = async (payload: object, key: string) => {
  const colRef = collection(db, key);
  await addDoc(colRef, {
    ...payload,
  })
    .then(() => {
    })
    .catch((error) => {
      console.log(error);
    });
};

//  fetch store
export const getStore = async (payload: string) => {
  const newArr = ref([]);
  const colRef = collection(db, payload);

  const querySanpshot = await onSnapshot(colRef, (snapshot) => {
    const docs: any = [];
    snapshot.docs.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    newArr.value = docs;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => querySanpshot());
  });

  await new Promise<void>((resolve) => {
    const unsubscribeInitial = onSnapshot(colRef, (snapshot) => {
      if (!snapshot.empty) {
        unsubscribeInitial();
        resolve();
      } else {
        resolve();
      }
    });
  });
  return { newArr };
};

// delete store
export const deleteStore = async (key: string, type: string) => {
  const docRef = doc(db, type, key);
  await deleteDoc(docRef)
    .then(() => {
    })
    .catch((err) => console.log(err));
};

// update store 
export const updateStore = async (
  key: string,
  type: string,
  updateArr: object
) => {
  const docRef = doc(db, type, key);
  await updateDoc(docRef, updateArr)
    .then(() =>)
    .catch((error) => console.log(error));
};
