import { db } from "@/firebase/config";
import { ref, watchEffect } from "vue";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

// add store
export const addStore = async (payload: object, key: string) => {
  const colRef = collection(db, key);
  await addDoc(colRef, {
    ...payload,
  })
    .then(() => {
      console.log("add store");
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
      }
    });
  });
  return { newArr };
};
