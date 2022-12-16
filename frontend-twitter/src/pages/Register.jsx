import styles from "../modules/Register.module.css";
import twitter from "../images/twitter.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/users`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(login(response.data));
    navigate("/");
  };
  return (
    <section style={{ backgroundColor: "#0c476f" }}>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col col-xl-10">
            <div className={`${styles.card}`} style={{ overflow: "hidden" }}>
              <div className="row g-0">
                <div
                  className={`${styles.leftDiv} col-md-6 col-lg-7 d-none d-md-flex justify-content-between`}
                >
                  <img
                    className={`${styles.logoTwitter}`}
                    src={twitter}
                    alt=""
                  />
                  <p
                    className={`${styles.welcome} d-flex flex-column-reverse me-2`}
                  >
                    Hi! Welcome to Twitter Clone 👋
                  </p>
                </div>
                <div
                  className="col-md-6 col-lg-5 d-flex align-items-center"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="p-4 p-lg-5 text-black">
                    <form
                      onSubmit={(event) => {
                        handleSubmit(event);
                      }}
                    >
                      <div className="d-flex align-items-center pb-1 mb-3">
                        <span className="h3 fw-bold mb-0">Sign up</span>
                      </div>
                      <h6
                        className="fw-normal pb-3 mb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Create and account and start using Twitter
                      </h6>

                      <div className="form-outline mb-3">
                        <input
                          placeholder="First name"
                          name="firstName"
                          type="text"
                          id="firstNameId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <input
                          placeholder="Last name"
                          name="lastName"
                          type="text"
                          id="lastNameId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <input
                          placeholder="Email"
                          name="email"
                          type="email"
                          id="emailId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <input
                          placeholder="Username"
                          name="userName"
                          type="text"
                          id="userNameId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <input
                          placeholder="Choose file..."
                          className="form-control"
                          id="image"
                          name="image"
                          type="file"
                          required
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <input
                          placeholder="Password"
                          name="password"
                          type="password"
                          id="passwordId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>
                      <div className="form-outline mb-3">
                        <input
                          placeholder="Repeat Password"
                          name="repeatPassword"
                          type="password"
                          id="repeatPasswordId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="pt-1">
                        <div className="d-grid gap-2">
                          <button
                            className={`btn btn-primary border-radius 20% ${styles.buttonSignUp}`}
                            type="submit"
                          >
                            Sign up
                          </button>
                        </div>
                      </div>

                      <p
                        className={`${styles.signIn} mb-5 pb-lg-2`}
                        style={{ color: "#040404" }}
                      >
                        Already have an account?
                        <Link
                          to="/login"
                          style={{ color: "#040404", textDecoration: "none" }}
                        >
                          {" "}
                          Sign in
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

export default Register;
