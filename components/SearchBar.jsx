import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  articlesSearchResults,
  removeOldArticlesSearch,
} from "../reducers/searchResults";
import styles from "../styles/SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

function SearchBar(props) {
  const [selectedSource, setSelectedSource] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const options = [
    { value: "wired,the-verge,techcrunch,ars-technica,new-scientist,the-next-web", label: "All Sources"},
    { value: "wired", label: "Wired" },
    { value: "the-verge", label: "The Verge" },
    { value: "techcrunch", label: "TechCrunch" },
    { value: "ars-technica", label: "Ars Technica" },
    { value: "new-scientist", label: "New Scientist" },
    { value: "the-next-web", label: "The Next Web" },
  ];

  const selectComponentStyles = {
    control: (provided, state) => ({
      // class attribute : class=" css-i32vvf-control"
      ...provided,
      borderColor: state.isFocused ? "#989898" : "#ccc",
      "&:hover": {
        borderColor: "#989898",
      },
      background: "#fff",
      borderRadius: "25px",
      fontSize: 14,
      flexWrap: "nowrap",
      width: 200,
      boxShadow: "none",
    }),
    menu: (provided) => ({
      ...provided,
      background: "#fff",
      width: "9em",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    input: (provided) => ({
      ...provided,
      padding: 0,
      margin: 0,
    }),
  };

  const handleSearchClick = () => {
    setMessage("");
    if (!selectedSource) {
      setMessage("The source is required");
      return;
    } else if (!searchInput) {
      setMessage("Type a keyword to search for articles");
      return;
    }
    fetch(
      `http://localhost:3000/articles/${selectedSource.value}/${searchInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          if (data.query.length > 0) {
            setMessage(`Search results: ${data.query.length} articles`);
            dispatch(removeOldArticlesSearch());
            dispatch(articlesSearchResults(data.query));
          } else {
            setMessage("Articles not found. Please try with another keyword.");
          }
        } else {
          setMessage("Articles not found. Please try with another keyword.");
        }
      });
  };

  // Avoids that "Search results" message changes its color to red when the search input is empty.
  const isErrorMessage = message === "The source is required" || message === "Type a keyword to search for articles";

  return (
    <>
      <p className={styles.title}>Find articles</p>
      <div className={styles.searchBarContainer}>
        <Select
          options={options}
          className={styles.sourceOptions}
          onChange={setSelectedSource}
          value={selectedSource}
          styles={selectComponentStyles}
          placeholder="Select a source..."
        />
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
            value={searchInput}
          />
          <FontAwesomeIcon
            onClick={() => handleSearchClick()}
            icon={faMagnifyingGlass}
            className={styles.searchIcon}
          />
        </div>
      </div>
      <div className={styles.msgContainer}>
        {message && (
          <p className={isErrorMessage ? styles.errorMsg : styles.numberOfArticles}>
            {message}
          </p>
        )}
      </div>
    </>
  );
}

export default SearchBar;
