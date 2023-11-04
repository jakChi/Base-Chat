// /* eslint-disable react/prop-types */
// import { useCollectionData } from "react-firebase-hooks/firestore";
// import { Firestore } from "firebase/firestore";

// const ChatRoom = () => {
//   const messagesRef = Firestore.collection("messages");
//   const query = messagesRef.orderBy("createdAt").limit(25);
//   const [messages] = useCollectionData(query, { idField: "id" });

//   return (
//     <>
//       <div>
//         {messages &&
//           messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
//       </div>
//     </>
//   );
// };

// function ChatMessage(props) {
//   const { text, uid } = props.message;

//   return <p>{text}</p>;
// }

// export default ChatRoom;
