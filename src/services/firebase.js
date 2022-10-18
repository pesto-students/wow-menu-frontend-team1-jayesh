import { useState } from "react";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import storage from "../utils/firebase";

export default function FirebaseService() {
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [url, setUrl] = useState(null);

  const uploadFile = (file, name) => {
    setloading(true);
    const storageRef = ref(
      storage,
      `/files/${name}${new Date().toISOString()}`,
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentUpload = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        // update progress
        setPercent(percentUpload);
      },
      (err) => console.error(err),

      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((urlPath) => {
          setUrl(urlPath);
          setloading(false);
        });
      },
    );
  };

  const getPathStorageFromUrl = (downloadUrl) => {
    try {
      const baseUrl =
        "https://firebasestorage.googleapis.com/v0/b/workflow-19f2c.appspot.com/o/";
      if (!downloadUrl.includes(baseUrl)) {
        return null;
      }
      let imagePath = downloadUrl.replace(baseUrl, "");
      const indexOfEndPath = imagePath.indexOf("?");
      imagePath = imagePath.substring(0, indexOfEndPath);
      imagePath = imagePath.replace("%2F", "/");
      imagePath = imagePath.replaceAll("%20", " ");
      imagePath = imagePath.replaceAll("%3A", ":");
      return imagePath;
    } catch (e) {
      return null;
    }
  };

  const deleteFile = (downloadUrl) => {
    // eslint-disable-next-line
    console.log(downloadUrl);
    setloading(true);
    const path = getPathStorageFromUrl(downloadUrl);
    // eslint-disable-next-line
    console.log(path);
    if (path) {
      const fileRef = ref(storage, path);
      deleteObject(fileRef)
        .then(() => {
          setloading(false);
        })
        .catch((err) => {
          setError(err.message);
          setloading(false);
        });
    }
  };

  const replaceFile = (downloadUrl, newfile, name) => {
    setloading(true);
    const path = getPathStorageFromUrl(downloadUrl);
    if (path) {
      const fileRef = ref(storage, path);
      deleteObject(fileRef)
        .then(() => {
          uploadFile(newfile, name);
        })
        .catch((err) => {
          setError(err.message);
          setloading(false);
        });
    } else {
      uploadFile(newfile, name);
    }
  };

  return { loading, error, percent, url, uploadFile, deleteFile, replaceFile };
}
