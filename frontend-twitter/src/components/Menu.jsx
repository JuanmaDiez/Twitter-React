import "../modules/menu.modules.css";
import write from "../images/write.svg";
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
    <div className="d-flex flex-column justify-content-between col-2 mt-4 menu">
      <div className="d-flex flex-column justify-content-center justify-content-md-start">
        <i className="fa-brands fa-twitter"></i>
        <div className="d-flex">
          <a href="/">
            <i className="fa-solid fa-house"></i>
          </a>
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
      <p onClick={handleClick} className="btn btn-danger">
        Log out
      </p>
    </div>
  );
}

export default Menu;
