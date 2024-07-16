import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "../styles/ContactForm.module.css";

export const ContactForm = () => {
  const form = useRef();
  const [errors, setErrors] = useState({});
  const [honeypot, setHoneypot] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendError, setSendError] = useState("");

  const validateForm = () => {
    const errors = {};
    const name = form.current.user_name.value.trim();
    const email = form.current.user_email.value.trim();
    const message = form.current.message.value.trim();

    // Error messages definition
    if (!name) {
      errors.name = "Name is required.";
    } else if (name.length < 2 || name.length > 50) {
      errors.name = "Name must be between 2 to 50 characters";
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Valid email is required.";
    }

    if (!message) {
      errors.message = "Message is required.";
    } else if (message.length < 15 || message.length > 2000) {
      errors.message = "Message must be between 15 to 2000 characters";
    }
    return errors;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (honeypot !== "") {
      return;
    }

    // In case of submitting a second message
    if (message) {
      setMessage("");
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSendError("");

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
        }
      )
      .then(
        (response) => {
          e.target.reset();
          if (response.status === 200) {
            setErrors({});
            setMessage("Your message has been sent");
          }
          setIsSubmitting(false);
        },
        () => {
          setSendError("Failed to send the message. Please try again");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <>
      <p className={styles.title}>Contact us</p>
      <form
        ref={form}
        className={styles.contactFormContainer}
        onSubmit={sendEmail}
      >
        <input
          type="text"
          name="user_name"
          placeholder="Name"
          className={styles.input}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
        <input
          type="email"
          name="user_email"
          placeholder="Email"
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        <textarea
          name="message"
          placeholder="Message"
          className={styles.textarea}
        />
        {errors.message && <p className={styles.error}>{errors.message}</p>}
        <input
          type="text"
          name="honeypot"
          style={{ display: "none" }}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
        {message && <p className={styles.success}>{message}</p>}
        {sendError && <p className={styles.error}>{sendError}</p>}
        <input
          type="submit"
          value="Send"
          className={styles.btn}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
};
