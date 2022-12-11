import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import "../modules/followers.modules.css";
import Info from "../components/Info";
import Menu from "../components/Menu";
import { follow } from "../redux/userSlice";
import { call_follows, unfollow } from "../redux/followSlice";

function Following() {
  const user = useSelector((state) => state.user);
  const follows = useSelector((state) => state.follow);
  const dispatch = useDispatch();
  const params = useParams();
  const [profileOwner, setProfileOwner] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await axios({
        url: `http://localhost:8000/users/${params.username}/following`,
        method: "get",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfileOwner(response.data);
      await dispatch(call_follows(response.data.following));
    };
    getData();
  }, []);

  const handleClick = async (event, userToFollow) => {
    event.preventDefault();
    dispatch(follow(userToFollow));
    if (profileOwner._id === user.user._id) {
      dispatch(unfollow(userToFollow._id));
    }
    await axios({
      url: `http://localhost:8000/users/${userToFollow._id}`,
      method: "PATCH",
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };

  return (
    profileOwner &&
     (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <Menu />
          <div className="col-9 col-md-6">
            <div>
              <h3>
                {profileOwner.firstname} {profileOwner.lastname}{" "}
              </h3>
              <p>@{profileOwner.username}</p>
            </div>
            <div className="followers-following mb-2">
              <Link
                to={`/profile/${profileOwner.username}/followers`}
                style={{ textDecoration: "none" }}
                className="links"
              >
                <strong>Followers</strong>
              </Link>
              <Link
                to={`/profile/${profileOwner.username}/following`}
                style={{ textDecoration: "none" }}
                className="links location"
              >
                <strong>Following</strong>
              </Link>
            </div>
            {follows.map((following) => {
              return (
                <div className="tweet-container p-4 d-flex justify-content-between">
                  <div className="d-flex">
                    <img
                      src={`http://localhost:8000/img/${following.avatar}`}
                      alt="pic"
                    />
                    <div className="tweet-inner-container">
                      <div className="d-flex justify-content-start">
                        <h6>
                          {following.firstname} {following.lastname}
                        </h6>
                        <p className="ml-5">@{following.username}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn follow-button w-5"
                    onClick={(event) => {
                      handleClick(event, following);
                    }}
                  >
                    {_.findIndex(user.user.following, (user) => {
                      return user === following._id;
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

export default Following;
