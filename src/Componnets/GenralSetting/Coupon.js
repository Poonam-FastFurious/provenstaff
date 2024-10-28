import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Baseurl } from "../../config";

function Coupon() {
  const [allcoupon, setAllcoupon] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editmodal, setEditmodal] = useState(false);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");

  const [discount, setDiscount] = useState("");
  const [status, setStatus] = useState("");
  const [coupontoEdit, setCoupontoEdit] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(Baseurl + "/api/v1/coupon/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          code: code,

          discount: discount,
          status: status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add tax");
      }
      toast.success("Coupon added successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          // Clear the form
          setTitle("");
          setCode("");
          setStatus("active");

          setDiscount("");
          setShowModal(false);
        },
      });

      // Refetch the tax list
      fetchcoupon();
    } catch (error) {
      console.log("Error fetching taxes: " + error.message);
    }
  };
  const deletecoupon = (taxId) => {
    Swal.fire({
      title: "Delete Coupon?",
      text: "Are you sure you want to Delete Coupon?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete!",
      position: "top",
      customClass: {
        popup: "w-[30%] h-auto",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(Baseurl + "/api/v1/coupon/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: taxId }), // Send the tax ID in the request body
        })
          .then((response) => {
            if (response.ok) {
              toast.success("Coupon delete successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                  window.location.reload();
                },
              });
            } else {
              throw new Error("Delete request failed");
            }
          })
          .catch((error) => {
            console.error("Error deleting tax:", error);
            // Handle error, show notification, etc.
          });
      }
    });
  };
  const fetchcoupon = async () => {
    try {
      setFetching(true);
      const response = await fetch(Baseurl + "/api/v1/coupon/coupons");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllcoupon(data.data);
    } catch (err) {
      console.log("Error fetching : ", "err.message");
    } finally {
      setFetching(false);
    }
  };
  useEffect(() => {
    fetchcoupon();
  }, []);
  const handleEdit = (couponId) => {
    const couponToEdit = allcoupon.find((coupon) => coupon._id === couponId);
    if (couponToEdit) {
      setCoupontoEdit(couponToEdit);
      setEditmodal(true);
    } else {
      // Handle error if tax not found
      console.error("coupon  not found");
      toast.error("coupon not found");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Make the API call to update tax
      const response = await fetch(Baseurl + "/api/v1/coupon/update", {
        method: "PATCH", // 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: coupontoEdit._id, // Pass the ID of the tax being edited
          title: coupontoEdit.title,
          code: coupontoEdit.code,
          status: coupontoEdit.status,
          discount: coupontoEdit.discount,

        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update tax");
      }
      toast.success("Coupon updated successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {

          setEditmodal(false);
          setCoupontoEdit({
            _id: "",
            title: "",
            code: "",
            status: "",
            discount: "",
            numberOfTimes: "",
          });
        },
      });
      // Close the edit modal after successful update

      // Refetch the tax list
      fetchcoupon();

    } catch (error) {
      toast.error("Error updating coupon: ");
      console.log("Error updating tax: " + error.message);
    }
  };
  const filteredCoupons = allcoupon.filter((coupon) =>
    coupon.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Coupon</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">Proven Ro</Link>
                      </li>
                      <li className="breadcrumb-item active">Coupon</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card" id="customerList">
                  <div className="card-header border-bottom-dashed">
                    <div className="row g-4 align-items-center">
                      <div className="col-sm">
                        <div>
                          <h5 className="card-title mb-0">Coupon List</h5>
                        </div>
                      </div>
                      <div className="col-sm-auto">
                        <div className="d-flex flex-wrap align-items-start gap-2 ">

                          <button
                            type="button"
                            className="btn btn-success add-btn"
                            id="create-btn"
                            onClick={() => setShowModal(true)}
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            Add Coupon
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body border-bottom-dashed border-bottom">
                    <form>
                      <div className="row g-3">
                        <div className="col-xl-6">
                          <div className="search-box">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search by title..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>


                      </div>
                    </form>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="table-responsive table-card mb-1">
                        <table
                          className="table align-middle"
                          id="customerTable"
                        >
                          <thead className="table-light text-muted">
                            <tr>
                              <th scope="col" style={{ width: "50px" }}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkAll"
                                    value="option"
                                  />
                                </div>
                              </th>
                              <th className="sort">Title</th>
                              <th className="sort">Code</th>
                              <th className="sort">Discount</th>
                              <th className="sort">Status</th>
                              <th className="sort">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {filteredCoupons.length > 0 ? (filteredCoupons.map((cou, index) => (
                              <tr key={index}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="chk_child"
                                      value="option1"
                                    />
                                  </div>
                                </th>
                                <td className="customer_name">{cou.title}</td>
                                <td className="email">{cou.code}</td>

                                <td className="phone">{cou.discount} %</td>
                                <td className="phone">{cou.status}</td>

                                <td>
                                  <ul className="list-inline hstack gap-2 mb-0">
                                    <li
                                      className="list-inline-item edit"
                                      title="Edit"
                                      onClick={() => handleEdit(cou._id)}
                                    >
                                      <Link
                                        to="#showModal"
                                        className="text-primary d-inline-block edit-item-btn"
                                      >
                                        <i className="ri-pencil-fill fs-16"></i>
                                      </Link>
                                    </li>
                                    <li
                                      className="list-inline-item"
                                      title="Remove"
                                      onClick={() => deletecoupon(cou._id)}
                                    >
                                      <Link
                                        className="text-danger d-inline-block remove-item-btn"
                                        to="#"
                                      >
                                        <i className="ri-delete-bin-5-fill fs-16"></i>
                                      </Link>
                                    </li>
                                  </ul>
                                </td>
                              </tr>

                            ))) : (
                              <tr></tr>)}
                          </tbody>
                        </table>
                        {filteredCoupons.length === 0 && !fetching && (
                          <div className="noresult">
                            <div className="text-center">
                              <lord-icon
                                src="../../../msoeawqm.json"
                                trigger="loop"
                                colors="primary:#121331,secondary:#08a88a"
                                style={{ width: "75px", height: "75px" }}
                              ></lord-icon>
                              <h5 className="mt-2">Sorry! No Result Found</h5>
                              <p className="text-muted mb-0">
                                We've searched more than 150+ customers. We did
                                not find any customer for your search.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                    {showModal && (
                      <div
                        className="modal fade show"
                        style={{
                          display: "block",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                        aria-labelledby="exampleModalLabel"
                        tabIndex="-1"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered custom-modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header bg-light p-3">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                add coupon
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                id="close-modal"
                                onClick={() => setShowModal(false)}
                              ></button>
                            </div>
                            <form
                              className="tablelist-form"
                              onSubmit={handleSubmit}
                            >
                              <div className="modal-body">
                                <input type="hidden" id="id-field" />
                                <div
                                  className="mb-3"
                                  id="modal-id"
                                  style={{ display: "none" }}
                                >
                                  <label
                                    htmlFor="id-field1"
                                    className="form-label"
                                  >
                                    ID
                                  </label>
                                  <input
                                    type="text"
                                    id="id-field1"
                                    className="form-control"
                                    placeholder="ID"
                                    readOnly=""
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="customername-field"
                                    className="form-label"
                                  >
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    id="customername-field"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    required=""
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                  />
                                  <div className="invalid-feedback">

                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="email-field"
                                    className="form-label"
                                  >
                                    Code
                                  </label>
                                  <input
                                    type="text"
                                    id="email-field"
                                    className="form-control"
                                    placeholder="Enter Code"
                                    required=""
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                  />
                                  <div className="invalid-feedback">
                                    Please enter an email.
                                  </div>
                                </div>

                                <div className="mb-3">
                                  <label
                                    htmlFor="email-field"
                                    className="form-label"
                                  >
                                    Discount
                                  </label>
                                  <input
                                    type="text"
                                    id="email-field"
                                    className="form-control"
                                    placeholder="Enter Discount"
                                    required=""
                                    value={discount}
                                    onChange={(e) =>
                                      setDiscount(e.target.value)
                                    }
                                  />
                                  <div className="invalid-feedback">
                                    Please enter an email.
                                  </div>
                                </div>
                                <div>
                                  <label
                                    htmlFor="status-field"
                                    className="form-label"
                                  >
                                    Status
                                  </label>
                                  <select
                                    className="form-control"
                                    name="status-field"
                                    id="status-field"
                                    required=""
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                  >
                                    <option value="">Status</option>
                                    <option value="active">Active</option>
                                    <option value="expired">Expired</option>
                                  </select>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <div className="hstack gap-2 justify-content-end">
                                  <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => setShowModal(false)}
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                    id="add-btn"
                                  >
                                    Add Coupon
                                  </button>

                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                    {editmodal && (
                      <div
                        className="modal fade show"
                        style={{
                          display: "block",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                        aria-labelledby="exampleModalLabel"
                        tabIndex="-1"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered custom-modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header bg-light p-3">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                edit coupon
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                id="close-modal"
                                onClick={() => setEditmodal(false)}
                              ></button>
                            </div>
                            <form
                              className="tablelist-form"
                              onSubmit={handleUpdate}
                            >
                              <div className="modal-body">

                                <div className="mb-3">
                                  <label
                                    htmlFor="customername-field"
                                    className="form-label"
                                  >
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    id="customername-field"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    required=""
                                    value={coupontoEdit.title}
                                    onChange={(e) =>
                                      setCoupontoEdit({
                                        ...coupontoEdit,
                                        title: e.target.value,
                                      })
                                    }
                                  />
                                  <div className="invalid-feedback">
                                    Please enter a customer name.
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="email-field"
                                    className="form-label"
                                  >
                                    Code
                                  </label>
                                  <input
                                    type="text"
                                    id="email-field"
                                    className="form-control"
                                    placeholder="Enter Code"
                                    required=""
                                    value={coupontoEdit.code}
                                    onChange={(e) =>
                                      setCoupontoEdit({
                                        ...coupontoEdit,
                                        code: e.target.value,
                                      })
                                    }
                                  />
                                  <div className="invalid-feedback">
                                    Please enter an email.
                                  </div>
                                </div>

                                <div className="mb-3">
                                  <label
                                    htmlFor="email-field"
                                    className="form-label"
                                  >
                                    Discount
                                  </label>
                                  <input
                                    type="text"
                                    id="email-field"
                                    className="form-control"
                                    placeholder="Enter Discount"
                                    required=""
                                    value={coupontoEdit.discount}
                                    onChange={(e) =>
                                      setCoupontoEdit({
                                        ...coupontoEdit,
                                        discount: e.target.value,
                                      })
                                    }
                                  />
                                  <div className="invalid-feedback">
                                    Please enter an email.
                                  </div>
                                </div>
                                <div>
                                  <label
                                    htmlFor="status-field"
                                    className="form-label"
                                  >
                                    Status
                                  </label>
                                  <select
                                    className="form-control"
                                    id="status-field"
                                    required=""
                                    value={coupontoEdit.status}
                                    onChange={(e) =>
                                      setCoupontoEdit({
                                        ...coupontoEdit,
                                        status: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="active">Active</option>
                                    <option value="expired">Expired</option>
                                  </select>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <div className="hstack gap-2 justify-content-end">
                                  <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => setEditmodal(false)}
                                  >
                                    Close
                                  </button>

                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                    id="edit-btn"
                                  >
                                    Update
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Coupon;
