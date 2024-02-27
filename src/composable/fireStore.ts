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
import {
  onChildAdded,
  onValue,
  ref as databaseRef,
  getDatabase,
} from "firebase/database";

// add store
export const addStore = async (payload: object, key: string) => {
  const colRef = collection(db, key);
  const itemId = ref("");

  await addDoc(colRef, {
    ...payload,
  })
    .then((item) => {
      itemId.value = item.id;
    })
    .catch((error) => {
      console.log(error);
    });

  return { itemId };
};

//  fetch store
export const getStore = async (payload: string) => {
  const newArr = ref([]);
  const colRef = collection(db, payload);

  const querySanpshot = await onSnapshot(colRef, (snapshot) => {
    const docs: any = [];
    snapshot.docs.forEach(async (doc) => {
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
    .then(() => {})
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
    .then(() => {})
    .catch((error) => console.log(error));
};

// get messages
export const getMessages = async (type?: string) => {
  const allMessages: any = ref([]);
  const db = databaseRef(getDatabase(), "messages/");
  const getMessage = await onChildAdded(db, (snapshot) => {
    allMessages.value.push({ id: snapshot.key, ...snapshot.val() });
  });
  if (type) {
    allMessages.value = allMessages.value.filter((item: any) => {
      return type === item.chat
    })
  }
  watchEffect((onInvalidDate) => {
    onInvalidDate(() => getMessage());
  });
  await new Promise<void>((resolve) => {
    const unsubscribeInitial = onChildAdded(db, (data: any) => {
      if (!data.empty) {
        unsubscribeInitial();
        resolve();
      } else {
        resolve();
      }
    });
  });
  return { allMessages };
};
