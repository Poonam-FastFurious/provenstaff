// import React, { useEffect, useState } from "react";

// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Baseurl } from "../../config";
// import Swal from "sweetalert2";

// function Addon() {
//   // State to manage form inputs and messages
//   const [addons, setAddons] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [status, setStatus] = useState("");

//   const [editAddon, setEditAddon] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [editPrice, setEditPrice] = useState("");
//   const [editStatus, setEditStatus] = useState("");

//   useEffect(() => {
//     fetchAddons();
//   }, []);

//   const fetchAddons = async () => {
//     try {
//       const response = await fetch(Baseurl + "/api/v1/addons/alladdons");
//       if (response.ok) {
//         const data = await response.json();
//         setAddons(data.data);
//       } else {
//         console.log("Failed to fetch addons.");
//       }
//     } catch (error) {
//       console.log("Failed to fetch addons.", error);
//     }
//   };

//   const handleAddAddon = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const response = await fetch(Baseurl + "/api/v1/addons/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, price, status }),
//       });
//       if (response.ok) {
//         toast.success("addon add   successfully!");
//         const modalElement = document.getElementById("showModal");
//         const modal = window.bootstrap.Modal.getInstance(modalElement);
//         modal.hide();
//         setName("");
//         setPrice("");
//         setStatus("");
//         fetchAddons();
//       } else {
//         console.log("Failed to add addon. Please try again.");
//       }
//     } catch (error) {
//       console.log("Failed to add addon. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleDelete = async (id) => {
//     // Display confirmation dialog using SweetAlert2
//     const confirmation = await Swal.fire({
//       title: "Are you sure?",
//       text: "You will not be able to recover this addon!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     // If user confirms deletion
//     if (confirmation.isConfirmed) {
//       try {

//         const response = await fetch(Baseurl + "/api/v1/addons/delete", {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ id }),
//         });
//         if (response.ok) {
//           Swal.fire({
//             title: "Deleted!",
//             text: "Addon has been deleted.",
//             icon: "success",
//             timer: 1500,
//             showConfirmButton: false,
//           });
//           // Remove the deleted addon from state
//           setAddons(addons.filter((addon) => addon._id !== id));
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Failed to delete addon. Please try again.",
//           });
//         }
//       } catch (error) {
//         console.log("Failed to delete addon. Please try again.", error);
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Failed to delete addon. Please try again.",
//         });
//       }
//     }
//   };

//   const handleEdit = (addon) => {
//     setEditAddon(addon);
//     setEditName(addon.name);
//     setEditPrice(addon.price);
//     setEditStatus(addon.status);
//     // Open the edit modal
//     const modalElement = document.getElementById("editModal");
//     const modal = window.bootstrap.Modal.getInstance(modalElement);
//     modal.show();
//   };

//   const handleUpdateAddon = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const response = await fetch(Baseurl + "/api/v1/addons/update", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id: editAddon._id,
//           name: editName,
//           price: editPrice,
//           status: editStatus,
//         }),
//       });
//       if (response.ok) {
//         toast.success("Addon updated successfully!");
//         const modalElement = document.getElementById("editModal");
//         const modal = window.bootstrap.Modal.getInstance(modalElement);
//         modal.hide();
//         fetchAddons();
//       } else {
//         console.log("Failed to update addon. Please try again.");
//       }
//     } catch (error) {
//       console.log("Failed to update addon. Please try again.", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const filteredAddons = addons.filter((addon) =>
//     addon.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   return (
//     <>

//       <div class="main-content">
//         <div class="page-content">
//           <div class="container-fluid">
//             <div class="row">
//               <div class="col-12">
//                 <div class="page-title-box d-sm-flex align-items-center justify-content-between">
//                   <h4 class="mb-sm-0">Add Addons</h4>

