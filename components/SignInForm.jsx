import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import styles from "../styles/Header.module.css";

export function SignInForm(props) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleKeyDown = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      handleConnection();
    }
  };

  const handleConnection = () => {
    const userConnectionErrors = validateConnectionForm();
    if (Object.keys(userConnectionErrors).length > 0) {
      setErrors(userConnectionErrors);
      return;
    }
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((userData) => {
        if (userData.result) {
          dispatch(
            login({ firstname: userData.firstname, email: userData.email, token: userData.token })
          );
          setSignInEmail("");
          setSignInPassword("");
          setErrors({});
          props.closeModal();
        } else {
          setErrors({ wrongPasswordOrEmail: userData.error });
        }
      });
  };

  const validateConnectionForm = () => {
    const connectErrors = {};

    if (!signInEmail) {
      connectErrors.userEmail = "Valid email is required";
    }

    if (!signInPassword) {
      connectErrors.userPassword = "This field is required.";
    }
    return connectErrors;
  };

  return (
    <div className={`${styles.registerSection} ${styles.signInForm}`}>
      <p>Sign-in</p>
      <input
        type="text"
        placeholder="Email"
        id="signInEmail"
        className={styles.input}
        onChange={(e) => setSignInEmail(e.target.value)}
        onKeyDown={handleKeyDown}
        value={signInEmail}
      />
      {errors.userEmail && <p className={styles.error}>{errors.userEmail}</p>}
      <input
        type="password"
        placeholder="Password"
        id="signInPassword"
        className={styles.input}
        onChange={(e) => setSignInPassword(e.target.value)}
        onKeyDown={handleKeyDown}
        value={signInPassword}
      />
      {errors.userPassword && (
        <p className={styles.error}>{errors.userPassword}</p>
      )}
      {errors.wrongPasswordOrEmail && (
        <p className={styles.error}>{errors.wrongPasswordOrEmail}</p>
      )}

      <button id="connection" onClick={handleConnection} onKeyDown={handleKeyDown}>
        Connect
      </button>
    </div>
  );
}
