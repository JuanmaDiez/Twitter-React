import React from "react";
import { register } from "../redux/userSlice";
import "../modules/register.modules.css";
import twitter from "../images/twitter.png";

function Register() {
  return (
    <section className="vh-100" style={{ backgroundColor: "#0c476f" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ overflow: "hidden" }}>
              <div className="row g-0">
                <div id="divIzq" className="col-md-6 col-lg-7 d-none d-md-flex">
                  <img id="logoTwitter" src={twitter} alt="" />
                  <p id="welcome">Hi! Welcome to Twitter Clone 👋</p>
                </div>
                <div className="col-md-6 col-lg-5 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form
                      action="/register"
                      method="post"
                      enctype="multipart/form-data"
                    >
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">Sign up</span>
                      </div>
                      <h6
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Create and account and star using Twitter
                      </h6>

                      <div className="form-outline mb-4">
                        <input
                          placeholder="First name"
                          name="firstName"
                          type="text"
                          id="firstNameId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          placeholder="Last name"
                          name="lastName"
                          type="text"
                          id="lastNameId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          placeholder="Email"
                          name="email"
                          type="email"
                          id="emailId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          placeholder="Username"
                          name="userName"
                          type="text"
                          id="userNameId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          placeholder="Choose file..."
                          className="form-control"
                          id="image"
                          name="image"
                          type="file"
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
                      <div className="form-outline mb-4">
                        <input
                          placeholder="Repeat Password"
                          name="repeatPassword"
                          type="password"
                          id="repeatPasswordId"
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
                            Sign up
                          </button>
                        </div>
                      </div>

                      <p
                        className="SignIn mb-5 pb-lg-2"
                        style={{ color: "#040404" }}
                      >
                        Already have an account?
                        <a href="/login" style={{ color: "#040404" }}>
                          Sign in
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

export default Register;
