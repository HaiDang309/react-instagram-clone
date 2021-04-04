import firebase from "../Services/firebase";

import { message } from "antd";

import bcrypt from "bcryptjs";

export const signUp = (user) => {
  const db = firebase.firestore();
  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      const currentUser = firebase.auth().currentUser;
      currentUser.updateProfile({
        displayName: user.username,
      })
      .then(() => {
        db.collection("users")
          .doc(data.user.uid)
          .set({
            uid: data.user.uid,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            password: bcrypt.hashSync(user.password, 10),
            follower: 0,
            following: 0,
            avatar: "",
            bio: "",
            gender: "male",
            phoneNumber: "",  
            website: '',
            createdAt: data.user.metadata.creationTime,
          })
          .then(() => {
            message.success("Successfully!")
            window.location.href = "/";
          })
          .catch((err) => {
            message.error(err.message);
          });
      })
    })
    
};

export const signIn = (user) => {
    const db = firebase.firestore();
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        db.collection("users").doc(data.user.uid).update({
          isOnline: true,
        });
        window.localStorage.setItem("uid", data.user.uid);
        window.localStorage.setItem('username', data.user.displayName)

      })
      .then(() => {
        window.localStorage.setItem("isAuth", true);
        window.location.reload();
      })
      .catch(err => {
        message.error(err.message)
      })
  };
export const signInWithProvider = () => {
    const db = firebase.firestore();
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((data) => {
        db.collection("users").doc(data.user.uid).set({
          uid: data.user.uid,
          username: data.user.displayName,
          fullName: data.user.displayName,
          email: "",
          password: "",
          follower: 0,
          following: 0,
          avatar: "",
          createdAt: data.user.metadata.creationTime,
          website: '',
          gender: "Male",
          bio: '',
          phoneNumber: ''

        });
        window.localStorage.setItem("uid", data.user.uid);
        window.localStorage.setItem("username", data.user.displayName);
        window.location.href = "/";
      })
      .then(() => {
        window.localStorage.setItem("isAuth", true);
        window.location.reload();
      })
  };

export const signOut = () => {
      firebase.auth().signOut()
      .then(() => {
        window.location.href = '/';
        window.localStorage.removeItem('isAuth')
        window.localStorage.removeItem('uid')
        window.location.reload();
      })
  };
