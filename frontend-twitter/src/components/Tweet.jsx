import { useSelector } from "react-redux";
import "../modules/tweet.modules.css";
import like from "../images/like.svg";
import likeActive from "../images/like-active.svg";
import deletePic from "../images/delete.svg";
import _ from "lodash";

function Tweet({ tweet, setSelectedTweetLike, setSelectedTweetDelete }) {
  const user = useSelector((state) => state.user);
  console.log(tweet);
  return (
    tweet && (
      <div className="tweet-container p-4">
        <div className="d-flex">
          <img
            src={`http://localhost:8000/img/${tweet.author.avatar}`}
            className="profile-picture"
            alt="profile-picture"
          />
          <div className="ml-3 mr-1">
            <div className="d-flex justify-content-start">
              <h6>
                {tweet.author.firstname} {tweet.author.lastname}
              </h6>
              <p>@{tweet.author.username}</p>
            </div>
            <p className="text-start">{tweet.content}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <button
              className="action-button"
              onClick={() => {
                setSelectedTweetLike(tweet._id);
              }}
            >
              {_.findIndex(tweet.likes, { username: user.user.username }) ===
              -1 ? (
                <img src={like} alt="" />
              ) : (
                <img src={likeActive} alt="" />
              )}
            </button>
            <p>{tweet.likes.length}</p>
          </div>
          {tweet.author._id === user.user._id ? (
            <button
              onClick={() => {
                setSelectedTweetDelete(tweet._id);
              }}
            >
              <img src={deletePic} alt="" />
            </button>
          ) : null}
        </div>
      </div>
    )
  );
}

export default Tweet;
