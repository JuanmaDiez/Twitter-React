import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import Info from "../components/Info";
import Tweet from "../components/Tweet";
import profile from "../images/profile.svg";
import "../modules/home.modules.css";

function Home() {
  const [tweetList, setTweetList] = useState([]);
  const user = useSelector((state) => state.user);
  const [selectedTweetLike, setSelectedTweetLike] = useState(null); // Lo mismo para el like

  useEffect(() => {
    const getData = async () => {
      const response = await axios({
        url: "http://localhost:8000",
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTweetList(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (selectedTweetLike !== null) {
      console.log(selectedTweetLike);
      const like = async () => {
        await axios({
          url: `http://localhost:8000/tweet/${selectedTweetLike}`,
          method: "PATCH",
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setSelectedTweetLike(null);
      };
      like();
    }
  }, [selectedTweetLike]);

  return (
    tweetList.length && (
      <div className="row">
        <Menu />
        <div class="col-9 col-md-6">
          <div className="d-flex flex-column px-4">
            <h2 className="home-title mb-3 mt-1">Home</h2>
            <div className="form-floating d-flex">
              <img
                src={profile}
                className="profile-picture"
                alt="profile-picture"
              />
              <form action="/" method="POST" className="w-100">
                <textarea
                  name="content"
                  className="form-control textarea"
                  placeholder="Whats happening?"
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                ></textarea>

                <div className="d-flex justify-content-end">
                  <button className="tweet-button">Tweet</button>
                </div>
              </form>
            </div>
            {tweetList.map((tweet) => {
              return (
                <Tweet
                  tweet={tweet}
                  setSelectedTweetLike={setSelectedTweetLike}
                />
              );
            })}
          </div>
        </div>
        <Info />
      </div>
    )
  );
}

export default Home;
