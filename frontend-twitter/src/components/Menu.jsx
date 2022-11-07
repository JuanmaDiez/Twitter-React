import "../modules/menu.modules.css";
import write from "../images/write.svg";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div>
      <div className="container d-flex flex-column justify-content-between col-2 mt-4">
        <div className="d-flex flex-column justify-content-center justify-content-md-start">
          <i className="fa-brands fa-twitter"></i>
          <div className="d-flex">
            <a href="/">
              <i className="fa-solid fa-house"></i>
            </a>
            <span className="span-menu d-none d-md-block">Home</span>
          </div>
          <div className="d-flex">
            <Link to={"/"}>Home </Link>
            <i className="fa-regular fa-user"></i>

            <span className="span-menu d-none d-md-block">Profile</span>
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
    </div>
  );
}

export default Menu;
