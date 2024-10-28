// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import axios from "axios";
// import { Baseurl } from "../config";

// function AddProduct() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: null,
//     thumbnails: [],
//     youtubeVideoLink: "",
//     selectedCategory: "",
//     tags: "",
//     price: "",
//     discount: "",
//     cutPrice: "",
//     sku: "",
//     stocks: "",
//     shortDescription: "",
//   });
//   const [categories, setCategories] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Fetch categories for the dropdown
//     async function fetchCategories() {
//       try {
//         const response = await axios.get(
//           Baseurl + "/api/v1/category/allcategory"
//         );
//         setCategories(response.data.data);
//       } catch (error) {
//         console.error("Error fetching categories", error);
//       }
//     }
//     fetchCategories();
//   }, []);

//   const handleChange = (event) => {
//     const { name, value, type, files } = event.target;
//     if (type === "file") {
//       if (name === "image") {
//         setFormData({ ...formData, image: files[0] });
//       } else if (name === "thumbnails") {
//         setFormData({ ...formData, thumbnails: [...files] });
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setFormData({ ...formData, description: data });
//   };

//   const handleCategoryChange = (event) => {
//     setFormData({ ...formData, selectedCategory: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       if (Array.isArray(formData[key])) {
//         formData[key].forEach((file, index) =>
//           formDataToSend.append(`${key}[${index}]`, file)
//         );
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }
//     }

