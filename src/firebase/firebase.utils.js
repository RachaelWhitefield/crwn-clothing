import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyA8wFlpPL40TzSG4kv6l-LOiCuTs34KKnk",
    authDomain: "crwn-db-6319b.firebaseapp.com",
    databaseURL: "https://crwn-db-6319b.firebaseio.com",
    projectId: "crwn-db-6319b",
    storageBucket: "crwn-db-6319b.appspot.com",
    messagingSenderId: "168876393999",
    appId: "1:168876393999:web:f87b8b8d6b01e1414d857a",
    measurementId: "G-49NDK8N05E"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
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
            console.log("error creating user", error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;