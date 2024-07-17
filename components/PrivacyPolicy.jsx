import React from "react";
import styles from "../styles/PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
  return (
    <div style={{ background: "#fbf1e6" }}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p>
          At InTech, we value your privacy and are committed to protecting your
          personal information. This Privacy Policy outlines how we collect,
          use, and safeguard your data when you use our Service. By accessing
          and using Tech, you agree to the terms outlined in this policy.
        </p>

        <h2>Information We Collect</h2>
        <p>
          When you create an account, we collect your name, email address and a
          password to provide you with personalized services such as bookmarking
          articles.
        </p>

        <h2>Use of Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>
            <strong>Service Provision:</strong> To provide, maintain, and
            improve the Service.
          </li>
          <li>
            <strong>Personalization:</strong> To allow you to save articles and
            access them later.
          </li>
          <li>
            <strong>Communication:</strong> To send you updates and information
            about the Service.
          </li>
        </ul>

        <h2>Data Protection</h2>
        <p>
          We are committed to protecting your data. We implement the following
          measures to ensure its security:
        </p>
        <ul>
          <li>
            <strong>Encryption:</strong> We use encryption to protect your
            personal information during transmission.
          </li>
          <li>
            <strong>Access Controls:</strong> Only authorized personnel have
            access to your data.
          </li>
          <li>
            <strong>Regular Audits:</strong> We perform regular security audits
            to identify and mitigate potential vulnerabilities.
          </li>
        </ul>

        <h2>Sharing of Information</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to outside parties. We may share your data only under the following
          circumstances:
        </p>
        <ul>
          <li>
            <strong>Legal Requirements:</strong> If required by law or in
            response to valid requests by public authorities (e.g., a court or a
            government agency).
          </li>
        </ul>

        <h2>User Rights</h2>
        <p>
          You have the following rights regarding your personal information:
        </p>
        <ul>
          <li>
            <strong>Access:</strong> You can request access to your personal
            data.
          </li>
          <li>
            <strong>Correction:</strong> You can request corrections to any
            inaccuracies in your personal data.
          </li>
          <li>
            <strong>Deletion:</strong> You can delete your account and personal
            data at any time.
          </li>
          <li>
            <strong>Objection:</strong> You can object to the processing of your
            personal data in certain circumstances.
          </li>
        </ul>

        <h2>Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your
          experience on our Service. You can control the use of cookies through
          your browser settings.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Our Service contains links to third-party websites. We are not
          responsible for the privacy practices of these websites. We encourage
          you to review the privacy policies of any third-party sites you visit.
        </p>

        <h2>Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on our website.
          You are advised to review this Privacy Policy periodically for any
          changes.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please fill out our contact form.
        </p>

        <p>
          Thank you for trusting InTech with your personal information. We are
          committed to ensuring your data is protected and used responsibly.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
