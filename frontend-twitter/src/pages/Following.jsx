import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import styles from "../modules/Followers.module.css";
import Info from "../components/Info";
import Menu from "../components/Menu";
import arrow from "../images/flecha-izquierda.png";
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
        url: `${process.env.REACT_APP_API_URL}/users/${params.username}/following`,
        method: "get",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfileOwner(response.data);
      dispatch(call_follows(response.data.following));
    };
    getData();
  }, []);

  const handleClick = async (id) => {
    dispatch(follow(id));
    if (profileOwner._id === user._id) {
      dispatch(unfollow(id));
    }
    await axios({
      url: `${process.env.REACT_APP_API_URL}/users/${id}`,
      method: "PATCH",
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };

  return (
    profileOwner && (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <Menu />
          <div className="col-9 col-md-6">
            <div className="d-flex justify-content-start align-items-center mt-2">
              <Link
                to={`/profile/${profileOwner.username}`}
                style={{ textDecoration: "none" }}
                className="me-3"
              >
                <img src={arrow} alt="arrow" />
              </Link>
              <div className="d-flex flex-column align-items-start">
                <h3 className="m-0 p-0">
                  {profileOwner.firstname} {profileOwner.lastname}
                </h3>
                <p>@{profileOwner.username}</p>
              </div>
            </div>
            <div className="d-flex justify-content-around mb-2">
              <Link
                to={`/profile/${profileOwner.username}/followers`}
                style={{ textDecoration: "none", color: "black" }}
                className={`${styles.links}`}
              >
                <strong>Followers</strong>
              </Link>
              <Link
                to={`/profile/${profileOwner.username}/following`}
                style={{ textDecoration: "none", color: "black" }}
                className={`${styles.links} ${styles.location}`}
              >
                <strong>Following</strong>
              </Link>
            </div>
            {follows.map((following) => {
              return (
                <div
                  className={`${styles.followContainer} p-4 d-flex justify-content-between`}
                  key={following._id}
                >
                  <div className="d-flex">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/img/${following.avatar}`}
                      alt="pic"
                    />
                    <div className="ms-2">
                      <div className="d-flex justify-content-start">
                        <h6>
                          {following.firstname} {following.lastname}
                        </h6>
                        <p className="ml-5">@{following.username}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className={`btn ${styles.followButton} w-5`}
                    onClick={() => {
                      handleClick(following._id);
                    }}
                  >
                    {_.findIndex(user.following, (user) => {
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
