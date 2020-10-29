import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBU0hkqiqjgKKRLS5BEZ__wVjCV-1PtOLI",
    authDomain: "crwn-db-e6cb5.firebaseapp.com",
    databaseURL: "https://crwn-db-e6cb5.firebaseio.com",
    projectId: "crwn-db-e6cb5",
    storageBucket: "crwn-db-e6cb5.appspot.com",
    messagingSenderId: "402275189519",
    appId: "1:402275189519:web:0c0f0c049777dd7675347a",
    measurementId: "G-WB97QNJDDN"
  }


  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log(error)
      }
    }

    return userRef;
  }



firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;