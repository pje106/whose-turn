import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  addDoc,
  // query,
  // getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import "./App.css";

function TaskForm(props) {
  const [input, setInput] = useState("");
  const [inputs, setInputs] = useState([]);
  const [attachment, setAttachment] = useState();
  const { currentUser } = useAuth();
  const inputRef = useRef(null);

  // const getTasks = async () => {
  //   const q = query(collection(db, "tasks").orderBy("createdAt", "desc"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const taskObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setInputs((prev) => [taskObj, ...prev]);
  //     console.log(taskObj);
  //   });
  // };

  useEffect(() => {
    // getTasks();
    const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const taskArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInputs(taskArray);
    });
    inputRef.current.focus();
    return unsub;
  }, []);

  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setInput(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let fileURL = "";
    if (input === "") {
      return;
    }
    if (attachment !== "") {
      const fileRef = ref(storage, `${currentUser.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      fileURL = await getDownloadURL(response.ref);
      console.log(fileURL);
    }
    const taskObj = {
      text: input,
      createdAt: Date.now(), //only this one can convert to date in ReadTasks
      creatorId: currentUser.uid,
      name: currentUser.displayName,
      fileURL,
    };
    await addDoc(collection(db, "tasks"), taskObj);
    setInput("");
    setAttachment("");
  };

  // props.onSubmit({
  //   id: Math.floor(Math.random() * 10000),
  //   text: input,
  // }
  // );
  // const fileRef = ref(storage, `${currentUser.uid}/${uuidv4()}`);
  // const response = ref(storage, "data_url");
  // const fileRef = storage.ref().child(`${currentUser.uid}/${uuidv4()}`);
  // const response = await fileRef.putString(attachment, "data_url");

  //   text: input,
  //   creatorId: currentUser.uid,
  //   name: currentUser.displayName,
  //   //createdTRange: serverTimestamp(),
  //   createdAt: Date.now(), //only this one can convert to date in ReadTasks

  console.log(inputs);
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmentClick = () => setAttachment(null);

  return (
    <>
      <form onSubmit={onSubmit} className="todo-form">
        {props.edit ? (
          <>
            <input
              placeholder="Update your item"
              value={input}
              onChange={onChange}
              type="text"
              ref={inputRef}
              className="todo-input edit"
            />
            <button onClick={onSubmit} className="todo-button edit">
              Update
            </button>
          </>
        ) : (
          <>
            {/* <div> */}
            <input
              placeholder="✍️what's something on your mind?"
              value={input}
              onChange={onChange}
              name="text"
              className="todo-input"
              ref={inputRef}
              maxLength={140}
            />
            {/* </div> */}
            {/* <div>
              👨‍👩‍👧‍👦 :
              <input
                placeholder="who you are?"
                value={input}
                onChange={onChange}
                name="name"
                className="todo-input"
                // ref={name}
                maxLength={140}
              />
            </div> */}
            <button onClick={onSubmit} className="todo-button">
              Post it
            </button>
            <label
              htmlFor="attach-file"
              className="factoryInput__label"
            ></label>
            <input type="file" accept="image/*" onChange={onFileChange} />
            {attachment && (
              <div className="taskForm__attachment">
                <img src={attachment} width="300px" alt="" />
                <button onClick={onClearAttachmentClick}>Clear</button>
                {/* <FontAwesomeIcon icon={faTimes} /> */}
              </div>
            )}
            {/* <section>
                    <h4>What day?</h4>
                    <div>
                      <input type="date"/>
                    </div>
                  </section> */}
          </>
        )}
      </form>
    </>
  );
}

export default TaskForm;
