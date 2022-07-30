import firebase from "firebase/app";
import config from "./config/json"
import "firebase/auth";
import "firebase/firestore";


  firebase.initializeApp(config);
  export default firebase;