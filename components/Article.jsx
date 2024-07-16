import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import { hideArticle } from "../reducers/hiddenArticles";
import Image from "next/image";
import styles from "../styles/Article.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Popover } from "@mui/material";
import Typography from "@mui/material/Typography";

function Article(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    handleBookmarkClick();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleBookmarkClick = () => {
    if (!user.token) {
      return;
    }

    fetch(`http://localhost:3000/users/can-bookmark/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            dispatch(removeBookmark(props));
          } else {
            dispatch(addBookmark(props));
          }
        }
      });
  };

  const handleHideArticle = () => {
    dispatch(hideArticle(props));
  };

  let iconStyle = {};
  if (props.isBookmarked) {
    iconStyle = { color: "#DC5F00" };
  }

  const imgDisplay = (
    <a href={props.url} target="_blank">
      <Image
        src={
          props.urlToImage ? props.urlToImage : "/assets/no-image-available.png"
        }
        alt={props.title}
        width={600}
        height={314}
      />
    </a>
  );

  if (!props.isHidden) {
    return (
      <div className={styles.articles}>
        <div className={styles.articleHeader}>
          <a href={props.url} target="_blank" className={styles.newsLink}>
            {props.title.length > 100 ? (
              <h3>{props.title.slice(0, 100) + "..."}</h3>
            ) : (
              <h3>{props.title}</h3>
            )}
          </a>
          <div className={styles.icons}>
            <FontAwesomeIcon
              onClick={handleClick}
              icon={faBookmark}
              style={iconStyle}
              className={styles.bookmarkIcon}
            />
            {!user.token && (
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography
                  sx={{ p: 1, fontSize: 14, fontFamily: "Newsreader" }}
                >
                  Sign in to bookmark this article
                </Typography>
              </Popover>
            )}
            <FontAwesomeIcon
              onClick={handleHideArticle}
              icon={faEyeSlash}
              className={styles.bookmarkIcon}
            />
          </div>
        </div>
        <h4 style={{ textAlign: "right" }}>- {props.author}</h4>
        <h4 className={styles.newsSource}>{props.source.name}</h4>
        <div className={styles.divider}></div>
        {imgDisplay}
        {props.description.length > 160 ? (
          <p>{props.description.slice(0, 160) + "..."}</p>
        ) : (
          <p>{props.description}</p>
        )}
      </div>
    );
  }

  return null;
}

export default Article;
