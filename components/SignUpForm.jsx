import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import styles from "../styles/Header.module.css";

export function SignUpForm(props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleKeyDown = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      handleRegister();
    }
  };

  const handleRegister = () => {
    const registerErrors = validateRegistrationForm();
    if (Object.keys(registerErrors).length > 0) {
      setErrors(registerErrors);
      return;
    }

    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ firstname, email, token: data.token }));
          setFirstname("");
          setLastname("");
          setEmail("");
          setPassword("");
          setChecked(false);
          setErrors({});
          props.closeModal();
        } else {
          setErrors({ alreadyRegistered: data.error });
        }
      });
  };

  const validateRegistrationForm = () => {
    const registerErrors = {};

    if (!firstname) {
      registerErrors.firstname = "This field is required.";
    } else if (firstname.length < 2 || firstname.length > 50) {
      registerErrors.firstname =
        "First name must be between 2 to 50 characters";
    }

    if (!lastname) {
      registerErrors.lastname = "This field is required.";
    } else if (lastname.length < 2 || lastname.length > 50) {
      registerErrors.lastname = "Last name must be between 2 to 50 characters";
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || !emailRegex.test(email)) {
      registerErrors.email = "Valid email is required";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!password || !passwordRegex.test(password)) {
      registerErrors.password =
        "Password must contain: 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and 8 characters or longer";
    }

    if (!checked) {
      registerErrors.checkbox = "Please check this box if you want to proceed";
    }

    return registerErrors;
  };

  return (
    <div className={`${styles.registerSection} ${styles.signUpForm}`}>
      <p>Sign-up</p>
      <input
        type="text"
        placeholder="First name"
        id="firstname"
        className={styles.input}
        onChange={(e) => setFirstname(e.target.value)}
        value={firstname}
        onKeyDown={handleKeyDown}
      />
      {errors.firstname && <p className={styles.error}>{errors.firstname}</p>}
      <input
        type="text"
        placeholder="Last name"
        id="lastname"
        className={styles.input}
        onChange={(e) => setLastname(e.target.value)}
        value={lastname}
        onKeyDown={handleKeyDown}
      />
      {errors.lastname && <p className={styles.error}>{errors.lastname}</p>}
      <input
        type="text"
        placeholder="Email"
        id="email"
        className={styles.input}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        onKeyDown={handleKeyDown}
      />
      {errors.email && <p className={styles.error}>{errors.email}</p>}
      <input
        type="password"
        placeholder="Password"
        id="password"
        className={styles.input}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        onKeyDown={handleKeyDown}
      />
      {errors.password && <p className={styles.error}>{errors.password}</p>}
      <div className={styles.gtcContainer}>
        <input
          type="checkbox"
          id="checkGTC"
          className={styles.input}
          onChange={() => setChecked(!checked)}
          style={{ margin: 0 }}
          onKeyDown={handleKeyDown}
          checked={checked}
        />
        <label htmlFor="checkGTC" className={styles.checkboxText}>
          By checking this box, you are agreeing to our terms of service.
        </label>
      </div>
      {errors.checkbox && <p className={styles.error}>{errors.checkbox}</p>}
      {errors.alreadyRegistered && (
        <p className={styles.error}>{errors.alreadyRegistered}</p>
      )}
      <button id="register" onClick={handleRegister} onKeyDown={handleKeyDown}>
        Register
      </button>
    </div>
  );
}
