import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0UytI9INAprPtZN_cFFRBB3Io5qjwB1w",
  authDomain: "workflow-19f2c.firebaseapp.com",
  databaseURL:
    "https://workflow-19f2c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "workflow-19f2c",
  storageBucket: "workflow-19f2c.appspot.com",
  messagingSenderId: "913546000732",
  appId: "1:913546000732:web:c06e4a206f70c142e8e999",
  measurementId: "G-Z9WPS5Q4YT",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export default storage;
