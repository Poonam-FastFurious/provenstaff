import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Baseurl } from "../../config";
import homegif from "../../assets/images/homegif.gif";
function ForgotPassword() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(Baseurl + "/api/v1/admin/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send password reset email.");
      }

      const result = await response.json();
      setSuccessMessage(
        result.message || "Password reset email sent successfully !"
      );
    } catch (err) {
      setError(err.message || "An error occurred.");
    }
  };

  const currentYear = currentDateTime.getFullYear();
  const currentTime = currentDateTime.toLocaleTimeString();

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
                    <Link to="#" className="d-inline-block auth-logo">
                      <img
                        src="https://provenonline.in/wp-content/uploads/2023/04/Untitled-design-6.png"
                        alt=""
                        height="40"
                      />
                    </Link>
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
                      <h5 className="text-primary">Forgot Password?</h5>
                      <p className="text-muted">Reset password with Proven</p>

                      <img
                        alt="logo"
                        src={homegif}
                        trigger="loop"
                        colors="primary:#0ab39c"
                        className="avatar-xl"
                        style={{ width: "150px", height: "150px" }}
                      ></img>
                    </div>

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
                    {!error && !successMessage && (
                      <div
                        className="alert border-0 alert-warning text-center mb-2 mx-2"
                        role="alert"
                      >
                        Enter your email and instructions will be sent to you!
                      </div>
                    )}
                    <div className="p-2">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="text-center mt-4">
                          <button
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            Send Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Wait, I remember my password...
                    <Link
                      to="/"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      Click here
                    </Link>
                  </p>
                </div>
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
                    &copy;
                    {currentYear}
                    Proven Ro Design with
                    <i className="mdi mdi-heart text-danger"></i> by BrandBell
                    {currentTime}
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

export default ForgotPassword;
