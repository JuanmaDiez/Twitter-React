import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import Info from "../components/Info";
import Tweet from "../components/Tweet";
import "../modules/home.modules.css";
import { add_tweet, call_tweets } from "../redux/tweetSlice";

function Home() {
  const user = useSelector((state) => state.user);
  const tweets = useSelector((state) => state.tweets);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await axios({
        url: "http://localhost:8000/tweets",
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
      url: "http://localhost:8000/tweets",
      method: "POST",
      data: { content },
      headers: { Authorization: `Bearer ${user.token}` },
    });
    dispatch(add_tweet({ content, author: { ...user.user }, likes: [] }));
    await setContent("");
  };

  return (
    tweets.length && (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <Menu />
          <div class="col-9 col-md-6">
            <div className="d-flex flex-column px-4">
              <h3 className="mb-3 mt-1 d-flex justify-content-start">Home</h3>
              <div className="form-floating d-flex">
                <img
                  src={`http://localhost:8000/img/${user.user.avatar}`}
                  className="profile-picture"
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
                    <button className="tweet-button" type="submit">
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
    )
  );
}

export default Home;
