import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "../components/Tweet";
import "../modules/profile.modules.css";
import Info from "../components/Info";
import Menu from "../components/Menu";
import { call_tweets } from "../redux/tweetSlice";

function Profile() {
  const user = useSelector((state) => state.user);
  const tweets = useSelector((state) => state.tweets);
  const dispatch = useDispatch();
  const [profileOwner, setProfileOwner] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await axios({
        url: `http://localhost:8000/users/${params.username}`,
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfileOwner(response.data);
      await dispatch(call_tweets(response.data.tweets));
    };
    getData();
  }, []);

  return (
    profileOwner &&
    tweets.length && (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <Menu />
          <div className="profile-container col-sm-9 col-md-6 col-lg-6 container">
            <header id="profile-header">
              <img
                src={`http://localhost:8000/img/${profileOwner.avatar}`}
                alt="profile-pic"
                id="profile-image"
              />
            </header>
            {profileOwner._id === user.user._id ? (
              <div className="d-flex justify-content-end w-100">
                <button className="mt-2 me-3 follow-button">Follow</button>
              </div>
            ) : null}

            <div className="d-flex justify-content-between profile-info mb-5">
              <h3>
                {profileOwner.firstname} {profileOwner.lastname}
              </h3>

              <div className="d-flex justify-content-between profileOwner-info">
                <p className="me-1"> @{profileOwner.username} </p>
                <p>
                  <Link
                    to={`/profile/${profileOwner.username}/following`}
                    className="me-1"
                    style={{ textDecoration: "none" }}
                  >
                    {profileOwner.following.length} Following
                  </Link>
                  <Link
                    to={`/profile/${profileOwner.username}/followers`}
                    className="me-1"
                    style={{ textDecoration: "none" }}
                  >
                    {profileOwner.followers.length} Followers
                  </Link>
                </p>
              </div>
            </div>
            <h5>Tweets</h5>
            {tweets.map((tweet) => {
              return <Tweet tweet={tweet} key={tweet._id} />;
            })}
          </div>
          <Info />
        </div>
      </div>
    )
  );
}

export default Profile;
