
import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    getDocs
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const firebaseapp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(firebaseapp);
export const db = getFirestore(firebaseapp);

// Google sign in
export async function signInWithgoogle() {
    return await signInWithPopup(auth, provider);
}

// Email signup
export async function signupWithEmail(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password);
}

// Create user document
export async function creatinguserdocFromAuth(userAuth, name) {
    const userdocRef = doc(db, "users", userAuth.uid);
    const usersnapshot = await getDoc(userdocRef);

    if (!usersnapshot.exists()) {
        await setDoc(userdocRef, {
            name: name,
            email: userAuth.email,
            createdAt: new Date()
        });

        console.log("User document created successfully");
    } else {
        console.log("User document already exists");
    }

    return userdocRef;
}

// Email login
export async function loginWithEmail(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
}

// Upload staff records only if their document IDs do not exist
export async function addcollectionanddocuments(collectionkey, objectsToAdd) {
    const collectionRef = collection(db, collectionkey);
    const batch = writeBatch(db);

    const existingDocuments = await Promise.all(
        objectsToAdd.map((staff) =>
            getDoc(doc(collectionRef, String(staff.key)))
        )
    );

    let hasNewDocuments = false;

    objectsToAdd.forEach((staff, index) => {
        if (!existingDocuments[index].exists()) {
            const documentRef = doc(
                collectionRef,
                String(staff.key)
            );

            batch.set(documentRef, staff);
            hasNewDocuments = true;
        }
    });

    if (hasNewDocuments) {
        await batch.commit();
    }
}

// Fetch staff records as an array
export async function fetchstaffdata() {
    const collectionRef = collection(db, "staff");
    const querySnapshot = await getDocs(collectionRef);

    return querySnapshot.docs.map((documentSnapshot) => ({
        ...documentSnapshot.data(),
        key: documentSnapshot.data().key ?? documentSnapshot.id
    }));
}
