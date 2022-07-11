import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";
//import "firebase/firestore" 대신
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

//firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

// export const authService = firebase.auth();
export const authService = getAuth();

//export const dbService = firebase.firestore(); 대신
export const dbService = getFirestore();
/* .env
REACT_APP_API_KEY ="AIzaSyDX0lYWnT9EvLLE8l1bhigrCMXGivzlzlg"
REACT_APP_AUTH_DOMAIN ="nwitter-7247d.firebaseapp.com"
REACT_APP_DATABASE_URL = ""
REACT_APP_PROJECT_ID ="nwitter-7247d"
REACT_APP_STORAGE_BUCKET ="nwitter-7247d.appspot.com"
REACT_APP_MESSAGIN_ID ="444386208408"
REACT_APP_APP_ID ="1:444386208408:web:7f18036e738f9ecbd0beed" */