//     try {
//       await axios.post(Baseurl + "/api/v1/product/add", formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       // Handle success, e.g., show a success message or redirect
//     } catch (error) {
//       // Handle errors, e.g., set error messages
//       console.error("Error adding product", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="main-content">
//         <div className="page-content">
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-12">
//                 <div className="page-title-box d-sm-flex align-items-center justify-content-between">
//                   <h4 className="mb-sm-0">Create Product</h4>
//                   <div className="page-title-right">
//                     <ol className="breadcrumb m-0">
//                       <li className="breadcrumb-item">
//                         <Link to="#">Proven Ro</Link>
//                       </li>
//                       <li className="breadcrumb-item active">Create Product</li>
//                     </ol>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <form
//               id="createproduct-form"
//               autoComplete="off"
//               className="needs-validation"
//               noValidate=""
//               encType="multipart/form-data"
//               onSubmit={handleSubmit}
//             >
//               <div className="row">
//                 <div className="col-lg-12">
//                   <div className="card">
//                     <div className="card-body">
//                       <div className="mb-3">
//                         <label
//                           className="form-label"
//                           htmlFor="product-title-input"
//                         >
//                           Product Title
//                         </label>
//                         <input
//                           type="text"
//                           className={`form-control ${
//                             errors.title ? "is-invalid" : ""
//                           }`}
//                           id="product-title-input"
//                           name="title"
//                           value={formData.title}
//                           onChange={handleChange}
//                         />
//                         {errors.title && (
//                           <div className="invalid-feedback">{errors.title}</div>
//                         )}
//                       </div>
//                       <div>
//                         <label>Product Description</label>
//                         <CKEditor
//                           editor={ClassicEditor}
//                           data={formData.description}
//                           onChange={handleEditorChange}
//                         />
//                         {errors.description && (
//                           <div className="invalid-feedback d-block">
//                             {errors.description}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="card">
//                     <div className="card-header">
//                       <h5 className="card-title mb-0">Product Gallery</h5>
//                     </div>
//                     <div className="card-body">
//                       <div className="mb-4">
//                         <h5 className="fs-14 mb-1">Product Image</h5>
//                         <p className="text-muted">Add Product main Image.</p>
//                         <div className="text-center">
//                           <div className="position-relative d-inline-block">
//                             <label
//                               htmlFor="product-image-input"
//                               className="mb-0"
//                               data-bs-toggle="tooltip"
//                               data-bs-placement="right"
//                               title="Select Image"
//                             >
//                               <div className="avatar-xs">
//                                 <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
//                                   <i className="ri-image-fill"></i>
//                                 </div>
//                               </div>
//                             </label>
//                             <input
//                               className={`form-control d-none ${
//                                 errors.image ? "is-invalid" : ""
//                               }`}
//                               id="product-image-input"
//                               type="file"
//                               accept="image/png, image/gif, image/jpeg"
//                               name="image"
//                               onChange={handleChange}
//                             />
//                             {errors.image && (
//                               <div className="invalid-feedback d-block">
//                                 {errors.image}
//                               </div>
//                             )}
//                           </div>
//                           {formData.image && (
//                             <ul
//                               className="list-unstyled mb-0"
//                               id="dropzone-preview"
//                             >
//                               <li className="mt-2" id="dropzone-preview-list">
//                                 <div className="border rounded">
//                                   <div className="d-flex p-2">
//                                     <div className="flex-shrink-0 me-3">
//                                       <div className="avatar-sm bg-light rounded">
//                                         <img
//                                           src={URL.createObjectURL(
//                                             formData.image
//                                           )}
//                                           alt="Selected"
//                                           style={{
//                                             width: "300px",
//                                             height: "auto",
//                                           }}
//                                           className="img-fluid rounded d-block"
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="flex-grow-1">
//                                       <div className="pt-1">
//                                         <h5
//                                           className="fs-14 mb-1"
//                                           data-dz-name=""
//                                         >
//                                           &nbsp;
//                                         </h5>
//                                         <p
//                                           className="fs-13 text-muted mb-0"
//                                           data-dz-size=""
//                                         ></p>
//                                         <strong
//                                           className="error text-danger"
//                                           data-dz-errormessage=""
//                                         ></strong>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </li>
//                             </ul>
//                           )}
//                         </div>
//                       </div>
//                       <div className="mb-4">
//                         <h5 className="fs-14 mb-1">Product Thumbnail</h5>
//                         <p className="text-muted">Add Product thumbnail.</p>
//                         <div className="text-center">
//                           <div className="position-relative d-inline-block">
//                             <label
//                               htmlFor="product-thumbnail-input"
//                               className="mb-0"
//                               data-bs-toggle="tooltip"
//                               data-bs-placement="right"
//                               title="Select Image"
//                             >
//                               <div className="avatar-xs">
//                                 <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
//                                   <i className="ri-image-fill"></i>
//                                 </div>
//                               </div>
//                             </label>
//                             <input
//                               className={`form-control d-none ${
//                                 errors.thumbnails ? "is-invalid" : ""
//                               }`}
//                               id="product-thumbnail-input"
//                               type="file"
//                               multiple
//                               name="thumbnails"
//                               onChange={handleChange}
//                             />
//                             {errors.thumbnails && (
//                               <div className="invalid-feedback d-block">
//                                 {errors.thumbnails}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="card">
//                     <div className="card-body">
//                       <div className="row">
//                         <div className="col-md-6 mb-3">
//                           <label
//                             className="form-label"
//                             htmlFor="product-price-input"
//                           >
//                             Price
//                           </label>
//                           <input
//                             type="text"
//                             className={`form-control ${
//                               errors.price ? "is-invalid" : ""
//                             }`}
//                             id="product-price-input"
//                             name="price"
//                             value={formData.price}
//                             onChange={handleChange}
//                           />
//                           {errors.price && (
//                             <div className="invalid-feedback">
//                               {errors.price}
//                             </div>
//                           )}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label
//                             className="form-label"
//                             htmlFor="product-discount-input"
//                           >
//                             Discount
//                           </label>
//                           <input
//                             type="text"
//                             className={`form-control ${
//                               errors.discount ? "is-invalid" : ""
//                             }`}
//                             id="product-discount-input"
//                             name="discount"
//                             value={formData.discount}
//                             onChange={handleChange}
//                           />
//                           {errors.discount && (
//                             <div className="invalid-feedback">
//                               {errors.discount}
//                             </div>
//                           )}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label
//                             className="form-label"
//                             htmlFor="product-cut-price-input"
//                           >
//                             Cut Price
//                           </label>
//                           <input
//                             type="text"
//                             className={`form-control ${
//                               errors.cutPrice ? "is-invalid" : ""
//                             }`}
//                             id="product-cut-price-input"
//                             name="cutPrice"
//                             value={formData.cutPrice}
//                             onChange={handleChange}
//                           />
//                           {errors.cutPrice && (
//                             <div className="invalid-feedback">
//                               {errors.cutPrice}
//                             </div>
//                           )}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label
//                             className="form-label"
//                             htmlFor="product-sku-input"
//                           >
//                             SKU
//                           </label>
//                           <input
//                             type="text"
//                             className={`form-control ${
//                               errors.sku ? "is-invalid" : ""
//                             }`}
//                             id="product-sku-input"
//                             name="sku"
//                             value={formData.sku}
//                             onChange={handleChange}
//                           />
//                           {errors.sku && (
//                             <div className="invalid-feedback">{errors.sku}</div>
//                           )}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label
//                             className="form-label"
//                             htmlFor="product-stocks-input"
//                           >
//                             Stocks
//                           </label>
//                           <input
//                             type="text"
//                             className={`form-control ${
//                               errors.stocks ? "is-invalid" : ""
//                             }`}
//                             id="product-stocks-input"
//                             name="stocks"
//                             value={formData.stocks}
//                             onChange={handleChange}
//                           />
//                           {errors.stocks && (
//                             <div className="invalid-feedback">
//                               {errors.stocks}
//                             </div>
//                           )}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label
//                             className="form-label"
//                             htmlFor="product-category-select"
//                           >
//                             Category
//                           </label>
//                           <select
//                             className={`form-select ${
//                               errors.selectedCategory ? "is-invalid" : ""
//                             }`}
//                             id="product-category-select"
//                             name="selectedCategory"
//                             value={formData.selectedCategory}
//                             onChange={handleCategoryChange}
//                           >
//                             <option value="">Select Category</option>
//                             {categories.map((category) => (
//                               <option key={category._id} value={category._id}>
//                                 {category.name}
//                               </option>
//                             ))}
//                           </select>
//                           {errors.selectedCategory && (
//                             <div className="invalid-feedback">
//                               {errors.selectedCategory}
//                             </div>
//                           )}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label
//                             className="form-label"
//                             htmlFor="product-tags-input"
//                           >
//                             Tags
//                           </label>
//                           <input
//                             type="text"
//                             className={`form-control ${
//                               errors.tags ? "is-invalid" : ""
//                             }`}
//                             id="product-tags-input"
//                             name="tags"
//                             value={formData.tags}
//                             onChange={handleChange}
//                           />
//                           {errors.tags && (
//                             <div className="invalid-feedback">
//                               {errors.tags}
//                             </div>
//                           )}
//                         </div>
//                         <div className="col-md-12 mb-3">
//                           <label
//                             className="form-label"
//                             htmlFor="product-short-description-input"
//                           >
//                             Short Description
//                           </label>
//                           <input
//                             type="text"
//                             className={`form-control ${
//                               errors.shortDescription ? "is-invalid" : ""
//                             }`}
//                             id="product-short-description-input"
//                             name="shortDescription"
//                             value={formData.shortDescription}
//                             onChange={handleChange}
//                           />
//                           {errors.shortDescription && (
//                             <div className="invalid-feedback">
//                               {errors.shortDescription}
//                             </div>
//                           )}
//                         </div>
//                         <div className="col-md-12 mb-3">
//                           <label
//                             className="form-label"
//                             htmlFor="product-youtube-input"
//                           >
//                             Youtube Video Link
//                           </label>
//                           <input
//                             type="url"
//                             className={`form-control ${
//                               errors.youtubeVideoLink ? "is-invalid" : ""
//                             }`}
//                             id="product-youtube-input"
//                             name="youtubeVideoLink"
//                             value={formData.youtubeVideoLink}
//                             onChange={handleChange}
//                           />
//                           {errors.youtubeVideoLink && (
//                             <div className="invalid-feedback">
//                               {errors.youtubeVideoLink}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-footer text-end">
//                       <button
//                         type="submit"
//                         className="btn btn-primary"
//                         disabled={loading}
//                       >
//                         {loading ? "Submitting..." : "Submit"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddProduct;
