



/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Baseurl } from "../../config";


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const isEmail = (value) => {
    const emailPattern = /^[^\s@]{2,}@[^\s@]{2,}\.[^\s@]{2,}$/;
    return emailPattern.test(value);
  };

  const handleUsernameOrEmailChange = (e) => {
    const value = e.target.value;
    setUsernameOrEmail(value);
    if (!isEmail(value) && value.includes("@")) {
      setValidationError("Invalid email format");
    } else {
      setValidationError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (validationError) {
      setError("Please correct the errors before submitting.");
      return;
    }
    try {
      const isEmailAddress = isEmail(usernameOrEmail);
      const payload = isEmailAddress
        ? { email: usernameOrEmail, password }
        : { username: usernameOrEmail, password };

      const response = await fetch(Baseurl + "/api/v1/Employee/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        const { accessToken, refreshToken, user } = data.data;

        // Store in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("employeeId", user._id);

        // Store in cookies
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);
        Cookies.set("employeeId", user._id);

        // Redirect to the dashboard or another page
        navigate("/");
      } else {
        // Handle errors
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="auth-page-wrapper pt-5">
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>
          <div className="shape"></div>
        </div>

        <div className="auth-page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="#" className="d-inline-block auth-logo">
                      <img
                        src="https://provenonline.in/wp-content/uploads/2023/04/Untitled-design-6.png"
                        alt=""
                        height="40"
                      />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">
                    Welcome Employee & Dashboard
                  </p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card mt-4">
                  <div className="card-body p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back!</h5>
                      <p className="text-muted">
                        Sign in to continue to Proven Ro.
                      </p>
                    </div>
                    <div className="p-2 mt-4">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label
                            htmlFor="usernameOrEmail"
                            className="form-label"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            className={`form-control ${validationError ? "is-invalid" : ""
                              }`}
                            id="usernameOrEmail"
                            placeholder="Enter username or email"
                            value={usernameOrEmail}
                            onChange={handleUsernameOrEmailChange}
                          />
                        </div>
                        {validationError && (
                          <div className="invalid-feedback">
                            {validationError}
                          </div>
                        )}
                        <div className="mb-3">
                          <div className="float-end"></div>
                          <label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control pe-5 password-input"
                              placeholder="Enter password"
                              id="password-input"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon"
                              onClick={togglePasswordVisibility}
                            >
                              <i
                                className={`ri-${showPassword ? "eye-off" : "eye"
                                  }-fill align-middle`}
                              ></i>
                            </button>
                          </div>
                        </div>

                        {error && (
                          <div className="alert alert-danger">{error}</div>
                        )}

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="auth-remember-check"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="auth-remember-check"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="mt-4">
                          <button
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            Sign In
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title">..........</h5>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center"></div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="mb-0 text-muted">
                    &copy; Proven Ro Design with
                    <i className="mdi mdi-heart text-danger"></i> by Brandbell
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Login;
