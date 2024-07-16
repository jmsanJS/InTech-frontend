import styles from "../styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialmedia}>
        <span>Made by J.S.</span>
        <a href="https://www.linkedin.com/in/dev-web-sanchez" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://github.com/jmsanJS " target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <div className={styles.linkContainer}>
        <Link href="/">
          <span className={styles.link}>Home</span>
        </Link>
        <Link href="/about">
          <span className={styles.link}>About</span>
        </Link>
        <Link href="/bookmarks">
          <span className={styles.link}>Bookmarks</span>
        </Link>
        <Link href="/terms-of-service">
          <span className={styles.link}>Terms of Service</span>
        </Link>
        <Link href="/privacy-policy">
          <span className={styles.link}>Privacy Policy</span>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
