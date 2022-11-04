import { useState, useEffect } from "react";
import { login } from "../redux/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../modules/login.modules.css";
import twitter from "../images/twitter.png";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (email !== "") {
      const getToken = async () => {
        try {
          const response = await axios({
            url: "http://localhost:8000/login",
            method: "POST",
            data: { email: email, password: password },
          });
          dispatch(login({ email, token: response.data.token }));
          navigate("/");
        } catch (error) {
          console.log("error");
        }
      };
      getToken();
    }
  }, [email, password]); // Este useEffect se va a activar cuando cambien los estados de email y password. Esto se lo decimos en el Array de dependencias

  return (
    <section className="vh-100" style={{ backgroundColor: "#0c476f" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ overflow: "hidden" }}>
              <div className="row g-0">
                <div id="divIzq" className="col-md-6 col-lg-7 d-none d-md-flex">
                  <img id="logoTwitter" src={twitter} alt="" />
                  <p id="welcomeHey">Hey! Nice to see you again 🥰</p>
                </div>
                <div className="col-md-6 col-lg-5 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form
                      action="/login"
                      method="post"
                      onSubmit={(event) => {
                        event.preventDefault();
                        setEmail(event.target.email.value);
                        setPassword(event.target.password.value);
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
                          id="emailId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          placeholder="Password"
                          name="password"
                          type="password"
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
                        Don't have an account?
                        <a href="/register" style={{ color: "#040404" }}>
                          Sign up
                        </a>
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
