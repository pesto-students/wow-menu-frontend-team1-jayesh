import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: "workflow-19f2c",
  storageBucket: "workflow-19f2c.appspot.com",
  messagingSenderId: "913546000732",
  appId: "1:913546000732:web:c06e4a206f70c142e8e999",
  measurementId: "G-Z9WPS5Q4YT",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export default storage;
