import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAT9kkw3pNEFHAvk7zw-Nx1tcLllV4ObHI",
    authDomain: "crud-5d35d.firebaseapp.com",
    projectId: "crud-5d35d",
    storageBucket: "crud-5d35d.appspot.com",
    messagingSenderId: "107308219660",
    appId: "1:107308219660:web:96b7e0d900f5112d5e5d29"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)