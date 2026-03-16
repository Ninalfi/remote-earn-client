import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';
import { GoogleAuthProvider } from "firebase/auth";
import axios from 'axios'; // 🔄 use normal axios here

const AuthProvider = ({children}) => {
  const provider = new GoogleAuthProvider();
  const [user,setUser]=useState(null)
  const [load,setLoad]=useState(true)
  const [token,setToken]=useState(null);
  const [navHeight, setNavHeight] = useState(0);

  const gsignup = () => signInWithPopup(auth, provider);

  const signup = async (email, pass, name, photo) => {
    setLoad(true);
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(res.user, {
      displayName: name,
      photoURL: photo,
    });
    return res.user;
  };

  const signin = (email, pass) => {
    setLoad(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (cuser) => {
      if (cuser) {
        try {
          const idToken = await cuser.getIdToken(); 
          setToken(idToken);
          const res = await axios.get(`http://localhost:5000/users?email=${cuser.email}`);
          setUser(res.data);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoad(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  const userinfo = {
    user,
    signup,
    signin,
    load,
    setUser,
    gsignup,
    logout,
    navHeight,
    setNavHeight,
    token,
    setLoad
  };

  return (
    <AuthContext.Provider value={userinfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
