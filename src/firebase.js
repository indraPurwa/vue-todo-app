import * as firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCWZZZofGT1plpu08iDp9yiw7RfAu71z-0",
    authDomain: "vue-todo-app-backend.firebaseapp.com",
    databaseURL: "https://vue-todo-app-backend.firebaseio.com",
    projectId: "vue-todo-app-backend",
    storageBucket: "vue-todo-app-backend.appspot.com",
    messagingSenderId: "785535665759",
    appId: "1:785535665759:web:4c70daa91af365c8f0fdea"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
// db.settings({timestampsInSnapshots: true});
export default db;