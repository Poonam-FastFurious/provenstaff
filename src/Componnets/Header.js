import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Baseurl } from "../config";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModaldelete = () => {
    setShowModal(false);
  };
  const handleConfirmLogout = async () => {
    try {
      // Make an API call to logout
      await fetch(Baseurl + "/api/v1/Employee/logout", {
        method: "POST",
        // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Clear local storage
      localStorage.clear();

      // Clear cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Redirect to the login page or home page
      window.location.href = "/Staff/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/Staff/Login");
    }
  });
  return (
    <>
      <div id="layout-wrapper">
        <header id="page-topbar">
          <div className="layout-width">
            <div className="navbar-header">
              <div className="d-flex">
                <div className="navbar-brand-box horizontal-logo">
                  <Link to="/" className="logo logo-dark">
                    <span className="logo-sm">
                      <img
                        src="https://provenonline.in/wp-content/uploads/2023/04/Untitled-design-6.png"
                        alt=""
                        height="40"
                      />
                    </span>
                    <span className="logo-lg d-none">
                      <img
                        src="https://provenonline.in/wp-content/uploads/2023/04/Untitled-design-6.png"
                        alt=""
                        height="40"
                      />
                    </span>
                  </Link>

                  <Link to="/" className="logo logo-light">
                    <span className="logo-sm">
                      <img
                        src="https://provenonline.in/wp-content/uploads/2023/04/Untitled-design-6.png"
                        alt=""
                        height="40"
                      />
                    </span>
                    <span className="logo-lg">
                      <img
                        src="https://provenonline.in/wp-content/uploads/2023/04/Untitled-design-6.png"
                        alt=""
                        height="40"
                      />
                    </span>
                  </Link>
                </div>

                <button
                  type="button"
                  className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                  id="drawer-toggle"
                >
                  <span className="hamburger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>
              </div>

              <div className="d-flex align-items-center">
                <div className="dropdown d-md-none topbar-head-dropdown header-item">
                  <button
                    type="button"
                    className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                    id="page-header-search-dropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="bx bx-search fs-22"></i>
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                    aria-labelledby="page-header-search-dropdown"
                  >
                    <form className="p-3">
                      <div className="form-group m-0">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search ..."
                            aria-label="Recipient's username"
                          />
                          <button className="btn btn-primary" type="submit">
                            <i className="mdi mdi-magnify"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="dropdown ms-1 topbar-head-dropdown header-item">
                  <button
                    type="button"
                    className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      id="header-lang-img"
                      src="https://themesbrand.com/velzon/html/default/assets/images/flags/us.svg"
                      alt="Header Language"
                      height="20"
                      className="rounded"
                    />
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link
                      to="#"
                      className="dropdown-item notify-item language py-2"
                      data-lang="en"
                      title="English"
                    >
                      <img
                        src="https://themesbrand.com/velzon/html/default/assets/images/flags/us.svg"
                        alt="user-images"
                        className="me-2 rounded"
                        height="18"
                      />
                      <span className="align-middle">English</span>
                    </Link>
                  </div>
                </div>


                <div className="dropdown ms-sm-3 header-item topbar-user">
                  <button
                    type="button"
                    className="btn"
                    id="page-header-user-dropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="d-flex align-items-center">
                      <img
                        className="rounded-circle header-profile-user"
                        src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-1.jpg"
                        alt="Header Avatar"
                      />

                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">


                    {/* <Link className="dropdown-item" to="/Notification">
                      <i className="bx bx-bell text-muted fs-16 align-middle me-1"></i>

                      <span className="align-middle">Notification</span>
                    </Link> */}

                    <div className="dropdown-divider"></div>

                    {/* <Link className="dropdown-item" to="/Profile">
                      <span className="badge bg-success-subtle text-success mt-1 float-end">
                        New
                      </span>
                      <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
                      <span className="align-middle">Settings</span>
                    </Link> */}
                    <Link className="dropdown-item" to="/auth-lockscreen-basic">
                      <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>
                      <span className="align-middle">Lock screen</span>
                    </Link>
                    <Link className="dropdown-item" onClick={handleShowModal}>
                      <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                      <span className="align-middle" data-key="t-logout">
                        Logout
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className={`app-menu navbar-menu`} style={{ overflowY: "auto" }}>
          <div className="navbar-brand-box">
            <Link to="/" className="logo logo-dark">
              <span className="logo-sm">
                <img
                  src="https://provenonline.in/wp-content/uploads/2023/04/Untitled-design-6.png"
                  alt=""
                  height="40"
                />
              </span>
              <span className="logo-lg">
                <img
                  src="https://provenonline.in/wp-content/uploads/2023/04/Untitled-design-6.png"
                  alt=""
                  height="40"
                />
              </span>
            </Link>

            <Link to="/" className="logo logo-light">
              <span className="logo-sm">
                <img
                  src="https://provenonline.in/wp-content/uploads/2023/04/Untitled-design-6.png"
                  alt=""
                  height="50"
                />
              </span>
              <span className="logo-lg">
                <img
                  src="https://provenonline.in/wp-content/uploads/2023/04/Untitled-design-6.png"
                  alt=""
                  height="50"
                />
              </span>
            </Link>
            <button
              type="button"
              className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
              id="vertical-hover"
            >
              <i className="ri-record-circle-line"></i>
            </button>
          </div>

          <div id="scrollbar">
            <div className="container-fluid">
              <div id="two-column-menu"></div>
              <ul className="navbar-nav" id="navbar-nav">
                <li className="menu-title">
                  <span data-key="t-menu">Menu</span>
                </li>
                <li className="nav-item">
                  <div className="nav-link menu-link">
                    <i className="ri-dashboard-2-line"></i>

                    <Link to="/">Dashboards</Link>
                  </div>
                  <div
                    className="collapse menu-dropdown"
                    id="sidebarDashboards"
                  ></div>
                  <li className="menu-title">
                    <i className="ri-more-fill"></i>
                    <span data-key="t-pages">PRODUCT MANAGEMENT</span>
                  </li>
                </li>

                <li className="nav-item">
                  <li className="nav-item">
                    <Link to="/Categories" className="nav-link menu-link">
                      <i className="ri-layout-3-line"></i>
                      <span>Category</span>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="/SubCategory" className="nav-link menu-link">
                      <i className="ri-layout-3-line"></i>
                      <span>SubCategory</span>
                    </Link>
                  </li> */}
                  {/* <li className="nav-item">
                    <Link to="/AddOns" className="nav-link menu-link">
                      <i className="ri-layout-3-line"></i>
                      <span>Add on</span>
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link
                      className="nav-link menu-link"
                      to="/#sidebarApps"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarApps"
                    >
                      <i className="ri-apps-2-line"></i>
                      <span data-key="t-apps">Manage Product</span>
                    </Link>
                    <div className="collapse menu-dropdown" id="sidebarApps">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link
                            to="/Product"
                            className="nav-link"
                            data-key="t-chat"
                          >
                            All Product
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/AddProduct"
                            className="nav-link"
                            data-key="t-chat"
                          >
                            Add Product
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            to="/review"
                            className="nav-link"
                            data-key="t-chat"
                          >
                            Products Reviews
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </li>
                <li className="menu-title">
                  <i className="ri-more-fill"></i>
                  <span data-key="t-pages">ORDER MANAGEMENT</span>
                </li>
                <li className="nav-item">
                  <Link to="/Order" className="nav-link menu-link">
                    <i className="ri-layout-3-line"></i>
                    <span>Manage Order</span>
                  </Link>
                </li>

                <li className="menu-title">
                  <i className="ri-more-fill"></i>
                  <span data-key="t-pages">USER MANAGEMENT</span>
                </li>
                <li className="nav-item">
                  <Link to="/customer" className="nav-link menu-link">
                    <i className="ri-layout-3-line"></i>
                    <span>Customer</span>
                  </Link>
                </li>
                <li className="menu-title">
                  <i className="ri-more-fill"></i>
                  <span data-key="t-pages">PROMOTIONS</span>
                </li>
                <li className="nav-item">
                  <li className="nav-item">
                    <Link to="/Slider" className="nav-link menu-link">
                      <i className="ri-layout-3-line"></i>
                      <span>Sliders</span>
                    </Link>
                  </li>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link menu-link"
                    to="/#sidebarLanding"
                    data-bs-toggle="collapse"
                    role="button"
                    aria-expanded="false"
                    aria-controls="sidebarLanding"
                  >
                    <i className="ri-rocket-line"></i>
                    <span data-key="t-landing">Banners</span>
                  </Link>
                  <div className="collapse menu-dropdown" id="sidebarLanding">
                    <ul className="nav nav-sm flex-column">
                      <li className="nav-item">
                        <Link
                          to="/Banner"
                          className="nav-link"
                          data-key="t-nft-landing"
                        >
                          Banner Section 1
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/bannersection2"
                          className="nav-link"
                          data-key="t-nft-landing"
                        >
                          Banner Section 2
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/bannersection3"
                          className="nav-link"
                          data-key="t-nft-landing"
                        >
                          Banner Section 3
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/bannersection4"
                          className="nav-link"
                          data-key="t-nft-landing"
                        >
                          Banner Section 4
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <Link to="/Coupon" className="nav-link menu-link">
                    <i className="ri-layout-3-line"></i>
                    <span>Coupon</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Notification" className="nav-link menu-link">
                    <i className="ri-layout-3-line"></i>
                    <span>Notification</span>
                  </Link>
                </li>
                <li className="menu-title">
                  <i className="ri-more-fill"></i>
                  <span data-key="t-components">SYSTEM SETTINGS</span>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link menu-link"
                    to="/#sidebarPages"
                    data-bs-toggle="collapse"
                    role="button"
                    aria-expanded="false"
                    aria-controls="sidebarPages"
                  >
                    <i className="ri-pages-line"></i>
                    <span data-key="t-pages">Pages</span>
                  </Link>
                  <div className="collapse menu-dropdown" id="sidebarPages">
                    <ul className="nav nav-sm flex-column">
                      <li className="nav-item">
                        <Link
                          to="/Bloges"
                          className="nav-link"
                          data-key="t-team"
                        >
                          Bloges
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          to="/pages-faqs"
                          className="nav-link"
                          data-key="t-faqs"
                        >
                          FAQs
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/Testimonial"
                          className="nav-link"
                          data-key="t-faqs"
                        >
                          Testimonial
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/ReturnPolicy"
                          className="nav-link"
                          data-key="t-sitemap"
                        >
                          Return Policy
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          to="/pages-privacy-policy"
                          className="nav-link"
                          data-key="t-privacy-policy"
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/pages-term-conditions"
                          className="nav-link"
                          data-key="t-term-conditions"
                        >
                          Term & Conditions
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link menu-link"
                    to="/#sidebarAdvanceUI"
                    data-bs-toggle="collapse"
                    role="button"
                    aria-expanded="false"
                    aria-controls="sidebarAdvanceUI"
                  >
                    <i className="ri-stack-line"></i>
                    <span data-key="t-advance-ui">Genral settings</span>
                  </Link>
                  <div className="collapse menu-dropdown" id="sidebarAdvanceUI">
                    <ul className="nav nav-sm flex-column">


                      <li className="nav-item">
                        <Link
                          to="/InquiryList"
                          className="nav-link"
                          data-key="t-sweet-alerts"
                        >
                          Enquiries
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>

        {showModal && (
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModaldelete}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mt-2 text-center">
                    <RiDeleteBin6Line style={{ width: "100%" }} />
                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                      <h4>Are you Sure ?</h4>
                      <p className="text-muted mx-4 mb-0">
                        Are you Sure You want to Remove this Record ?
                      </p>
                    </div>
                  </div>
                  <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <button
                      type="button"
                      className="btn w-sm btn-light"
                      onClick={handleCloseModaldelete}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn w-sm btn-danger"
                      onClick={handleConfirmLogout}
                    >
                      Yes, Logout!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
