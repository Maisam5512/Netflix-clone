import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAXN58IgFO5GA6bEEgX3NbDr08rgk4TRjE",
  authDomain: "netflix-clone-61c3a.firebaseapp.com",
  projectId: "netflix-clone-61c3a",
  storageBucket: "netflix-clone-61c3a.firebasestorage.app",
  messagingSenderId: "369911121077",
  appId: "1:369911121077:web:b113b09aef3779555f2afc",
  measurementId: "G-GZHVQL5XP6"
};

// Initialize Firebase
//const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const Signup = async (name , email , password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email , password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email

        })
    }
    catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
} 

const login = async(email,password)=>{
 try{
      await signInWithEmailAndPassword(auth, email, password);
 }
 catch(error){
       console.log(error)
       toast.error(error.code.split('/')[1].split('-').join(" "));
 }
}

const logout = () => {
    signOut(auth)
}

export {auth , db, login, logout , Signup}