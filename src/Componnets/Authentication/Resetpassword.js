import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Baseurl } from "../../config";

function ResetPassword() {
  const { id, token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Function to validate password
  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasLowercase = /[a-z]/;
    const hasUppercase = /[A-Z]/;
    const hasNumber = /[0-9]/;

    return (
      minLength.test(password) &&
      hasLowercase.test(password) &&
      hasUppercase.test(password) &&
      hasNumber.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Password validation
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include a lowercase letter, an uppercase letter, and a number."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${Baseurl}/api/v1/admin/resetpassword?id=${id}&token=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reset password.");
      }

      const result = await response.json();
      setSuccessMessage(
        result.message || "Password has been reset successfully!"
      );
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.message || "An error occurred.");
    }
  };

  return (
    <>
      <div className="auth-page-wrapper pt-5">
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>
          <div className="shape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1440 120"
            >
              <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
            </svg>
          </div>
        </div>

        <div className="auth-page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <a href="index.html" className="d-inline-block auth-logo">
                      <img
                        src="assets/images/logo-light.png"
                        alt=""
                        height="20"
                      />
                    </a>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">
                    Premium Admin & Dashboard Template
                  </p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card mt-4">
                  <div className="card-body p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Create new password</h5>
                      <p className="text-muted">
                        Your new password must be different from previous used
                        password.
                      </p>
                    </div>

                    <div className="p-2">
                      {error && (
                        <div
                          className="alert alert-danger text-center mb-2 mx-2"
                          role="alert"
                        >
                          {error}
                        </div>
                      )}
                      {successMessage && (
                        <div
                          className="alert alert-success text-center mb-2 mx-2"
                          role="alert"
                        >
                          {successMessage}
                        </div>
                      )}
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control pe-5 password-input"
                              placeholder="Enter password"
                              id="password-input"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon"
                              onClick={togglePasswordVisibility}
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="confirm-password-input"
                          >
                            Confirm Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control pe-5 password-input"
                              placeholder="Confirm password"
                              id="confirm-password-input"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              required
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="confirm-password-addon"
                              onClick={togglePasswordVisibility}
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        <div
                          id="password-contain"
                          className="p-3 bg-light mb-2 rounded"
                        >
                          <h5 className="fs-13">Password must contain:</h5>
                          <p id="pass-length" className="invalid fs-12 mb-2">
                            Minimum <b>8 characters</b>
                          </p>
                          <p id="pass-lower" className="invalid fs-12 mb-2">
                            At <b>lowercase</b> letter (a-z)
                          </p>
                          <p id="pass-upper" className="invalid fs-12 mb-2">
                            At least <b>uppercase</b> letter (A-Z)
                          </p>
                          <p id="pass-number" className="invalid fs-12 mb-0">
                            A least <b>number</b> (0-9)
                          </p>
                        </div>

                        <div className="mt-4">
                          <button
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            Reset Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Wait, I remember my password...
                    <a
                      href="/Admin/Login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      Click here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
