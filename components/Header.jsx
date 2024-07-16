import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useScreenSize from "../hooks/useScreenSize";
import { logout } from "../reducers/user";
import { removeAllBookmark } from "../reducers/bookmarks";
import { showAllArticles } from "../reducers/hiddenArticles";
import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import Link from "next/link";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { ContactForm } from "./ContactForm";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

function Header() {
  const [date, setDate] = useState("2050-11-22T23:59:59");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentForm, setCurrentForm] = useState("account");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const screenSize = useScreenSize();

  useEffect(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalVisible]);

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  };

  const handleShowArticles = () => {
    dispatch(showAllArticles());
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllBookmark());
    setIsModalVisible(false);
  };

  const toggleModal = (form) => {
    setCurrentForm(form);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleUserDelete = () => {
    alert("Are you sure you want to delete your account?");
    fetch("http://localhost:3000/users/delete-account", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(logout());
          alert(data.message);
        } else {
          alert(data.error);
        }
      });
  };

  let accountModalContent;
  if (!user.token) {
    accountModalContent = (
      <div className={styles.registerContainer}>
        <SignUpForm closeModal={closeModal} />
        <SignInForm closeModal={closeModal} />
      </div>
    );
  }

  let userSection;
  if (user.token) {
    userSection = (
      <div className={styles.logoutSection}>
        <div className={styles.welcomeContainer}>
          <p className={styles.welcomeMsg}>Hello {user.firstname}</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleUserDelete}>Delete account</button>
        </div>
        <FontAwesomeIcon
          onClick={handleShowArticles}
          className={styles.eyeIcon}
          icon={faEye}
        />
      </div>
    );
  } else {
    userSection = (
      <div className={styles.headerIcons}>
        <div
          className={`${styles.iconContainer} ${styles.contactIcon}`}
          onClick={() => toggleModal("contact")}
        >
          <FontAwesomeIcon className={styles.userSection} icon={faEnvelope} />
          <p className={styles.iconText}>Contact</p>
        </div>
        <div
          className={styles.iconContainer}
          onClick={() => toggleModal("account")}
        >
          <FontAwesomeIcon className={styles.userSection} icon={faUser} />
          <p className={styles.iconText}>Account</p>
        </div>
        <div
          className={`${styles.iconContainer} ${styles.hideIcon}`}
          onClick={handleShowArticles}
        >
          <FontAwesomeIcon className={styles.userSection} icon={faEye} />
          <p className={styles.iconText}>Hidden articles</p>
        </div>
      </div>
    );
  }

  let dateFormat = "dddd, MMMM DD";
  if (screenSize.width < 480) {
    dateFormat = "DD MMM"
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Moment className={styles.date} date={date} format={dateFormat} />
        <Link href="/">
          <h1 className={styles.title} onClick={closeModal}>
            InTech
          </h1>
        </Link>
        {userSection}
      </div>

      <div className={styles.linkContainer}>
        <Link href="/">
          <span className={styles.link} onClick={closeModal}>
            Home
          </span>
        </Link>
        <Link href="/about">
          <span className={styles.link} onClick={closeModal}>
            About
          </span>
        </Link>
        <Link href="/bookmarks">
          <span className={styles.link} onClick={closeModal}>
            Bookmarks
          </span>
        </Link>
      </div>

      {isModalVisible && (
        <div id="react-modals">
          <Modal
            getContainer="#react-modals"
            open={isModalVisible}
            onCancel={closeModal}
            closeIcon={
              <CloseOutlined style={{ fontSize: 18, marginTop: 10 }} />
            }
            footer={null}
            className="modalContainer"
            width={screenSize.width >= 768 ? 400 : 300}
          >
            {currentForm === "account" ? accountModalContent : <ContactForm />}
          </Modal>
        </div>
      )}
    </header>
  );
}

export default Header;
