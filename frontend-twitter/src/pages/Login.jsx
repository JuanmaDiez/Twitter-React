import { useState, useEffect } from "react";
import { login } from "../redux/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../modules/login.modules.css";
import twitter from "../images/twitter.png";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios({
      url: "http://localhost:8000/users/login",
      method: "POST",
      data: { email: email, password: password },
    });
    dispatch(login({ ...response.data }));
    navigate("/");
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#0c476f" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10 h-100">
            <div className="card h-100" style={{ overflow: "hidden" }}>
              <div className="row g-0 h-100">
                <div
                  id="divIzq"
                  className="col-md-6 col-lg-7 d-none d-md-flex h-100 justify-content-between"
                >
                  <img id="logoTwitter" src={twitter} alt="" />
                  <p
                    id="welcomeHey"
                    className="d-flex flex-column-reverse me-2"
                  >
                    Hey! Nice to see you again 🥰
                  </p>
                </div>
                <div className="col-md-6 col-lg-5 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form
                      action="/login"
                      method="post"
                      onSubmit={(event) => {
                        handleSubmit(event);
                      }}
                    >
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">Login</span>
                      </div>
                      <h6
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: 1 }}
                      >
                        Ready to start using Twitter?
                      </h6>

                      <div className="form-outline mb-4">
                        <input
                          placeholder="Email or Username"
                          name="email"
                          type="text"
                          value={email}
                          id="emailId"
                          className="form-control form-control-lg"
                          onChange={(event) => setEmail(event.target.value)}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          placeholder="Password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          id="passwordId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="pt-1 mb-4">
                        <div className="d-grid gap-2">
                          <button
                            id="buttonSignUp"
                            className="btn btn-primary border-radius 20%"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                      </div>

                      <p
                        className="SignIn mb-5 pb-lg-2"
                        style={{ color: "#040404" }}
                      >
                        Don't have an account?{" "}
                        <Link
                          to="/register"
                          style={{ color: "#040404", textDecoration: "none" }}
                        >
                          Sign up
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
