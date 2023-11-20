import {
  uploadBytes,
  ref as imgRef,
  getStorage,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

export const getImage = async (imgEl: any)  => {
  let result
  const storageRef = imgRef(storage, `images/${imgEl.name}`);
  await uploadBytes(storageRef, imgEl);
  await getDownloadURL(imgRef(storage, `images/${imgEl.name}`))
    .then((url) => {
      result = url;
    })
    .catch((e) => console.log(e));

    return result
};

