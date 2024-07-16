import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Article from "./Article";
import TopArticle from "./TopArticle";
import SearchBar from "./SearchBar";
import styles from "../styles/Home.module.css";
import { ThreeDots } from "react-loader-spinner";

function Home() {
  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const hiddenArticles = useSelector((state) => state.hiddenArticles.value);
  const [loading, setLoading] = useState(true);

  const articlesSearchResults = useSelector(
    (state) => state.searchResults.value
  );

  useEffect(() => {
    fetch("http://localhost:3000/headlines")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);

        if (articlesSearchResults.length > 0) {
          // Articles from the search results
          const filteredSearchResults = articlesSearchResults[0].filter((article) => article.title !== "[Removed]");
          setTopArticle(filteredSearchResults[0]);
          setArticlesData(filteredSearchResults.slice(1));
        } else {
          // Initial headlines articles before search
          const filteredHeadlines = data.articles.filter((article) => article.title !== "[Removed]");
          setTopArticle(filteredHeadlines[0]);
          setArticlesData(filteredHeadlines.slice(1));
        }
      });
  }, [articlesSearchResults]);

  const articles = articlesData.map((data, i) => {
    const isBookmarked = bookmarks.some(
      (bookmark) => bookmark.title === data.title
    );
    const isHidden = hiddenArticles.some(
      (article) => article.title === data.title
    );
    return (
      <Article
        key={i}
        {...data}
        isBookmarked={isBookmarked}
        isHidden={isHidden}
      />
    );
  });

  let topArticles;
  if (bookmarks.some((bookmark) => bookmark.title === topArticle.title)) {
    topArticles = <TopArticle {...topArticle} isBookmarked={true} />;
  } else {
    topArticles = <TopArticle {...topArticle} isBookmarked={false} />;
  }

  return (
    <div className={styles.contentContainer}>
      <Head>
        <title>InTech - Home</title>
      </Head>
      <SearchBar />
      {loading ? (
        <div className={styles.loadingContainer}>
        <ThreeDots
          visible={true}
          height="70"
          width="70"
          color="#333"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
        />
        </div>
      ) : (
        topArticles
      )}
      <div className={styles.articlesContainer}>{articles}</div>
    </div>
  );
}

export default Home;
