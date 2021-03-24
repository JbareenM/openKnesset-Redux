import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcTjtMeC49NN_1gfqH0Z5MMcvCMSiSdW0",
  authDomain: "open-knesset.firebaseapp.com",
  databaseURL: "https://open-knesset-default-rtdb.firebaseio.com",
  projectId: "open-knesset",
  storageBucket: "open-knesset.appspot.com",
  messagingSenderId: "692316828469",
  appId: "1:692316828469:web:231ef99e8605f24ee7127c",
  measurementId: "G-E7NPNSGXZS",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
