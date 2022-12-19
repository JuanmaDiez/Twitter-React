import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow } from "../redux/userSlice";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import styles from "../modules/Followers.module.css";
import arrow from "../images/flecha-izquierda.png";
import Menu from "../components/Menu";
import Info from "../components/Info";

function Followers() {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const [profileOwner, setProfileOwner] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/users/${params.username}/followers`,
        method: "get",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfileOwner(response.data);
    };
    getData();
  }, []);

  const handleClick = async (id) => {
    dispatch(follow(id));
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
          <div className="col-9 col-md-6 mt-1">
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
                <p>@{profileOwner.username} </p>
              </div>
            </div>
            <div className="d-flex justify-content-around mb-3">
              <Link
                to={`/profile/${profileOwner.username}/followers`}
                style={{ textDecoration: "none", color: "black" }}
                className={`${styles.links} ${styles.location}`}
              >
                <strong>Followers</strong>
              </Link>
              <Link
                to={`/profile/${profileOwner.username}/following`}
                style={{ textDecoration: "none", color: "black" }}
                className={`${styles.links}`}
              >
                <strong>Following</strong>
              </Link>
            </div>
            {profileOwner.followers.map((follower) => {
              return (
                <div
                  className={`${styles.followContainer} p-4 d-flex justify-content-between`}
                  key={follower._id}
                >
                  <div className="d-flex">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/img/${follower.avatar}`}
                      alt="pic"
                    />
                    <div className="ms-2">
                      <div className="d-flex justify-content-start">
                        <h6>
                          <Link
                            to={`/profile/${follower.username}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {follower.firstname} {follower.lastname}
                          </Link>
                        </h6>
                        <p className="ms-2">@{follower.username}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className={`btn ${styles.followButton} w-5`}
                    onClick={() => {
                      handleClick(follower._id.toString());
                    }}
                  >
                    {_.findIndex(user.following, (following) => {
                      return following === follower._id.toString();
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
