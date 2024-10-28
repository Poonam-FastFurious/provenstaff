import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function Tax() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Function to handle showing the modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModaldelete = () => {
    setShowModal(false);
  };
  const handleAddClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Tax</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">Proven Ro</Link>
                      </li>
                      <li className="breadcrumb-item active">Tax</li>
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
                          <h5 className="card-title mb-0">Tax List</h5>
                        </div>
                      </div>
                      <div className="col-sm-auto">
                        <div className="d-flex flex-wrap align-items-start gap-2">
                          <button
                            className="btn btn-soft-danger"
                            id="remove-actions"
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-success add-btn"
                            id="create-btn"
                            onClick={handleAddClick}
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            Add Taxes
                          </button>
                          <button type="button" className="btn btn-info">
                            <i className="ri-file-download-line align-bottom me-1"></i>
                            Import
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
                              placeholder="Search for customer, email, phone, status or something..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>

                        <div className="col-xl-6">
                          <div className="row g-3">
                            <div className="col-sm-4">
                              <div className="">
                                <input
                                  type="date"
                                  className="form-control"
                                  id="datepicker-range"
                                  placeholder="Select date"
                                />
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div>
                                <select
                                  className="form-control"
                                  name="choices-single-default"
                                  id="idStatus"
                                >
                                  <option>Status</option>
                                  <option>All</option>
                                  <option>Active</option>
                                  <option>Block</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-primary w-100"
                                >
                                  <i className="ri-equalizer-fill me-2 align-bottom"></i>
                                  Filters
                                </button>
                              </div>
                            </div>
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
                                  />
                                </div>
                              </th>

                              <th className="sort">Title</th>
                              <th className="sort">Tax</th>
                              <th className="sort">Status</th>
                              <th className="sort">Action</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            <tr>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="chk_child"
                                  />
                                </div>
                              </th>
                              <td className="customer_name">Tax.taxTitle</td>
                              <td className="email">{Tax.taxPercentage}%</td>
                              <td className="phone">{Tax.status}</td>

                              <td>
                                <ul className="list-inline hstack gap-2 mb-0">
                                  <li
                                    className="list-inline-item edit"
                                    title="Edit"
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
                                  >
                                    <Link
                                      className="text-danger d-inline-block remove-item-btn"
                                      to="#deleteRecordModal"
                                      onClick={handleShowModal}
                                    >
                                      <i className="ri-delete-bin-5-fill fs-16"></i>
                                    </Link>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        </table>

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
                      </div>
                      <div className="d-flex justify-content-end">
                        <div className="pagination-wrap hstack gap-2">
                          <Link
                            className="page-item pagination-prev disabled"
                            to="#"
                          >
                            Previous
                          </Link>
                          <ul className="pagination listjs-pagination mb-0"></ul>
                          <Link className="page-item pagination-next" to="#">
                            Next
                          </Link>
                        </div>
                      </div>
                    </div>

                    {modalVisible && (
                      <div
                        className="modal fade show"
                        style={{
                          display: "block",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header bg-light p-3">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Add Tax
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={handleCloseModal}
                              ></button>
                            </div>
                            <form className="tablelist-form">
                              <div className="modal-body">
                                <input type="hidden" id="id-field" />

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
                                  />
                                  <div className="invalid-feedback">
                                    Please enter a tax name.
                                  </div>
                                </div>

                                <div className="mb-3">
                                  <label
                                    htmlFor="email-field"
                                    className="form-label"
                                  >
                                    Tax Percentage
                                  </label>
                                  <input
                                    type="number"
                                    id="email-field"
                                    className="form-control"
                                    placeholder="Enter Tax"
                                    required=""
                                  />
                                  <div className="invalid-feedback">
                                    Please enter a tax.
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
                                  >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                  </select>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <div className="hstack gap-2 justify-content-end">
                                  <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={handleCloseModal}
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                  >
                                    Add Tax
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
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
                                    Are you Sure You want to Remove this Record
                                    ?
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
                                >
                                  Yes, Delete It!
                                </button>
                              </div>
                            </div>
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

export default Tax;
