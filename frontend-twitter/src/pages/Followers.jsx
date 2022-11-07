import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

function Followers() {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const [selectUser, setSelectUser] = useState(null);
  const [profileOwner, setProfileOwner] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await axios({
        url: `http://localhost:8000/profile/${params.username}/followers`,
        method: "get",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfileOwner(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (selectUser !== null) {
      const follow = async () => {
        await axios({
          url: `http://localhost:8000/${selectUser}`,
          method: "PATCH",
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setSelectUser(null);
      };
      follow();
    }
  }, [selectUser]);

  return (
    profileOwner && (
      <div class="col-9 col-md-6">
        <div>
          <h3>
            {profileOwner.firstname} {profileOwner.lastname}
          </h3>
          <p> {profileOwner.username} </p>
        </div>
        <div class="followers-following">
          <strong>
            <Link to={`/profile/${profileOwner.username}/followers`}>
              Followers
            </Link>
          </strong>
          <strong>
            <Link to={`/profile/${profileOwner.username}/following`}>
              Following
            </Link>
          </strong>
        </div>
        {profileOwner.followers.map((follower) => {
          return (
            <div class="tweet-container p-4 d-flex justify-content-between">
              <div class="d-flex">
                <img src="/img/profile.svg" alt="pic" />
                <div class="tweet-inner-container">
                  <div class="d-flex justify-content-start">
                    <h6>
                      {follower.firstname} {follower.lastname}
                    </h6>
                    <p class="ml-5">@{follower.username}</p>
                  </div>
                </div>
              </div>
              <button
                class="btn follow-button w-5"
                onClick={() => {
                  setSelectUser(follower._id);
                }}
              >
                {_.findIndex(user.following, {username:follower.username}) === -1
                  ? "Follow"
                  : "Unfollow"}
              </button>
            </div>
          );
        })}
      </div>
    )
  );
}

export default Followers;
