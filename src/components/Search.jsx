import React, { useContext, useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [listUser, setListUser] = useState(null);
  const [err, setErr] = useState(false);
  const [inList, setInList] = React.useState(false);
  const listUserRef = useRef(null);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = [];
      querySnapshot.forEach((doc) => {
          usersList.push(doc.data());
      });
      setListUser(usersList)
    };
    getData()
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (listUserRef.current && !listUserRef.current.contains(event.target)) {
        setInList(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

  const handleSearch = async (value) => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", value)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const onHandleSearch = (value) => {
    setUsername(value)
    handleSearch(value)
  }

  // const handleKey = (e) => {
  //   e.code === "Enter" && handleSearch();
  // };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };

  return (
  <>
    <div ref={listUserRef} style={{ display:"flex", borderBottom:"1px solid gray", padding:"10px", flexDirection:"column"}}>
      <button className="btnLihatUser" onClick={() => setInList(!inList)}>Lihat User</button>
      <div style={{ display:inList === false ? "none":"flex" }} className="list-user">
        {listUser?.map((val, idx) => {
          console.log(val.displayName);
          return(
            <>
              <text>{val.displayName}</text>
            </>
          )
        })}
      </div>
    </div>
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          // onKeyDown={handleKey}
          onChange={(e) => onHandleSearch(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  </>
  );
};

export default Search;