import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Baseurl } from "../../config";

function Inquiry() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch inquiries from the API
    fetch(Baseurl + "/api/v1/Inquiry")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setInquiries(data.inquiries);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load inquiries. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the delete operation
        fetch(`${Baseurl}/api/v1/inquiry/delete?id=${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              Swal.fire(
                "Deleted!",
                "Your inquiry has been deleted.",
                "success"
              );
              // Remove the deleted inquiry from the state
              setInquiries(inquiries.filter((inquiry) => inquiry._id !== id));
            } else {
              Swal.fire("Error!", data.message, "error");
            }
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "Failed to delete the inquiry. Please try again later.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Inquiry</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="">Proven Ro</Link>
                    </li>
                    <li className="breadcrumb-item active">Inquiry</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card" id="orderList">
                <div className="card-header border-0">
                  <div className="row align-items-center gy-3">
                    <div className="col-sm">
                      <h5 className="card-title mb-0">Inquiry</h5>
                    </div>
                    <div className="col-sm-auto">
                      <div className="d-flex gap-1 flex-wrap">
                        <button
                          className="btn btn-soft-danger"
                          id="remove-actions"
                        >
                          <i className="ri-delete-bin-2-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-2"
                  style={{ marginTop: "25px", backgroundColor: "white" }}
                >
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : (
                    <>
                      <table className="table table-striped align-middle table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Customer Email</th>
                            <th scope="col">Mobile Number</th>
                            <th scope="col">PinCode</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inquiries.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="text-center">
                                <div className="noresult">
                                  <div className="text-center">
                                    <lord-icon
                                      src="../../../msoeawqm.json"
                                      trigger="loop"
                                      colors="primary:#121331,secondary:#08a88a"
                                      style={{ width: "75px", height: "75px" }}
                                    ></lord-icon>
                                    <h5 className="mt-2">
                                      Sorry! No Result Found
                                    </h5>
                                    <p className="text-muted mb-0">
                                      We've searched more than 150+ customers.
                                      We did not find any customer for your
                                      search.
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            inquiries.map((inquiry) => (
                              <tr key={inquiry._id}>
                                <td>{inquiry.name}</td>
                                <td>{inquiry.email}</td>
                                <td>{inquiry.mobile}</td>
                                <td>{inquiry.pincode}</td>
                                <td>{inquiry.product}</td>
                                <td>
                                  <div className="hstack gap-3 flex-wrap">
                                    <Link
                                      className="link-danger fs-15"
                                      onClick={() => handleDelete(inquiry._id)}
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inquiry;
