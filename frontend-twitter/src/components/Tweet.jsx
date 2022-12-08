import { useSelector } from "react-redux";
import "../modules/tweet.modules.css";
import like from "../images/like.svg";
import likeActive from "../images/like-active.svg";
import deletePic from "../images/delete.svg";
import _ from "lodash";
import { Link } from "react-router-dom";

function Tweet({
  tweet,
  setSelectedTweetLike,
  setSelectedTweetDelete,
  setToggle,
}) {
  const user = useSelector((state) => state.user);

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
              <Link
                to={`/profile/${tweet.author.username}`}
                style={{ textDecoration: "none" }}
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
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            {_.findIndex(tweet.likes, { username: user.user.username }) ===
            -1 ? (
              <img
                src={like}
                alt=""
                onClick={() => {
                  setSelectedTweetLike(tweet._id);
                  setToggle(true);
                }}
                className="mb-2 me-1"
              />
            ) : (
              <img
                src={likeActive}
                alt=""
                onClick={() => {
                  setSelectedTweetLike(tweet._id);
                  setToggle(true);
                }}
                className="mb-2 me-1"
              />
            )}

            <p>{tweet.likes.length}</p>
          </div>
          {tweet.author._id === user.user._id ? (
            <img
              src={deletePic}
              onClick={() => {
                setSelectedTweetDelete(tweet._id);
                setToggle(true);
              }}
              alt=""
              style={{ backgroundColor: "inherit", border: "none" }}
            />
          ) : null}
        </div>
      </div>
    )
  );
}

export default Tweet;
