import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import "../modules/followers.modules.css";
import profile from "../images/profile.svg";
import Menu from "../components/Menu";
import Info from "../components/Info";

function Followers() {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const [selectUser, setSelectUser] = useState(null);
  const [profileOwner, setProfileOwner] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await axios({
        url: `http://localhost:8000/users/${params.username}/followers`,
        method: "get",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfileOwner(response.data);
      setToggle(false);
    };
    getData();
  }, [toggle]);

  useEffect(() => {
    if (selectUser !== null) {
      const follow = async () => {
        await axios({
          url: `http://localhost:8000/users/${selectUser}`,
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
      <div className="container-fluid">
        <div className="row justify-content-center">
          <Menu />
          <div className="col-9 col-md-6 mt-1">
            <div>
              <h3>
                {profileOwner.firstname} {profileOwner.lastname}
              </h3>
              <p> {profileOwner.username} </p>
            </div>
            <div className="followers-following mb-3">
              <Link
                to={`/profile/${profileOwner.username}/followers`}
                style={{ textDecoration: "none" }}
                className="links location"
              >
                <strong>Followers</strong>
              </Link>
              <Link
                to={`/profile/${profileOwner.username}/following`}
                style={{ textDecoration: "none" }}
                className="links"
              >
                <strong>Following</strong>
              </Link>
            </div>
            {profileOwner.followers.map((follower) => {
              return (
                <div className="tweet-container p-4 d-flex justify-content-between">
                  <div className="d-flex">
                    <img
                      src={`http://localhost:8000/img/${profileOwner.avatar}`}
                      alt="pic"
                    />
                    <div className="tweet-inner-container">
                      <div className="d-flex justify-content-start">
                        <h6>
                          <Link
                            to={`/profile/${follower.username}`}
                            style={{ textDecoration: "none" }}
                          >
                            {follower.firstname} {follower.lastname}
                          </Link>
                        </h6>
                        <p className="ms-2">@{follower.username}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn follow-button w-5"
                    onClick={() => {
                      setSelectUser(follower._id);
                      setToggle(true);
                    }}
                  >
                    {_.findIndex(profileOwner.following, {
                      username: follower.username,
                    }) === -1
                      ? "Follow"
                      : "Unfollow"}
                  </button>
                </div>
              );
            })}
          </div>
          <Info />
        </div>
      </div>
    )
  );
}

export default Followers;
