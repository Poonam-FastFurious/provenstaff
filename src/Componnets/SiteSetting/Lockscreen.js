import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Baseurl } from "../../config";


const Lockscreen = () => {
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();
            setError("");

            try {
                  const response = await fetch(Baseurl + "/api/v1/admin/verifyPassword", {
                        // Adjust this endpoint as needed
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ password }),
                  });

                  const data = await response.json();

                  if (response.ok) {
                        localStorage.setItem("accessToken", data.data.accessToken);
                        navigate("/"); // Redirect to the dashboard or desired route
                  } else {
                        setError(data.message || "Invalid password. Please try again.");
                  }
            } catch (error) {
                  setError("An error occurred. Please try again.");
            }
      };

      return (
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
                                                      <a href="/" className="d-inline-block auth-logo">
                                                            <img
                                                                  src="assets/images/logo-light.png"
                                                                  alt=""
                                                                  height="20"
                                                            />
                                                      </a>
                                                </div>
                                                <p className="mt-3 fs-15 fw-medium">
                                                      Welcome Admin & Dashboard
                                                </p>
                                          </div>
                                    </div>
                              </div>

                              <div className="row justify-content-center">
                                    <div className="col-md-8 col-lg-6 col-xl-5">
                                          <div className="card mt-4">
                                                <div className="card-body p-4">
                                                      <div className="text-center mt-2">
                                                            <h5 className="text-primary">Lock Screen</h5>
                                                            <p className="text-muted">
                                                                  Enter your password to unlock the screen!
                                                            </p>
                                                      </div>
                                                      <div className="p-2 mt-4">
                                                            <form onSubmit={handleSubmit}>
                                                                  <div className="mb-3">
                                                                        <label className="form-label" htmlFor="password">
                                                                              Password
                                                                        </label>
                                                                        <input
                                                                              type="password"
                                                                              className="form-control"
                                                                              id="password"
                                                                              placeholder="Enter password"
                                                                              value={password}
                                                                              onChange={(e) => setPassword(e.target.value)}
                                                                        />
                                                                        {error && (
                                                                              <div className="text-danger mt-2">{error}</div>
                                                                        )}
                                                                  </div>
                                                                  <div className="mb-2 mt-4">
                                                                        <button className="btn btn-success w-100" type="submit">
                                                                              Unlock
                                                                        </button>
                                                                  </div>
                                                            </form>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Lockscreen;