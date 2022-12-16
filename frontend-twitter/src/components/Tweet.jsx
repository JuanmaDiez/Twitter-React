import { useDispatch, useSelector } from "react-redux";
import styles from "../modules/Tweet.module.css";
import like from "../images/like.svg";
import likeActive from "../images/like-active.svg";
import deletePic from "../images/delete.svg";
import _ from "lodash";
import { Link } from "react-router-dom";
import axios from "axios";
import { delete_tweet, edit_tweets } from "../redux/tweetSlice";

function Tweet({ tweet }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(delete_tweet(tweet._id));
    await axios({
      url: `${process.env.REACT_APP_API_URL}/tweets/${tweet._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };

  const handleLike = async () => {
    dispatch(edit_tweets({ tweetId: tweet._id, user: user }));
    await axios({
      url: `${process.env.REACT_APP_API_URL}/tweets/${tweet._id}`,
      method: "PATCH",
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };

  return (
    tweet && (
      <div className={`${styles.tweetContainer} p-4`}>
        <div className="d-flex">
          <img
            src={`${process.env.REACT_APP_API_URL}/img/${tweet.author.avatar}`}
            className={`${styles.profilePicture} me-2`}
            alt="profile-picture"
          />
          <div>
            <div className="d-flex justify-content-start">
              <Link
                to={`/profile/${tweet.author.username}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>
                  {tweet.author.firstname} {tweet.author.lastname}
                </h6>
              </Link>
              <p className="ms-1">@{tweet.author.username}</p>
            </div>
            <p className="text-start">{tweet.content}</p>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            {_.findIndex(tweet.likes, (like) => {
              return like._id === user._id;
            }) === -1 ? (
              <>
                <img
                  src={like}
                  alt=""
                  onClick={(event) => {
                    handleLike(event);
                  }}
                />
                <p className="mt-3 ms-1">{tweet.likes.length}</p>
              </>
            ) : (
              <>
                <img
                  src={likeActive}
                  alt=""
                  onClick={() => {
                    handleLike();
                  }}
                />
                <p className="mt-3 ms-1" style={{ color: "red" }}>
                  {tweet.likes.length}
                </p>
              </>
            )}
          </div>
          {tweet.author._id === user._id ? (
            <img
              src={deletePic}
              onClick={() => {
                handleDelete();
              }}
              alt="delete"
              style={{ backgroundColor: "inherit", border: "none" }}
            />
          ) : null}
        </div>
      </div>
    )
  );
}

export default Tweet;
