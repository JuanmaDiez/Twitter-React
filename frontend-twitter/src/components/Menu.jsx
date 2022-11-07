import "../modules/menu.modules.css";
import write from "../images/write.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Menu() {
  const user = useSelector((state) => state.user);
  return (
    <div className="d-flex flex-column justify-content-between col-2 mt-4">
      <div className="d-flex flex-column justify-content-center justify-content-md-start">
        <i className="fa-brands fa-twitter"></i>
        <div className="d-flex">
          <a href="/">
            <i className="fa-solid fa-house"></i>
          </a>
          <span className="span-menu d-none d-md-block">
            <Link to={"/"}>Home </Link>
          </span>
        </div>
        <div className="d-flex">
          <i className="fa-regular fa-user"></i>

          <span className="span-menu d-none d-md-block">
            <Link to={`/profile/${user.user.username}`}>Profile</Link>
          </span>
        </div>
        <button className="d-sm-block d-md-none d-lg-none">
          <img src={write} alt="" />
        </button>
        <button className="d-none d-md-block d-lg-block tweet-button-menu">
          Tweet
        </button>
      </div>
      <a href="/logout">Log out</a>
      <script
        src="https://kit.fontawesome.com/9895568d5a.js"
        crossorigin="anonymous"
      ></script>
    </div>
  );
}

export default Menu;
