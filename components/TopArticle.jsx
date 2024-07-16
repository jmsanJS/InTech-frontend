import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import styles from "../styles/TopArticle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { Popover } from "@mui/material";
import Typography from "@mui/material/Typography";

function TopArticle(props) {
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

  if (!props.title || !props.urlToImage) {
    return null;
  }

  let iconStyle = {};
  if (props.isBookmarked) {
    iconStyle = { color: "#DC5F00" };
  }

  const imgDisplay = (
    <a href={props.url} target="_blank" className={styles.imageLink}>
      <img
        src={
          props.urlToImage ? props.urlToImage : "/assets/no-image-available.png"
        }
        className={styles.image}
        alt={props.title}
      />
    </a>
  );

  return (
    <div className={styles.topContainer}>
      {imgDisplay}
      <div className={styles.topText}>
        <a href={props.url} target="_blank" className={styles.newsLink}>
          {props.title.length > 90 ? (
            <h2 className={styles.topTitle}>
              {props.title.slice(0, 90) + "..."}
            </h2>
          ) : (
            <h2 className={styles.topTitle}>{props.title}</h2>
          )}
        </a>
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
            <Typography sx={{ p: 1, fontSize: 14, fontFamily: "Newsreader" }}>
              Sign in to bookmark this article
            </Typography>
          </Popover>
        )}
        <h4>{props.author}</h4>
        {props.source && (
          <h4 className={styles.newsSource}>{props.source.name}</h4>
        )}
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default TopArticle;
