import "../modules/register.modules.css";
import twitter from "../images/twitter.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/userSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await axios({
      url: "http://localhost:8000/register",
      method: "POST",
      data: formData,
      headers: { "Content-Type": "mulipart/form-data" },
    });
    dispatch(register(response.data));
    navigate("/login");
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
                  <p id="welcome" className="d-flex flex-column-reverse me-2">
                    Hi! Welcome to Twitter Clone 👋
                  </p>
                </div>
                <div className="col-md-6 col-lg-5 d-flex align-items-center h-100">
                  <div className="card-body p-4 p-lg-5 text-black h-100">
                    <form
                      className="h-100"
                      onSubmit={(event) => {
                        handleSubmit(event);
                      }}
                    >
                      <div className="d-flex align-items-center pb-1">
                        <span className="h3 fw-bold mb-0">Sign up</span>
                      </div>
                      <h6
                        className="fw-normal pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Create and account and start using Twitter
                      </h6>

                      <div className="form-outline">
                        <input
                          placeholder="First name"
                          name="firstName"
                          type="text"
                          id="firstNameId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline">
                        <input
                          placeholder="Last name"
                          name="lastName"
                          type="text"
                          id="lastNameId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline">
                        <input
                          placeholder="Email"
                          name="email"
                          type="email"
                          id="emailId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline">
                        <input
                          placeholder="Username"
                          name="userName"
                          type="text"
                          id="userNameId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline">
                        <input
                          placeholder="Choose file..."
                          className="form-control"
                          id="image"
                          name="image"
                          type="file"
                          required
                        />
                      </div>

                      <div className="form-outline">
                        <input
                          placeholder="Password"
                          name="password"
                          type="password"
                          id="passwordId"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>
                      <div className="form-outline">
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
