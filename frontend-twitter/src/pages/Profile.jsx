import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const user = useSelector((state) => state.user);
  const [profileOwner, setProfileOwner] = useState({});
  const params = useParams();
  useEffect(() => {
    const getData = async () => {
      const response = await axios({
        url: `http://localhost:8000/profile/${params.username}`,
        method: "get",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfileOwner(response.data);
    };
    getData();
  }, []);

  return (
    <div class="profile-container col-sm-9 col-md-6 col-lg-6 container">
      <header id="profile-header">
        <img
          src={`/img/${profileOwner.avatar}`}
          alt="profile-pic"
          id="profile-image"
        />
      </header>
      <div class="d-flex justify-content-end profile-info"></div>
      <h3>
        {profileOwner.firstname} {profileOwner.lastname}{" "}
      </h3>

      <div class="d-flex justify-content-between profileOwner-info">
        <p> {profileOwner.username} </p>
        <p>
          <Link to={`/profile/${profileOwner.username}/following`}>
            {profileOwner.following.length} Following
          </Link>
          <Link
            to={`/profile/${profileOwner.username}/followers`}
            style="text-decoration: none"
          >
            {profileOwner.followers.length} Followers
          </Link>
        </p>
      </div>
      <h5>Tweets</h5>
      {profileOwner.tweets.map((tweet) => {
        return <div>{tweet.content}</div>;
      })}
    </div>
  );
}

export default Profile;
