import { db } from "./firebase";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";

export async function readData(path) {
  const querySnapshot = await getDocs(collection(db, path));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    console.log("doc", doc.data()["Expenses"]);
  });
}

export async function altReadData(path) {
  const [todos, setTodos] = useState([]);

  const fetchPost = async (path) => {
    await getDocs(collection(db, path)).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
      console.log(todos, newData);
    });
  };

  useEffect(() => {
    fetchPost(path);
  }, []);
}

export const fetchUserData = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data;
  }

  return null;
};

export default readData;
