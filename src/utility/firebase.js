import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5lOWJIj5Do5mu7EMn1Ulpokk_g_VV3b4",
  authDomain: "budgetbuddy-b6fb2.firebaseapp.com",
  projectId: "budgetbuddy-b6fb2",
  storageBucket: "budgetbuddy-b6fb2.appspot.com",
  messagingSenderId: "632836786957",
  appId: "1:632836786957:web:155ab88b0bc5b223d6fe44",
  measurementId: "G-C6TSD4V849",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const signInWithGoogle = () => {
  signInWithPopup(auth, provider);
};
const firebaseSignOut = () => signOut(auth);
const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(app), setUser), []);

  return [user];
};

const handleLogin = async (navigate) => {
  // const navigate = useNavigate();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;

      // Check if the user's email is associated with an existing account
      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);

      if (signInMethods.length === 0) {
        // The email is not associated with an existing account
        // Prompt the user to sign up with Google
        signUpWithGoogle(navigate);
      } else {
        // The email is associated with an existing account
        // Redirect to home page or perform the sign-in logic as needed
        const { user } = result;
        const { displayName, photoURL, uid } = user;

        localStorage.setItem("isSignedIn", true);
        localStorage.setItem("name", displayName);
        localStorage.setItem("photoUrl", photoURL);
        localStirage.setItem("uid", uid);
        navigate(0);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const checkIfLoggedIn = () => {
  const isSignedIn = localStorage.getItem("isSignedIn");
  return isSignedIn;
};

const handleLogOut = (navigate) => {
  signOut(auth);
  localStorage.removeItem("isSignedIn");
  localStorage.removeItem("name");
  localStorage.removeItem("photoUrl");
  localStorage.removeItem("uid");
  navigate(0);
};

const signUpWithGoogle = async (navigate) => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userData = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      await setDoc(userDocRef, userData, { merge: true });

      const { displayName, photoURL, uid } = user;

      localStorage.setItem("isSignedIn", true);
      localStorage.setItem("name", displayName);
      localStorage.setItem("photoUrl", photoURL);
      localStorage.setItem("uid", uid);

      // Redirect to home page or another route after successful sign-up
      navigate(0); // Adjust the route as needed
    })
    .catch((error) => {
      console.error(error);
    });
};

const isOnboarded = async () => {
  const id = localStorage.getItem("uid")
  const userDocRef = doc(db, "users", id);
  await updateDoc(userDocRef, {
    onboarded: true
  })
};

const submitOnboardingInformation = async (income, budget) => {
  const id = localStorage.getItem("uid")
  const userDocRef = doc(db, "users", id);
  const userData = {
    income: income,
    budget: budget
  };

  await setDoc(userDocRef, userData, { merge: true });
  await updateDoc(userDocRef, {
    onboarded: true
  })
}

export async function changeIncome(income){
  const id = localstorage.getItem("uid")
  const userDocRef = doc(db, "users", id);
  await updateDoc(userDocRef, {
      income: income
    })
}

export async function changeBudget(budget){
  const id = localstorage.getItem("uid")
  const userDocRef = doc(db, "users", id);
  await updateDoc(userDocRef, {
      budget: budget
    })
}



export async function getIncome() {
  const docRef = doc(db, "users", "income");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function getBudget() {
  const docRef = doc(db, "users", "budget");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

export {
  db,
  auth,
  provider,
  signInWithGoogle,
  firebaseSignOut as signOut,
  useAuthState,
  handleLogin,
  signUpWithGoogle,
  handleLogOut,
  checkIfLoggedIn,
  isOnboarded,
  submitOnboardingInformation
};
// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }