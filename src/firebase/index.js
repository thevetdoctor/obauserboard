import firebase from 'firebase/app';
import 'firebase/database';
import config from "./conf";


export default firebase.initializeApp(config);


  // Get a reference to the database service
  // var database = firebase.database();
