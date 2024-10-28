/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { Baseurl } from "../../config";

/* eslint-disable react/no-unescaped-entities */
function Profile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("accessToken");
  const [adminProfile, setAdminProfile] = useState("");
  const [initialData, setInitialData] = useState({});
  const [formData, setFormData] = useState({
    adminId: adminId,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    designation: "",
    website: "",
    city: "",
    country: "",
    zipCode: "",
    portfolioLink: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        // Get accessToken from local storage
        const accessToken = localStorage.getItem("accessToken");

        // Make sure accessToken exists before making the fetch request
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        // Fetch admin profile with accessToken in headers
        const response = await fetch(
          `${Baseurl}/api/v1/admin/Profile?adminId=${adminId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include accessToken in Authorization header
              "Content-Type": "application/json",
              // Add other headers if needed
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAdminProfile(data.data);
        console.log(data.data); // Log the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error or redirect to login page
      }
    };

    fetchAdminProfile();
    // Call the fetch function
  }, []);
  const handleupdateSubmit = async (e) => {
    e.preventDefault();
    // Create an object to hold the updated fields only
    const updatedData = {};
    for (const key in formData) {
      if (formData[key] !== initialData[key]) {
        updatedData[key] = formData[key];
      }
    }

    try {
      const response = await axios.patch(
        Baseurl + "/api/v1/admin/update",
        updatedData
      );
      if (response.data.success) {
        toast.success("Profile updated successfully!");
        setInitialData(formData); // Update initial data to the latest form data
      } else {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    // Reset error and success messages
    setError("");
    setSuccess("");

    // API request to change password
    fetch(Baseurl + "/api/v1/admin/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to change password");
        }
        return response.json();
      })
      .then((data) => {
        setSuccess("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        setError("Error changing password. Please try again.");
      });
  };
  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="position-relative mx-n4 mt-n4">
              <div className="profile-wid-bg profile-setting-img">
                <img
                  src="https://themesbrand.com/velzon/html/master/assets/images/profile-bg.jpg"
                  className="profile-wid-img"
                  alt=""
                />
                <div className="overlay-content"></div>
              </div>
            </div>

            <div className="row">
              <div className="col-xxl-3">
                <div className="card mt-4">
                  <div className="card-body p-4">
                    <div className="text-center">
                      <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                        <img
                          src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-1.jpg"
                          alt="adminnameimage"
                          className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                        />
                      </div>
                      <h5 className="fs-16 mb-1">{adminProfile.username}</h5>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">

                    <div className="table-responsive">
                      <table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <th className="ps-0" scope="row">
                              Full Name
                            </th>
                            <td className="text-muted">
                              {adminProfile.username}
                            </td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">
                              Mobile
                            </th>
                            <td className="text-muted">
                              {adminProfile.phoneNumber}
                            </td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">
                              E-mail
                            </th>
                            <td className="text-muted">{adminProfile.email}</td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">
                              Location
                            </th>
                            <td className="text-muted">Noida</td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">
                              login Time
                            </th>
                            <td className="text-muted">
                              {adminProfile.loginTime}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-9">
                <div className="card mt-4">
                  <div className="card-header">
                    <ul
                      className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <Link
                          className="nav-link active"
                          data-bs-toggle="tab"
                          to="#personalDetails"
                          role="tab"
                        >
                          <i className="fas fa-home"></i> Personal Details
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          data-bs-toggle="tab"
                          to="#changePassword"
                          role="tab"
                        >
                          <i className="far fa-user"></i> Change Password
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body p-4">
                    <div className="tab-content">
                      <div
                        className="tab-pane active"
                        id="personalDetails"
                        role="tabpanel"
                      >
                        <form onSubmit={handleupdateSubmit}>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="firstName"
                                  className="form-label"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="firstName"
                                  value={formData.firstName}
                                  onChange={handleChange}
                                  placeholder="Enter your firstname"
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="lastName"
                                  className="form-label"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastName"
                                  value={formData.lastName}
                                  onChange={handleChange}
                                  placeholder="Enter your lastname"
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="phoneNumber"
                                  className="form-label"
                                >
                                  Phone Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="phoneNumber"
                                  value={formData.phoneNumber}
                                  onChange={handleChange}
                                  placeholder="Enter your phone number"
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder="Enter your email"
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="designation"
                                  className="form-label"
                                >
                                  Designation
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="designation"
                                  value={formData.designation}
                                  onChange={handleChange}
                                  placeholder="Designation"
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label htmlFor="website" className="form-label">
                                  Website
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="website"
                                  value={formData.website}
                                  onChange={handleChange}
                                  placeholder="www.example.com"
                                />
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div className="mb-3">
                                <label htmlFor="city" className="form-label">
                                  City
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="city"
                                  value={formData.city}
                                  onChange={handleChange}
                                  placeholder="City"
                                />
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div className="mb-3">
                                <label htmlFor="country" className="form-label">
                                  Country
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="country"
                                  value={formData.country}
                                  onChange={handleChange}
                                  placeholder="Country"
                                />
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div className="mb-3">
                                <label htmlFor="zipCode" className="form-label">
                                  Zip Code
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="zipCode"
                                  value={formData.zipCode}
                                  onChange={handleChange}
                                  placeholder="Enter zipcode"
                                />
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="mb-3 pb-2">
                                <label
                                  htmlFor="description"
                                  className="form-label"
                                >
                                  Description
                                </label>
                                <textarea
                                  className="form-control"
                                  id="portfolioLink"
                                  value={formData.portfolioLink}
                                  onChange={handleChange}
                                  placeholder="Enter your description"
                                  rows="3"
                                />
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="hstack gap-2 justify-content-end">
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  Update
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-soft-success"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div
                        className="tab-pane"
                        id="changePassword"
                        role="tabpanel"
                      >
                        <form onSubmit={handleSubmit}>
                          <div className="row g-2">
                            <div className="col-lg-4">
                              <div>
                                <label
                                  htmlFor="oldpasswordInput"
                                  className="form-label"
                                >
                                  Old Password*
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="oldpasswordInput"
                                  placeholder="Enter current password"
                                  value={oldPassword}
                                  onChange={(e) =>
                                    setOldPassword(e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div>
                                <label
                                  htmlFor="newpasswordInput"
                                  className="form-label"
                                >
                                  New Password*
                                </label>
                                <input
                                  type={passwordVisible ? "text" : "password"}
                                  className="form-control"
                                  id="newpasswordInput"
                                  placeholder="Enter new password"
                                  value={newPassword}
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                  required
                                />
                                <button
                                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon mt-4"
                                  type="button"
                                  id="password-addon"
                                  onClick={handlePasswordToggle}
                                >
                                  <i
                                    className={`ri-eye${passwordVisible ? "" : "-off"
                                      }-fill align-middle`}
                                  ></i>
                                </button>
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div>
                                <label
                                  htmlFor="confirmpasswordInput"
                                  className="form-label "
                                >
                                  Confirm Password*
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="confirmpasswordInput"
                                  placeholder="Confirm password"
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>

                            <div
                              className="col-lg-12  "
                              style={{ visibility: "hidden" }}
                            >
                              <div className="mb-3">
                                <Link
                                  to="#"
                                  className="link-primary text-decoration-underline"
                                >
                                  Forgot Password ?
                                </Link>
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="text-end">
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  Change Password
                                </button>
                              </div>
                            </div>

                            {error && (
                              <div className="col-lg-12">
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  {error}
                                </div>
                              </div>
                            )}

                            {success && (
                              <div className="col-lg-12">
                                <div
                                  className="alert alert-success"
                                  role="alert"
                                >
                                  {success}
                                </div>
                              </div>
                            )}
                          </div>
                        </form>
                        <div className="mt-4 mb-3 border-bottom pb-2">
                          <div className="float-end"></div>
                          <h5 className="card-title">Login History</h5>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                          <div className="flex-shrink-0 avatar-sm">
                            <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                              <i className="ri-smartphone-line"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <p className="text-muted mb-0">
                              March 16 at 2:47PM
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">© Proven Ro</div>
              <div className="col-sm-6">
                <div className="text-sm-end d-none d-sm-block">
                  Design & Develop by Brandbell
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Profile;