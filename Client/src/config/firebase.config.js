import {getApp, getApps, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCyEw-klF_YWiV3jbI1xR2IuM5UbvRZxEw",
  authDomain: "fruti-app-aa8b1.firebaseapp.com",
  databaseURL: "https://fruti-app-aa8b1-default-rtdb.firebaseio.com",
  projectId: "fruti-app-aa8b1",
  storageBucket: "fruti-app-aa8b1.appspot.com",
  messagingSenderId: "975849482463",
  appId: "1:975849482463:web:b930bd6cfd14d6408ee16a"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, firestore, storage};