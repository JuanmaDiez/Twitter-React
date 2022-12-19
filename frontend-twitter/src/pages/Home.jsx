import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import Menu from "../components/Menu";
import Info from "../components/Info";
import Tweet from "../components/Tweet";
import styles from "../modules/Home.module.css";
import { follow } from "../redux/userSlice";
import { add_tweet, call_tweets } from "../redux/tweetSlice";

function Home() {
  const user = useSelector((state) => state.user);
  const tweets = useSelector((state) => state.tweets);
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const getSuggestions = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/users`,
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSuggestions(response.data);
    };
    getSuggestions();
    const getData = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/tweets`,
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      dispatch(call_tweets(response.data));
    };
    getData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios({
      url: `${process.env.REACT_APP_API_URL}/tweets`,
      method: "POST",
      data: { content },
      headers: { Authorization: `Bearer ${user.token}` },
    });
    dispatch(add_tweet({ content, author: { ...user }, likes: [] }));
    await setContent("");
  };

  const handleClick = async (id) => {
    dispatch(follow(id));
    await axios({
      url: `${process.env.REACT_APP_API_URL}/users/${id}`,
      method: "PATCH",
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };

  return tweets.length !== 0 ? (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <Menu />
        <div class="col-9 col-md-6">
          <div className="d-flex flex-column px-4">
            <h3 className="mb-3 mt-1 d-flex justify-content-start">Home</h3>
            <div className="form-floating d-flex">
              <img
                src={`${process.env.REACT_APP_API_URL}/img/${user.avatar}`}
                className={`${styles.profilePicture} img-fluid me-2`}
                alt="avatar"
              />
              <form
                action="/"
                method="POST"
                className="w-100"
                onSubmit={(event) => handleSubmit(event)}
              >
                <textarea
                  name="content"
                  className="form-control textarea"
                  placeholder="Whats happening?"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                ></textarea>

                <div className="d-flex justify-content-end">
                  <button
                    className={`${styles.tweetButton} mb-2`}
                    type="submit"
                  >
                    Tweet
                  </button>
                </div>
              </form>
            </div>
            {tweets.map((tweet) => {
              return <Tweet tweet={tweet} key={tweet._id} />;
            })}
          </div>
        </div>
        <Info />
      </div>
    </div>
  ) : (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <Menu />
        <div class="col-9 col-md-6">
          <div className="d-flex flex-column px-4">
            <h3 className="mb-3 mt-1 d-flex justify-content-start">Home</h3>
            <div className="form-floating d-flex">
              <img
                src={`${process.env.REACT_APP_API_URL}/img/${user.avatar}`}
                className={`${styles.profilePicture} img-fluid me-2`}
                alt="avatar"
              />
              <form
                action="/"
                method="POST"
                className="w-100"
                onSubmit={(event) => handleSubmit(event)}
              >
                <textarea
                  name="content"
                  className="form-control textarea"
                  placeholder="Whats happening?"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                ></textarea>

                <div className="d-flex justify-content-end">
                  <button
                    className={`${styles.tweetButton} mb-2`}
                    type="submit"
                  >
                    Tweet
                  </button>
                </div>
              </form>
            </div>
            {suggestions
              ? suggestions.map((suggestion) => {
                  return (
                    <div
                      className={`${styles.followContainer} p-4 d-flex justify-content-between`}
                      key={suggestion._id}
                    >
                      <h3 className="m-3">Follow someone to get started: </h3>
                      <div className="d-flex">
                        <img
                          src={`${process.env.REACT_APP_API_URL}/img/${suggestion.avatar}`}
                          alt="pic"
                        />
                        <div className="ms-2">
                          <div className="d-flex justify-content-start">
                            <h6>
                              <Link
                                to={`/profile/${suggestion.username}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {suggestion.firstname} {suggestion.lastname}
                              </Link>
                            </h6>
                            <p className="ms-2">@{suggestion.username}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        className={`btn ${styles.followButton} w-5`}
                        onClick={() => {
                          handleClick(suggestion._id.toString());
                        }}
                      >
                        {_.findIndex(user.following, (following) => {
                          return following === suggestion._id.toString();
                        }) === -1
                          ? "Follow"
                          : "Unfollow"}
                      </button>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <Info />
      </div>
    </div>
  );
}

export default Home;
