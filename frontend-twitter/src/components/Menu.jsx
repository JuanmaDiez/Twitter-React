import "../modules/menu.modules.css";
import write from "../images/write.svg";
import home from "../images/home.svg"
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

function Menu() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column justify-content-between col-2 menu">
      <div className="d-flex flex-column justify-content-center justify-content-md-start">
        <i className="fa-brands fa-twitter"></i>
        <div className="d-flex">
          <img src={home} alt="" />
          <span className="span-menu d-none d-md-block">
            <Link to="/" style={{ textDecoration: "none" }}>
              Home{" "}
            </Link>
          </span>
        </div>
        <div className="d-flex">
          <i className="fa-regular fa-user"></i>

          <span className="span-menu d-none d-md-block">
            <Link
              to={`/profile/${user.user.username}`}
              style={{ textDecoration: "none" }}
            >
              Profile
            </Link>
          </span>
        </div>
        <button className="d-sm-block d-md-none d-lg-none">
          <img src={write} alt="" />
        </button>
        <button className="d-none d-md-block d-lg-block tweet-button-menu">
          Tweet
        </button>
      </div>
      <div onClick={handleClick} className="d-flex justify-content-around logout mb-4">
        <img
          src={`http://localhost:8000/img/${user.user.avatar}`}
          alt=""
          className="img-fluid"
        />
        <div className="d-flex flex-column justify-content-center">
          <p className="p-0 m-0">
            @{user.user.username}
          </p>
          <p className="p-0 m-0">
            <strong>
              {user.user.firstname}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Menu;
