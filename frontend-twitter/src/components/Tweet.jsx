import { useDispatch, useSelector } from "react-redux";
import "../modules/tweet.modules.css";
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

  const handleDelete = async (event) => {
    event.preventDefault();
    dispatch(delete_tweet(tweet._id));
    await axios({
      url: `http://localhost:8000/tweets/${tweet._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };

  const handleLike = async (event) => {
    event.preventDefault();
    dispatch(edit_tweets({ tweetId: tweet._id, user: user.user }));
    await axios({
      url: `http://localhost:8000/tweets/${tweet._id}`,
      method: "PATCH",
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };

  return (
    tweet && (
      <div className="tweet-container p-4">
        <div className="d-flex">
          <img
            src={`http://localhost:8000/img/${tweet.author.avatar}`}
            className="profile-picture"
            alt="profile-picture"
          />
          <div>
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
        <hr />
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            {_.findIndex(tweet.likes, (like) => {
              return like._id === user.user._id;
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
                  onClick={(event) => {
                    handleLike(event);
                  }}
                />
                <p className="mt-3 ms-1" style={{ color: "red" }}>
                  {tweet.likes.length}
                </p>
              </>
            )}
          </div>
          {tweet.author._id === user.user._id ? (
            <img
              src={deletePic}
              onClick={(event) => {
                handleDelete(event);
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