//                   <div class="page-title-right">
//                     <ol class="breadcrumb m-0">
//                       <li class="breadcrumb-item">
//                         <Link to="#">Proven Ro</Link>
//                       </li>
//                       <li class="breadcrumb-item active">Add </li>
//                     </ol>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div class="row">
//               <div class="col-lg-12">
//                 <div class="card">
//                   <div class="card-body">
//                     <div class="listjs-table" id="customerList">
//                       <div class="row g-4 mb-3">
//                         <div class="col-sm-auto">
//                           <div>
//                             <button
//                               type="button"
//                               class="btn btn-success add-btn"
//                               data-bs-toggle="modal"
//                               id="create-btn"
//                               data-bs-target="#showModal"
//                             >
//                               <i class="ri-add-line align-bottom me-1"></i> Add
//                             </button>

//                           </div>
//                         </div>
//                         <div class="col-sm">
//                           <div class="d-flex justify-content-sm-end">
//                             <div class="search-box ms-2">
//                               <input
//                                 type="text"
//                                 class="form-control search"
//                                 placeholder="Search add on..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                               />
//                               <i class="ri-search-line search-icon"></i>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div class="table-responsive table-card mt-3 mb-1">
//                         <table
//                           class="table align-middle table-nowrap"
//                           id="customerTable"
//                         >
//                           <thead class="table-light">
//                             <tr>

//                               <th class="sort" data-sort="customer_name">
//                                 Name
//                               </th>
//                               <th class="sort" data-sort="email">
//                                 Price
//                               </th>

//                               <th class="sort" data-sort="date">
//                                 Status
//                               </th>

//                               <th class="sort" data-sort="action">
//                                 Action
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody class="list form-check-all">
//                             {filteredAddons.length > 0 ? (filteredAddons.map((addon) => (
//                               <tr key={addon.id}>

