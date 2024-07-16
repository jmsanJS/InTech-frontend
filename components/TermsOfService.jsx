import React from "react";
import styles from "../styles/TermsOfService.module.css";

function TermsOfService() {
  return (
    <div style={{ "background": "#fbf1e6" }}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p>
          By accessing and using InTech (the "Service"), you agree to
          comply with and be bound by these Terms of Service ("Terms"). If you
          do not agree to these Terms, please do not use the Service.
        </p>

        <h2>Description of Service</h2>
        <p>
          InTech is a search engine for technology articles from various
          digital magazines, including Wired, The Verge, TechCrunch, Ars
          Technica, New Scientist, and The Next Web. The Service does not
          produce or host any content; it merely indexes articles and provides
          links to the original content on the respective magazine websites.
        </p>

        <h2>User Accounts</h2>
        <p>
          Users have the option to create an account on InTech. By
          creating an account, you can save articles of interest. You may delete
          your account at any time. We reserve the right to terminate accounts
          that violate these Terms or engage in inappropriate behavior.
        </p>

        <h2>Privacy</h2>
        <p>
          InTech is committed to protecting your privacy. We do not
          display advertisements or sell your personal data to third parties.
          For more information, please refer to our Privacy Policy.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content linked through InTech remains the property of the
          original publishers. We respect the intellectual property rights of
          others and expect our users to do the same. If you believe that your
          work has been linked in a way that constitutes copyright infringement,
          please contact us.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          InTech provides links to external websites for informational
          purposes only. We do not endorse or guarantee the accuracy of any
          content found through the Service. We are not liable for any damages
          arising from the use of the Service or reliance on the content
          accessed through it.
        </p>

        <h2>Modifications to Service</h2>
        <p>
          We reserve the right to modify or discontinue the Service at any time
          without notice. We will not be liable to you or any third party for
          any modification, suspension, or discontinuation of the Service.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of Venezuela. Any disputes arising from or relating to these Terms or
          the use of the Service will be subject to the exclusive jurisdiction
          of the courts in Venezuela.
        </p>

        <h2>Contact Information</h2>
        <p>
          For any questions or concerns about these Terms, please fill out our
          contact form.
        </p>
      </div>
    </div>
  );
}

export default TermsOfService;
