import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD_j94imRrpdecKESj7esPn8kkO73s_Qks",
    authDomain: "cooking-ninja-site-7acdc.firebaseapp.com",
    projectId: "cooking-ninja-site-7acdc",
    storageBucket: "cooking-ninja-site-7acdc.appspot.com",
    messagingSenderId: "852826059393",
    appId: "1:852826059393:web:b72b7c03c2e5c992d71380"
  };

  // initialize firebase
  firebase.initializeApp(firebaseConfig)

  // initialize services
  const projectFirestore = firebase.firestore()

  export { projectFirestore }