//                                 <td className="email">{addon.name}</td>
//                                 <td className="date">{addon.price}</td>
//                                 <td className="status">
//                                   <span
//                                     className={`badge bg-success-subtle text-success text-uppercase`}
//                                   >
//                                     {addon.status}
//                                   </span>
//                                 </td>
//                                 <td>
//                                   <div className="d-flex gap-2">
//                                     <div className="edit">
//                                       <button
//                                         className="btn btn-sm btn-success edit-item-btn"
//                                         data-bs-toggle="modal"
//                                         data-bs-target="#editModal"
//                                         onClick={() => handleEdit(addon)}
//                                       >
//                                         Edit
//                                       </button>
//                                     </div>
//                                     <div className="remove">
//                                       <button
//                                         className="btn btn-sm btn-danger remove-item-btn"
//                                         onClick={() => handleDelete(addon._id)}
//                                       >
//                                         Remove
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ))) : (<tr>
//                               <td colSpan="6" class="text-center">
//                                 <div class="noresult" >
//                                   <div class="text-center">
//                                     <lord-icon
//                                       src="../../../msoeawqm.json"
//                                       trigger="loop"
//                                       colors="primary:#121331,secondary:#08a88a"
//                                       style={{ width: "75px", height: "75px" }}
//                                     ></lord-icon>
//                                     <h5 class="mt-2">Sorry! No Result Found</h5>
//                                     <p class="text-muted mb-0">
//                                       We've searched more than 150+ Orders We did not
//                                       find any orders for you search.
//                                     </p>
//                                   </div>
//                                 </div>
//                               </td>
//                             </tr>)}
//                           </tbody>
//                         </table>

//                       </div>


//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div
//             class="modal fade"
//             id="showModal"
//             tabindex="-1"
//             aria-labelledby="exampleModalLabel"
//             aria-hidden="true"
//           >
//             <div class="modal-dialog modal-dialog-centered">
//               <div class="modal-content">
//                 <div class="modal-header bg-light p-3">
//                   <h5 class="modal-title" id="exampleModalLabel">
//                     Add Addons
//                   </h5>
//                   <button
//                     type="button"
//                     class="btn-close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                     id="close-modal"
//                   ></button>
//                 </div>
//                 <form
//                   class="tablelist-form"
//                   autocomplete="off"
//                   onSubmit={handleAddAddon}
//                 >
//                   <div class="modal-body">
//                     <div class="mb-3" id="modal-id" style={{ display: "none" }}>
//                       <label for="id-field" class="form-label">
//                         ID
//                       </label>
//                       <input
//                         type="text"
//                         id="id-field"
//                         class="form-control"
//                         placeholder="ID"
//                         readonly=""
//                       />
//                     </div>

//                     <div class="mb-3">
//                       <label for="customername-field" class="form-label">
//                         Name
//                       </label>
//                       <input
//                         type="text"
//                         id="customername-field"
//                         class="form-control"
//                         placeholder="Enter Title"
//                         required=""
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                       />
//                       <div class="invalid-feedback">Please enter a Title</div>
//                     </div>

//                     <div class="mb-3">
//                       <label for="email-field" class="form-label">
//                         Price
//                       </label>
//                       <input
//                         type="number"
//                         id="email-field"
//                         class="form-control"
//                         placeholder="Enter Link"
//                         required=""
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                       />
//                       <div class="invalid-feedback">Please enter an Link.</div>
//                     </div>

//                     <div>
//                       <label for="status-field" class="form-label">
//                         Status
//                       </label>
//                       <select
//                         class="form-control"
//                         data-trigger=""
//                         name="status-field"
//                         id="status-field"
//                         required=""
//                         value={status}
//                         onChange={(e) => setStatus(e.target.value)}
//                       >
//                         <option value="">Status</option>
//                         <option value="active">Active</option>
//                         <option value="inactive">Block</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div class="modal-footer">
//                     <div class="hstack gap-2 justify-content-end">
//                       <button
//                         type="button"
//                         class="btn btn-light"
//                         data-bs-dismiss="modal"
//                       >
//                         Close
//                       </button>
//                       <button
//                         type="submit"
//                         class="btn btn-success"
//                         id="add-btn"
//                       >
//                         Add addons
//                       </button>
//                       {loading && (
//                         <div className="loader">
//                           <div
//                             className="spinner-border text-primary"
//                             role="status"
//                           >
//                             <span className="visually-hidden">Loading...</span>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>

//           <div
//             className="modal fade"
//             id="editModal"
//             tabIndex="-1"
//             aria-labelledby="exampleModalLabel"
//             aria-hidden="true"
//           >
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header bg-light p-3">
//                   <h5 className="modal-title" id="exampleModalLabel">
//                     Update Addon
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   ></button>
//                 </div>
//                 <form className="tablelist-form" onSubmit={handleUpdateAddon}>
//                   <div className="modal-body">
//                     <div className="mb-3">
//                       <label
//                         htmlFor="customername-field"
//                         className="form-label"
//                       >
//                         Name
//                       </label>
//                       <input
//                         type="text"
//                         id="customername-field"
//                         className="form-control"
//                         placeholder="Enter Title"
//                         required
//                         value={editName}
//                         onChange={(e) => setEditName(e.target.value)}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter a Title
//                       </div>
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="email-field" className="form-label">
//                         Price
//                       </label>
//                       <input
//                         type="number"
//                         id="email-field"
//                         className="form-control"
//                         placeholder="Enter Link"
//                         required
//                         value={editPrice}
//                         onChange={(e) => setEditPrice(e.target.value)}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter a Link.
//                       </div>
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="status-field" className="form-label">
//                         Status
//                       </label>
//                       <select
//                         className="form-control"
//                         id="status-field"
//                         required
//                         value={editStatus}
//                         onChange={(e) => setEditStatus(e.target.value)}
//                       >
//                         <option value="">Status</option>
//                         <option value="active">Active</option>
//                         <option value="inactive">Inactive</option>
//                       </select>
//                       <div className="invalid-feedback">
//                         Please select a Status.
//                       </div>
//                     </div>
//                   </div>
//                   <div className="modal-footer">
//                     <div className="hstack gap-2 justify-content-end">
//                       <button
//                         type="button"
//                         className="btn btn-light"
//                         data-bs-dismiss="modal"
//                       >
//                         Close
//                       </button>
//                       <button type="submit" className="btn btn-success">
//                         Update Addon
//                       </button>
//                       {loading && (
//                         <div className="loader">
//                           <div
//                             className="spinner-border text-primary"
//                             role="status"
//                           >
//                             <span className="visually-hidden">Loading...</span>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Addon;
