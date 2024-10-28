import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Baseurl } from "../../../config";
import Swal from "sweetalert2";

function Section4() {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    link: "",
    status: "", // Assuming you need to add a field for status
    type: "4", // Assuming you need to add a field for type
    image: null,
  });
  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState("");
  const [edittitle, setEdittitle] = useState("");
  const [editLink, setEditLink] = useState("");
  const [edittype, setEdittype] = useState("");
  const [editdetails, setEditdetails] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editImage, setEditImage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        Baseurl + "/api/v1/Banner/allabnner?type=4"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBanners(data.data); // Assuming data is an array of banner objects
      setFilteredBanners(data.data); // Initialize filteredBanners with all banners initially
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };
  const handleEditImageChange = (e) => {
    setEditImage(e.target.files[0]);
  };
  const handleEditClick = (cat) => {
    setEditId(cat._id);
    setEdittitle(cat.title);
    setEditLink(cat.link);
    setEditStatus(cat.status);
    setEditdetails(cat.details);
    setEdittype(cat.type);
    setEditImage(null);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", editId);
    formData.append("title", edittitle);
    formData.append("link", editLink);
    formData.append("status", editStatus);
    formData.append("type", edittype);
    formData.append("details", editdetails);
    if (editImage) {
      formData.append("image", editImage);
    }

    try {
      setLoading(true);
      const response = await fetch(Baseurl + "/api/v1/Banner/edit", {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Category updated successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            const modalElement = document.getElementById("editshowModal");
            const modal = window.bootstrap.Modal.getInstance(modalElement);
            modal.hide();
            fetchData();
          },
        });
      } else {
        throw new Error("Banner update failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Banner update failed", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("details", formData.details);
    formPayload.append("link", formData.link);
    formPayload.append("status", formData.status);
    formPayload.append("type", formData.type);
    formPayload.append("image", formData.image);

    const requestOptions = {
      method: "POST",
      body: formPayload,
    };

    try {
      const response = await fetch(
        Baseurl + "/api/v1/Banner/add",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Handle success scenario

      setFormData({
        title: "",
        details: "",
        link: "",
        status: "",
        type: "",
        image: null,
      });
      // Close modal
      const modalElement = document.getElementById("showModal");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      modal.hide();
      toast.success("🦄 banner Added succsessfull!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error adding banner:", error);
      alert("Failed to add banner. Please try again.");
    }
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(Baseurl + `/api/v1/Banner/delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
          if (!response.ok) {
            throw new Error("Failed to delete banner");
          }
          setBanners(banners.filter((banner) => banner._id !== id));
          setFilteredBanners(
            filteredBanners.filter((banner) => banner._id !== id)
          );
          Swal.fire("Deleted!", "Your banner has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting banner:", error);
          Swal.fire(
            "Error!",
            "Failed to delete banner. Please try again.",
            "error"
          );
        }
      }
    });
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredBanners = banners.filter((banner) =>
      banner.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBanners(filteredBanners);
    setCurrentPage(1); // Reset to first page when searching
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {


    fetchData();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBanners.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0">Add Banner</h4>

                  <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item">
                        <Link to="#">Proven Ro</Link>
                      </li>
                      <li class="breadcrumb-item active">Add </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div class="listjs-table" id="customerList">
                      <div class="row g-4 mb-3">
                        <div class="col-sm-auto">
                          <div>
                            <button
                              type="button"
                              class="btn btn-success add-btn"
                              data-bs-toggle="modal"
                              id="create-btn"
                              data-bs-target="#showModal"
                            >
                              <i class="ri-add-line align-bottom me-1"></i> Add
                            </button>
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="d-flex justify-content-sm-end">
                            <div class="search-box ms-2">
                              <input
                                type="text"
                                class="form-control search"
                                placeholder="Search..."
                                onChange={handleSearch}
                                value={searchTerm}
                              />
                              <i class="ri-search-line search-icon"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive table-card mt-3 mb-1">
                        <table
                          class="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead class="table-light">
                            <tr>

                              <th class="sort" data-sort="customer_name">
                                Image
                              </th>
                              <th class="sort" data-sort="email">
                                Title
                              </th>
                              <th class="sort" data-sort="phone">
                                Details
                              </th>
                              <th class="sort" data-sort="phone">
                                Place
                              </th>
                              <th class="sort" data-sort="date">
                                Link
                              </th>
                              <th class="sort" data-sort="status">
                                Status
                              </th>
                              <th class="sort" data-sort="action">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody class="list form-check-all">
                            {currentItems.map((item, index) => (
                              <tr key={index}>

                                <td class="id" >
                                  <img
                                    src={item.image}
                                    alt=""
                                    className="avatar-xs rounded-circle"
                                  />
                                </td>
                                <td class="email">{item.title}</td>
                                <td class="email">{item.details}</td>
                                <td class="phone">Section 4</td>
                                <td class="date">{item.link}</td>
                                <td class="status">
                                  <span class="badge bg-success-subtle text-success text-uppercase">
                                    {item.status}
                                  </span>
                                </td>
                                <td>
                                  <div class="d-flex gap-2">
                                    <div class="edit">
                                      <button
                                        class="btn btn-sm btn-success edit-item-btn"
                                        onClick={() => handleEditClick(item)}
                                        data-bs-toggle="modal"

                                        data-bs-target="#editshowModal"
                                      >
                                        Edit
                                      </button>
                                    </div>
                                    <div class="remove">
                                      <button
                                        class="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() => handleDelete(item._id)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {filteredBanners.length === 0 && (
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
                                We've searched more than 150+ Orders. We did not
                                find any banners matching your search.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <nav>
                          <ul className="pagination">
                            <li
                              className={`page-item ${currentPage === 1 && "disabled"
                                }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage - 1)}
                              >
                                Previous
                              </button>
                            </li>
                            {Array.from(
                              {
                                length: Math.ceil(
                                  filteredBanners.length / itemsPerPage
                                ),
                              },
                              (_, i) => (
                                <li
                                  key={i}
                                  className={`page-item ${currentPage === i + 1 && "active"
                                    }`}
                                >
                                  <button
                                    className="page-link"
                                    onClick={() => paginate(i + 1)}
                                  >
                                    {i + 1}
                                  </button>
                                </li>
                              )
                            )}
                            <li
                              className={`page-item ${currentPage ===
                                Math.ceil(
                                  filteredBanners.length / itemsPerPage
                                ) && "disabled"
                                }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage + 1)}
                              >
                                Next
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="showModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-light p-3">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add BANNER
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="close-modal"
                  ></button>
                </div>
                <form
                  className="tablelist-form"
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="title-field" className="form-label">
                        Banner Title
                      </label>
                      <input
                        type="text"
                        id="title-field"
                        className="form-control"
                        placeholder="Enter Title"
                        required
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter a Title
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="details-field" className="form-label">
                        Details
                      </label>
                      <input
                        type="text"
                        id="details-field"
                        className="form-control"
                        placeholder="Enter Details"
                        required
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter Details
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="link-field" className="form-label">
                        Link
                      </label>
                      <input
                        type="text"
                        id="link-field"
                        className="form-control"
                        placeholder="Enter Link"
                        required
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter a Link
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="status-field" className="form-label">
                        Status
                      </label>
                      <select
                        className="form-control"
                        name="status"
                        id=""
                        required
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Block">Block</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a Status
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="type-field" className="form-label">
                        Place
                      </label>
                      <select
                        className="form-control"
                        name="type"
                        id="type"
                        required
                        value={formData.type}
                        onChange={handleChange}
                      >
                        <option value="">Select place</option>
                        <option value="4">Section 4</option>
                        {/* Add more options as needed */}
                      </select>
                      <div className="invalid-feedback">
                        Please select a Type
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image-field" className="form-label">
                        Image
                      </label>
                      <input
                        type="file"
                        id="image-field"
                        className="form-control"
                        required
                        name="image"
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please select an Image
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                      <button
                        type="button"
                        className="btn btn-light"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success"
                        id="add-btn"
                      >
                        Add Banner
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="editshowModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-light p-3">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit BANNER
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="close-modal"
                  ></button>
                </div>
                <form
                  className="tablelist-form"
                  autoComplete="off"
                  onSubmit={handleEditSubmit}
                >
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="title-field" className="form-label">
                        Banner Title
                      </label>
                      <input
                        type="text"
                        id="title-field"
                        className="form-control"
                        placeholder="Enter Title"
                        required
                        value={edittitle}
                        onChange={(e) => setEdittitle(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Please enter a Title
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="details-field" className="form-label">
                        Details
                      </label>
                      <input
                        type="text"
                        id="details-field"
                        className="form-control"
                        placeholder="Enter Details"
                        required
                        value={editdetails}
                        onChange={(e) => setEditdetails(e.target.value)}

                      />
                      <div className="invalid-feedback">
                        Please enter Details
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="link-field" className="form-label">
                        Link
                      </label>
                      <input
                        type="text"
                        id="link-field"
                        className="form-control"
                        placeholder="Enter Link"
                        required
                        value={editLink}
                        onChange={(e) => setEditLink(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Please enter a Link
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="status-field" className="form-label">
                        Status
                      </label>
                      <select
                        className="form-control"
                        name="status"
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Block">Block</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a Status
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="type-field" className="form-label">
                        Place
                      </label>
                      <select
                        className="form-control"
                        name="type"
                        id="type"
                        required
                        value={edittype}
                        onChange={(e) => setEdittype(e.target.value)}
                      >
                        <option value="">Select place</option>
                        <option value="4">Section 4</option>
                        {/* Add more options as needed */}
                      </select>
                      <div className="invalid-feedback">
                        Please select a Type
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image-field" className="form-label">
                        Image
                      </label>
                      <input
                        type="file"
                        id="image-field"
                        className="form-control"
                        onChange={handleEditImageChange}
                      />
                      <div className="invalid-feedback">
                        Please select an Image
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                      <button
                        type="button"
                        className="btn btn-light"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success"
                        id="add-btn"
                      >
                        Update Banner
                      </button>
                      {loading && (
                        <div className="loader">
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section4;
