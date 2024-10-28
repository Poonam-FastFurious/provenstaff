import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Baseurl } from "../../config";
import axios from "axios";
import Swal from "sweetalert2";
function Category() {
  const [categoriesTitle, setCategoriesTitle] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // New state variables for editing
  const [editId, setEditId] = useState("");
  const [editCategoriesTitle, setEditCategoriesTitle] = useState("");
  const [editLink, setEditLink] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editImage, setEditImage] = useState("");

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        Baseurl + "/api/v1/category/allcategory"
      );
      setCategory(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  const clearForm = () => {
    setCategoriesTitle(""); // Clear the state for categoriesTitle
    setLink(""); // Clear the state for link
    setStatus(""); // Clear the state for status
    setImage(null); // Clear the state for image
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleEditImageChange = (e) => {
    setEditImage(e.target.files[0]);
  };
  const handleEditClick = (cat) => {
    setEditId(cat._id);
    setEditCategoriesTitle(cat.categoriesTitle);
    setEditLink(cat.link);
    setEditStatus(cat.status);
    setEditImage(null);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", editId);
    formData.append("categoriesTitle", editCategoriesTitle);
    formData.append("link", editLink);
    formData.append("status", editStatus);
    if (editImage) {
      formData.append("image", editImage);
    }

    try {
      setLoading(true);
      const response = await fetch(Baseurl + "/api/v1/category/update", {
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
            const modalElement = document.getElementById("editModal");
            const modal = window.bootstrap.Modal.getInstance(modalElement);
            modal.hide();
            fetchCategory();
          },
        });
      } else {
        throw new Error("Category update failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Category update failed", {
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
  const handelsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoriesTitle", categoriesTitle);
    formData.append("link", link);
    formData.append("status", status);

    formData.append("image", image);

    try {
      setLoading(true);
      const response = await fetch(Baseurl + "/api/v1/category/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Category added successfully ", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            clearForm();
            const modalElement = document.getElementById("showModal");
            const modal = window.bootstrap.Modal.getInstance(modalElement);
            modal.hide();
            fetchCategory();
          },
        });
      } else {
        throw new Error("category upload failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Banner upload failed", {
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
  const handleDelete = async (id) => {
    // Display confirmation dialog using SweetAlert 2
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            Baseurl + `/api/v1/category/delete/?id=${id}`
          );
          if (response.data.success) {
            // Using SweetAlert 2 for success message
            Swal.fire({
              icon: "success",
              title: "Category deleted successfully",
              timer: 1000,
              showConfirmButton: false,
            }).then(() => {
              setCategory(category.filter((cat) => cat._id !== id));
              window.location.reload(); // Reload the page or update state as needed
              fetchCategory();
            });
          } else {
            throw new Error(response.data.message); // Throw error with response message
          }
        } catch (error) {
          console.error("Error:", error.message);
          // Using SweetAlert 2 for error message
          Swal.fire({
            icon: "error",
            title: "Failed to delete category",
            text: error.message || "Failed to delete category",
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  const filteredCategories = category.filter((cat) =>
    cat.categoriesTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0">Add category</h4>

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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                            {filteredCategories.length > 0 ? (
                              filteredCategories.map((cat, index) => (
                                <tr key={index}>


                                  <td class="email">
                                    <img
                                      className="avatar-xs rounded-circle"
                                      src={cat.image}
                                      alt=""
                                    ></img>
                                  </td>
                                  <td class="phone">{cat.categoriesTitle}</td>
                                  <td class="date">{cat.link}</td>
                                  <td class="status">
                                    <span class="badge bg-success-subtle text-success text-uppercase">
                                      {cat.status}
                                    </span>
                                  </td>
                                  <td>
                                    <div class="d-flex gap-2">
                                      <div class="edit">
                                        <button
                                          class="btn btn-sm btn-success edit-item-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#editModal"
                                          onClick={() => handleEditClick(cat)}
                                        >
                                          Edit
                                        </button>
                                      </div>
                                      <div class="remove">
                                        <button
                                          class="btn btn-sm btn-danger remove-item-btn"
                                          onClick={() => handleDelete(cat._id)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="6" class="text-center">
                                  <div class="noresult" >
                                    <div class="text-center">
                                      <lord-icon
                                        src="../../../msoeawqm.json"
                                        trigger="loop"
                                        colors="primary:#121331,secondary:#08a88a"
                                        style={{ width: "75px", height: "75px" }}
                                      ></lord-icon>
                                      <h5 class="mt-2">Sorry! No Result Found</h5>
                                      <p class="text-muted mb-0">
                                        We've searched more than 150+ Orders We did not
                                        find any orders for you search.
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="showModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header bg-light p-3">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Add category
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="close-modal"
                  ></button>
                </div>
                <form
                  class="tablelist-form"
                  autocomplete="off"
                  onSubmit={handelsubmit}
                >
                  <div class="modal-body">
                    <div class="mb-3" id="modal-id" style={{ display: "none" }}>
                      <label for="id-field" class="form-label">
                        ID
                      </label>
                      <input
                        type="text"
                        id="id-field"
                        class="form-control"
                        placeholder="ID"
                        readonly=""
                      />
                    </div>

                    <div class="mb-3">
                      <label for="customername-field" class="form-label">
                        Categories Title
                      </label>
                      <input
                        type="text"
                        id="customername-field"
                        class="form-control"
                        placeholder="Enter Title"
                        required=""
                        onChange={(e) => setCategoriesTitle(e.target.value)}
                        value={categoriesTitle}
                      />
                      <div class="invalid-feedback">Please enter a Title</div>
                    </div>

                    <div class="mb-3">
                      <label for="email-field" class="form-label">
                        Link
                      </label>
                      <input
                        type="text"
                        id="email-field"
                        class="form-control"
                        placeholder="Enter Link"
                        required=""
                        onChange={(e) => setLink(e.target.value)}
                        value={link}
                      />
                      <div class="invalid-feedback">Please enter an Link.</div>
                    </div>

                    <div class="mb-3">
                      <label for="phone-field" class="form-label">
                        Image
                      </label>
                      <input
                        type="file"
                        id="phone-field"
                        class="form-control"
                        placeholder="Enter Phone no."
                        required=""
                        onChange={handleImageChange}
                      />
                      <div class="invalid-feedback">Please enter a phone.</div>
                    </div>

                    <div>
                      <label for="status-field" class="form-label">
                        Status
                      </label>
                      <select
                        class="form-control"
                        data-trigger=""
                        name="status-field"
                        id="status-field"
                        required=""
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                      >
                        <option value="">Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Block</option>
                      </select>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <div class="hstack gap-2 justify-content-end">
                      <button
                        type="button"
                        class="btn btn-light"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        class="btn btn-success"
                        id="add-btn"
                      >
                        Add Categories
                      </button>
                    </div>
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
                </form>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="editModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header bg-light p-3">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Upadte category
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="close-modal"
                  ></button>
                </div>
                <form
                  class="tablelist-form"
                  autocomplete="off"
                  onSubmit={handleEditSubmit}
                >
                  <div class="modal-body">
                    <div class="mb-3" id="modal-id">
                      <label for="id-field" class="form-label">
                        ID
                      </label>
                      <input
                        type="text"
                        id="id-field"
                        class="form-control"
                        placeholder="ID"
                        readonly=""
                        value={editId}
                      />
                    </div>

                    <div class="mb-3">
                      <label for="customername-field" class="form-label">
                        Category Title
                      </label>
                      <input
                        type="text"
                        id="customername-field"
                        class="form-control"
                        placeholder="Enter Title"
                        required
                        value={editCategoriesTitle}
                        onChange={(e) => setEditCategoriesTitle(e.target.value)}
                      />
                      <div class="invalid-feedback">Please enter a Title</div>
                    </div>

                    <div class="mb-3">
                      <label for="email-field" class="form-label">
                        Link
                      </label>
                      <input
                        type="text"
                        id="email-field"
                        class="form-control"
                        placeholder="Enter Link"
                        required=""
                        value={editLink}
                        onChange={(e) => setEditLink(e.target.value)}
                      />
                      <div class="invalid-feedback">Please enter an Link.</div>
                    </div>

                    <div class="mb-3">
                      <label for="phone-field" class="form-label">
                        Image
                      </label>
                      <input
                        type="file"
                        id="phone-field"
                        class="form-control"
                        placeholder="Enter Phone no."
                        required=""
                        onChange={handleEditImageChange}
                      />
                      <div class="invalid-feedback">Please enter a Image</div>
                    </div>

                    <div>
                      <label for="status-field" class="form-label">
                        Status
                      </label>
                      <select
                        class="form-control"
                        data-trigger=""
                        name="status-field"
                        id="status-field"
                        required=""
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option>Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <div class="hstack gap-2 justify-content-end">
                      <button
                        type="button"
                        class="btn btn-light"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>

                      <button
                        type="submit"
                        class="btn btn-success"
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
        </div>
      </div>
    </>
  );
}

export default Category;
