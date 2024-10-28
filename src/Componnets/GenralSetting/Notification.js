import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Baseurl } from "../../config"; // Make sure Baseurl is correctly set

function Notification() {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the notification data
    const notificationData = {
      Type: type,
      Title: title,
      Detail: details,
    };

    try {
      // Send the data to the server
      const response = await fetch(`${Baseurl}/api/v1/Notification/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationData),
      });

      if (!response.ok) {
        throw new Error("Failed to send notification");
      }

      // Handle success
      toast.success("Notification sent successfully!");
      // Optionally, reset the form or navigate away
      setType("");
      setTitle("");
      setDetails("");
    } catch (error) {
      // Handle errors
      console.error("Error sending notification:", error);
      toast.error("Failed to send notification");
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="col-xl-12 col-lg-8">
            <div>
              <div className="card">
                <div className="card-header border-0">
                  <div className="row g-4">
                    <div className="col-sm-auto">
                      <div>
                        <Link to="/addslider" className="btn" id="addproduct-btn">
                          Send Notification
                        </Link>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="d-flex justify-content-sm-end">
                        <div className="search-box ms-2">
                          <Link onClick={handleGoBack} to="/add-product" className="btn btn-success" id="addproduct-btn">
                            <i className="align-bottom me-1"></i> Back
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "white" }}>
            <form
              style={{ paddingLeft: "50px", paddingRight: "50px", height: "100vh" }}
              onSubmit={handleSubmit}
            >
              <div className="row" style={{ paddingTop: "10px" }}>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Type </h4>
                    </div>
                    <div className="card-body">
                      <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                      >
                        <option value="">Select Notification Type</option>
                        <option value="Product">Product</option>
                        <option value="General">General</option>
                        <option value="Categories">Categories</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3 col-lg-6">
                <label htmlFor="notificationTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="notificationTitle"
                  placeholder="Enter notification title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 col-lg-6">
                <label htmlFor="notificationDetails" className="form-label">
                  Details
                </label>
                <textarea
                  className="form-control h-12"
                  id="notificationDetails"
                  placeholder="Enter notification details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit" className="btn btn-success">
                  Send Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
