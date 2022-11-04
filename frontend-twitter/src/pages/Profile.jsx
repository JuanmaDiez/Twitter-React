import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
          src="/img/<%= profileUser.avatar %> "
          alt="profile-pic"
          id="profile-image"
        />
      </header>
      <div class="d-flex justify-content-end profile-info"></div>
      <h3>
        {profileOwner.firstname} {profileUser.lastname}{" "}
      </h3>

      <div class="d-flex justify-content-between profileUser-info">
        <p> {profileUser.username} </p>
        <p>
          <a
            href="/profile/<%= profileUser.username%>/following"
            style="text-decoration: none"
          >
            {profileUser.following.length} Following
          </a>
          <a
            href="/profile/<%= profileUser.username %>/followers"
            style="text-decoration: none"
          >
            {profileUser.followers.length} Followers
          </a>
        </p>
      </div>
      <h5>Tweets</h5>
      {profileUser.tweets.map((tweet) => {
        return <div>{tweet.content}</div>;
      })}
    </div>
  );
}

export default Profile;
