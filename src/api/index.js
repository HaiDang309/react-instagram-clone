import firebase from '../Services/firebase';

const db = firebase.firestore();

export const getUserById = async (uid) => {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();
    const usersData = [];
    snapshot.forEach(doc => {
        if(doc.data().uid === uid) {
            usersData.push(doc.data());
        }
    })

    return usersData;
}

export const getAllPosts = async (uid) => {
    const postsRef = db.collection("posts");
    const snapshot = await postsRef.get();
    const postsData = [];
    snapshot.forEach(doc => {
        if(doc.data().uid === uid) {
            postsData.push(doc.data());
        }
    })

    return postsData;
    
}

export const getAllComments = async (pid) => {
    const cmtsRef = db.collection('comments');
    const snapshot = await cmtsRef.get();
    const postsData = [];
    snapshot.forEach(doc => {
        if(doc.data().pid === pid) {
            postsData.push(doc.data());
        }
    })
    return postsData;
}