import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "../components/Tweet";

function Profile() {
  const user = useSelector((state) => state.user);
  const [profileOwner, setProfileOwner] = useState(null);
  const params = useParams();
  useEffect(() => {
    console.log("hola");
    const getData = async () => {
      const response = await axios({
        url: `http://localhost:8000/profile/${params.username}`,
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log(response.data);
      setProfileOwner(response.data);
    };

    getData();
  }, []);
  return (
    profileOwner && (
      <div className="profile-container col-sm-9 col-md-6 col-lg-6 container">
        <header id="profile-header">
          <img
            src={`/img/${profileOwner.avatar}`}
            alt="profile-pic"
            id="profile-image"
          />
        </header>
        <div className="d-flex justify-content-end profile-info">
          <h3>
            {profileOwner.firstname} {profileOwner.lastname}{" "}
          </h3>

          <div className="d-flex justify-content-between profileOwner-info">
            <p> {profileOwner.username} </p>
            <p>
              <Link to={`/profile/${profileOwner.username}/following`}>
                {profileOwner.following.length} Following
              </Link>
              <Link to={`/profile/${profileOwner.username}/followers`}>
                {profileOwner.followers.length} Followers
              </Link>
            </p>
          </div>
        </div>
        <h5>Tweets</h5>
        {profileOwner.tweets.map((tweet) => {
          return <Tweet tweet={tweet} key={tweet._id} />;
        })}
      </div>
    )
  );
}

export default Profile;
