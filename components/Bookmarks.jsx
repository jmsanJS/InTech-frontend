import { useSelector } from "react-redux";
import Head from "next/head";
import styles from "../styles/Bookmarks.module.css";
import Article from "./Article";

function Bookmarks() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const user = useSelector((state) => state.user.value);

  let articles = "";

  if (bookmarks.length > 0) {
    articles = bookmarks.map((data, i) => {
      return <Article key={i} {...data} isBookmarked />;
    });
  } else if (user.token) {
    articles = <p>No articles to display</p>;
  } else {
    articles = <p>Sign in to see your bookmarked articles</p>;
  }

  return (
    <div>
      <Head>
        <title>InTech - Bookmarks</title>
      </Head>
      <div className={styles.container}>
        <h2 className={styles.title}>Bookmarks</h2>
        <div className={styles.articlesContainer}>{articles}</div>
      </div>
    </div>
  );
}

export default Bookmarks;
