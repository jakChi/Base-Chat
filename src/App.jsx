/* eslint-disable react/prop-types */
// import "./App.css";
// import ChatRoom from "./components/ChatRoom";
// import SignIn from "./components/SignIn";

// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

// import { useAuthState } from "react-firebase-hooks/auth";

// firebase.initializeApp({
//   apiKey: "AIzaSyApd8cZ7ACjq1FWfuzBQemE5pWVIYB7a6I",
//   authDomain: "basechat-cc7fc.firebaseapp.com",
//   projectId: "basechat-cc7fc",
//   storageBucket: "basechat-cc7fc.appspot.com",
//   messagingSenderId: "737547088111",
//   appId: "1:737547088111:web:d8e6ce2f3d9b6ab4782b1a",
//   measurementId: "G-4V0543HXC1",
// });

// const auth = firebase.auth();
// const firestore = firebase.firestore();

// function App() {
//   const [user] = useAuthState(auth);

//   return (
//     <>
//       <header>header</header>
//       <h1>react</h1>
//       <section>{user ? <ChatRoom /> : <SignIn />}</section>
//     </>
//   );
// }

// export default App;

import React, { useRef, useState } from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyApd8cZ7ACjq1FWfuzBQemE5pWVIYB7a6I",

  authDomain: "basechat-cc7fc.firebaseapp.com",

  projectId: "basechat-cc7fc",

  storageBucket: "basechat-cc7fc.appspot.com",

  messagingSenderId: "737547088111",

  appId: "1:737547088111:web:d8e6ce2f3d9b6ab4782b1a",

  measurementId: "G-4V0543HXC1",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
//const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  // const [formValue, setFormValue] = useState("");

  // const sendMessage = async (e) => {
  //   e.preventDefault();

  //   const { uid, photoURL } = auth.currentUser;

  //   await messagesRef.add({
  //     text: formValue,
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //     uid,
  //     photoURL,
  //   });

  //   setFormValue("");
  //   dummy.current.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      {/* <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button> 
      </form>
      */}
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  //const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
