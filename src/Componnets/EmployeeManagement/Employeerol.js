import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Baseurl } from "../../config";

function Employeerol() {
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [allemployee, setAllemployee] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    employeeRole: "",
  });

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(Baseurl + "/api/v1/Employee/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: employeeId }),
      });

      if (response.ok) {
        // Remove the deleted employee from the state
        setAllemployee(allemployee.filter((empl) => empl.id !== employeeId));
        Swal.fire("Deleted!", "Employee has been deleted.", "success");
      } else {
        Swal.fire("Failed!", "Failed to delete employee.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "An error occurred.", "error");
    }
  };

  const confirmDelete = (employeeId) => {
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
        handleDelete(employeeId);
      }
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", employeeData.name);
      formData.append("email", employeeData.email);
      formData.append("mobileNumber", employeeData.mobileNumber);
      formData.append("password", employeeData.password);
      formData.append("image", employeeData.image);
      formData.append("employeeRole", employeeData.employeeRole);

      const response = await fetch(Baseurl + "/api/v1/Employee/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      // Handle success scenario
      Swal.fire({
        icon: "success",
        title: "Employee added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Close modal
      const modal = document.getElementById("showModal");
      const modalBackdrop =
        document.getElementsByClassName("modal-backdrop")[0];
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
      modalBackdrop.remove();

      // Optionally reset the form
      setEmployeeData({
        name: "",
        email: "",
        mobileNumber: "",
        password: "",
        image: null,
        employeeRole: "",
      });

      // Fetch updated list of employees
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
      // Handle error scenario
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add employee",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };



  const fetchEmployees = () => {
    fetch(Baseurl + "/api/v1/Employee/allEmployees")
      .then((res) => res.json())
      .then((data) => setAllemployee(data.data))
      .catch((error) => console.error("Error fetching employees:", error));
  };
  const openEditModal = (employeeId) => {
    setEditingEmployeeId(employeeId);
    const modalElement = document.getElementById("editshowModal");
    const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
    // Open the modal (assuming Bootstrap modals are used)

  };
  const handlePasswordUpdate = async (event, employeeId) => {
    event.preventDefault();

    if (!employeeId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Employee ID is required",
        confirmButtonColor: "#dc3545",
      });
      return;
    }

    try {
      const response = await fetch(`${Baseurl}/api/v1/Employee/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: employeeId,
          password: employeeData.password,
        }),
      });

      if (!response.ok) throw new Error("Failed to update password");

      Swal.fire({
        icon: "success",
        title: "Password updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setEmployeeData((prevData) => ({ ...prevData, password: "" }));
      setEditingEmployeeId(null); // Reset employeeId state
      const modalElement = document.getElementById("editshowModal");
      const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.hide(); // Hide the modal
      fetchEmployees();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update password",
        confirmButtonColor: "#dc3545",
      });
    }
  };



  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0">Add Employee</h4>

                  <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item">
                        <Link to="#">Proven Ro</Link>
                      </li>
                      <li class="breadcrumb-item active">Add Employee</li>
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
                              <th scope="col" style={{ width: "50px;" }}>
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="checkAll"
                                    value="option"
                                  />
                                </div>
                              </th>
                              <th class="sort" data-sort="customer_name">
                                Name
                              </th>
                              <th class="sort" data-sort="email">
                                Email
                              </th>
                              <th class="sort" data-sort="phone">
                                Mobile
                              </th>
                              <th class="sort" data-sort="date">
                                EmployeeRole
                              </th>

                              <th class="sort" data-sort="action">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody class="list form-check-all">
                            {allemployee.map((empl, index) => (
                              <tr key={index}>
                                <th scope="row">
                                  <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      name="chk_child"
                                      value="option1"
                                    />
                                  </div>
                                </th>
                                <td class="id">
                                  <Link to="#" class="fw-medium link-primary">
                                    {empl.name}
                                  </Link>
                                </td>

                                <td class="email">{empl.email}</td>
                                <td class="phone">{empl.mobileNumber}</td>
                                <td class="date">{empl.employeeRole}</td>

                                <td>
                                  <div class="d-flex gap-2">
                                    <div class="edit">
                                      <button
                                        class="btn btn-sm btn-success edit-item-btn"
                                        onClick={() => openEditModal(empl._id)}
                                      >
                                        Edit
                                      </button>
                                    </div>
                                    <div class="remove">
                                      <button
                                        class="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() => confirmDelete(empl._id)}
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
                        {allemployee.length === 0 && (
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
                    Add Employee
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
                  onSubmit={handleSubmit}
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
                        Employee Name
                      </label>
                      <input
                        type="text"
                        id="customername-field"
                        class="form-control"
                        placeholder="Enter Title"
                        value={employeeData.name}
                        onChange={handleInputChange}
                        name="name"
                        required
                      />
                      <div class="invalid-feedback">Please enter a Title</div>
                    </div>
                    <div class="mb-3">
                      <label for="email-field" class="form-label">
                        email
                      </label>
                      <input
                        type="email"
                        id="email-field"
                        name="email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={employeeData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <div class="invalid-feedback">Please enter an Link.</div>
                    </div>
                    <div class="mb-3">
                      <label for="email-field" class="form-label">
                        Mobile Number
                      </label>
                      <input
                        type="number"
                        id="email-field"
                        class="form-control"
                        placeholder="Enter Link"
                        required=""
                        name="mobileNumber"
                        value={employeeData.mobileNumber}
                        onChange={handleInputChange}
                      />
                      <div class="invalid-feedback">Please enter an Link.</div>
                    </div>
                    <div class="mb-3">
                      <label for="email-field" class="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        id="email-field"
                        class="form-control"
                        placeholder="Enter Link"
                        required=""
                        name="password"
                        value={employeeData.password}
                        onChange={handleInputChange}
                      />
                      <div class="invalid-feedback">Please enter an Link.</div>
                    </div>
                    {/* <div class="mb-3">
                      <label for="phone-field" class="form-label">
                        Image
                      </label>
                      <input
                        type="file"
                        id="phone-field"
                        name="image"
                        className="form-control"
                        onChange={handleImageChange}
                        required
                      />
                      <div class="invalid-feedback">Please enter a image.</div>
                    </div> */}
                    <div class="mb-3">
                      <label for="date-field" class="form-label">
                        EmployeeRole
                      </label>
                      <select
                        class="form-control"
                        data-trigger=""
                        id="status-field"
                        name="employeeRole"
                        value={employeeData.employeeRole}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Employee Role</option>
                        <option value="SubAdmin">SubAdmin</option>
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
                        Add Employee
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal fade" id="editshowModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header bg-light p-3">
                  <h5 class="modal-title" id="exampleModalLabel">Update Employee</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="tablelist-form" autocomplete="off" onSubmit={(event) => handlePasswordUpdate(event, editingEmployeeId)}>
                  <div class="modal-body">
                    <div class="mb-3">
                      <label for="customername-field" class="form-label">New Password</label>
                      <input
                        type="password"
                        id="customername-field"
                        class="form-control"
                        placeholder="Enter New Password"
                        name="password"
                        value={employeeData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <div class="invalid-feedback">Please enter a new password</div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <div class="hstack gap-2 justify-content-end">
                      <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-success" id="add-btn">Update Password</button>
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

export default Employeerol;
