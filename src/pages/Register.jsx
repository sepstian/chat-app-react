import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form submitted");

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    if (!displayName || !email || !password || !file) {
      console.log("Validation failed");
      setErr("All fields are required");
      setLoading(false);
      return;
    }

    try {
      // Buat pengguna baru
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Buat nama unik untuk gambar
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      // Unggah file dengan penanganan kesalahan
      await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Perbarui profil pengguna
      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });

      // Buat pengguna di Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });

      // Buat dokumen kosong untuk percakapan pengguna di Firestore
      await setDoc(doc(db, "userChats", res.user.uid), {});

      navigate("/");
    } catch (err) {
      console.error("Error during sign-up:", err);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Bree Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <div className="password-container">
            <input
              required
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="password-eye"
              onClick={toggleShowPassword}
            />
          </div>
          <input required style={{ display: "none" }} type="file" id="file" />
          <text >Password must 6 characters</text>
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <text>Must add an avatar. jpg, jpeg, png </text>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
