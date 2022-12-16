import styles from "../modules/Menu.module.css";
import write from "../images/write.svg";
import home from "../images/home.svg";
import exit from "../images/exit.png";
import userForm from "../images/profile.svg";
import twitter from "../images/twitter.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { empty_tweets } from "../redux/tweetSlice";
import { empty_follows } from "../redux/followSlice";

function Menu() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    dispatch(empty_tweets());
    dispatch(empty_follows());
    navigate("/login");
  };

  return (
    <div
      className={`d-flex flex-column justify-content-between col-2 ${styles.menu}`}
    >
      <div className="d-flex flex-column justify-content-center justify-content-md-start align-items-center align-items-md-start">
        <img src={twitter} className={`${styles.twitter} img-fluid`} alt="" />
        <div className="d-flex mt-1">
          <img src={home} alt="" />
          <span className={`ms-2 d-none d-md-block`}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <strong>Home</strong>
            </Link>
          </span>
        </div>
        <div className="d-flex mt-1">
          <img
            src={userForm}
            alt=""
            className={`img-fluid ${styles.userForm}`}
          />
          <span className="ms-2 d-none d-md-block">
            <Link
              to={`/profile/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <strong>Profile</strong>
            </Link>
          </span>
        </div>

        <img
          src={write}
          alt=""
          className="d-sm-block d-md-none d-lg-none mt-2"
        />

        <button className={`d-none d-md-block ${styles.tweetButtonMenu} w-50`}>
          Tweet
        </button>
      </div>
      <div
        onClick={() => handleClick()}
        className={`d-flex justify-content-around ${styles.logout} mb-4`}
      >
        <img
          src={`${process.env.REACT_APP_API_URL}/img/${user.avatar}`}
          alt=""
          className={`img-fluid ${styles.profilePicture} m-2`}
        />
        <div className="d-none d-md-flex flex-column justify-content-center">
          <p className="p-0 m-0">@{user.username}</p>
          <p className="p-0 m-0">
            <strong>{user.firstname}</strong>
          </p>
        </div>
        <img
          src={exit}
          alt="logout"
          className={`img-fluid ${styles.exit} mt-2`}
        />
      </div>
    </div>
  );
}

export default Menu;
