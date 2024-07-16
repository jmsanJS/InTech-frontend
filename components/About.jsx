import React from "react";
import styles from "../styles/About.module.css";

function About() {
  return (
    <div style={{"background": "#fbf1e6"}}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>About InTech</h1>
        <p>
          Welcome to <strong>InTech</strong>, your ultimate search engine
          for technology articles. Our mission is to help you discover the
          latest and most relevant tech content from some of the leading digital
          magazines, including Wired, The Verge, TechCrunch, Ars Technica, New
          Scientist, and The Next Web.
        </p>

        <p>
          At InTech, we believe in making high-quality technology
          journalism easily accessible. Our platform is designed to index
          articles from trusted sources and direct you to the original content
          with a single click. We do not produce or host any articles ourselves;
          we simply provide a gateway to the information you seek.
        </p>

        <h2>Features:</h2>
        <ul>
          <li>
            <strong>Comprehensive Search:</strong> Find articles on the latest
            tech trends, product reviews, scientific discoveries, and more.
          </li>
          <li>
            <strong>User Accounts:</strong> Create an account to save articles
            you find interesting and access them later.
          </li>
          <li>
            <strong>Privacy Focused:</strong> We do not show ads or sell your
            personal data to third parties.
          </li>
          <li>
            <strong>Easy Navigation:</strong> Our user-friendly interface
            ensures you can quickly find and access the content you need.
          </li>
        </ul>

        <p>
          At InTech, we are dedicated to enhancing your reading experience
          and keeping you informed about the fast-paced world of technology.
          Thank you for choosing InTech as your go-to resource for tech
          news and articles.
        </p>

        <p>
          For more information or support, please fill out our contact form.
        </p>
      </div>
    </div>
  );
}

export default About;
