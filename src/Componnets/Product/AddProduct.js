import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { Baseurl } from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    cutPrice: "",
    categories: "",
    tags: "",
    sku: "",
    shortDescription: "",
    stocks: "",
    youtubeVideoLink: "",
    amazonurl: "",
    flipkarturl: "",
    image: null,
    thumbnail: [],
    banners: [],
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    // Fetch categories for the dropdown
    async function fetchCategories() {
      try {
        const response = await axios.get(
          Baseurl + "/api/v1/category/allcategory"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      const newState = { ...prevState, [name]: value };

      if (name === "price" || name === "cutPrice") {
        const price = parseFloat(newState.price) || 0;
        const cutPrice = parseFloat(newState.cutPrice) || 0;

        if (cutPrice > 0 && price > 0) {
          const discount = ((cutPrice - price) / cutPrice) * 100;
          newState.discount = discount.toFixed(2);
        } else {
          newState.discount = "";
        }
      }

      return newState;
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      if (name === "banners") {
        // Directly set the banners without checking dimensions
        setFormData((prevState) => ({
          ...prevState,
          banners: Array.from(files), // Allow multiple banner files
        }));
        if (errors[name]) {
          setErrors({
            ...errors,
            [name]: "",
          });
        }
      } else {
        // For other fields like image and thumbnail, check dimensions
        const file = files[0];
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (event) => {
          img.src = event.target.result;

          img.onload = () => {
            const width = img.width;
            const height = img.height;

            // Check dimensions only for thumbnails or images
            if (width === 1280 && height === 1280) {
              setFormData((prevState) => ({
                ...prevState,
                [name]: name === "thumbnail" ? Array.from(files) : file,
              }));
              if (errors[name]) {
                setErrors({
                  ...errors,
                  [name]: "",
                });
              }
            } else {
              setErrors({
                ...errors,
                [name]: "Image dimensions should be 1280x1280 pixels.",
              });
            }
          };
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCKEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      description: data,
    });
    if (errors.description) {
      setErrors({
        ...errors,
        description: "",
      });
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.discount) newErrors.discount = "Discount is required";
    if (!formData.cutPrice) newErrors.cutPrice = "Cut price is required";
    if (!formData.categories) newErrors.categories = "Category is required";
    if (!formData.tags) newErrors.tags = "Tags are required";
    if (!formData.sku) newErrors.sku = "SKU is required";
    if (!formData.shortDescription)
      newErrors.shortDescription = "Short description is required";
    if (!formData.stocks) newErrors.stocks = "Stock is required";
    if (!formData.youtubeVideoLink)
      newErrors.youtubeVideoLink = "YouTube video link is required";
    if (!formData.flipkarturl)
      newErrors.flipkarturl = "flipkarturl  link is required";
    if (!formData.amazonurl)
      newErrors.amazonurl = "amazonurl  link is required";
    if (!formData.image) newErrors.image = "Image is required";
    if (!formData.thumbnail || formData.thumbnail.length === 0)
      newErrors.thumbnail = "At least one thumbnail is required";
    if (!formData.banners || formData.banners.length === 0)
      newErrors.banners = "At least one banners is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("discount", formData.discount);
    data.append("cutPrice", formData.cutPrice);
    data.append("categories", formData.categories);
    data.append("tags", formData.tags);
    data.append("sku", formData.sku);
    data.append("shortDescription", formData.shortDescription);
    data.append("stocks", formData.stocks);
    data.append("youtubeVideoLink", formData.youtubeVideoLink);
    data.append("flipkarturl", formData.flipkarturl);
    data.append("amazonurl", formData.amazonurl);
    data.append("image", formData.image);

    if (formData.thumbnail && formData.thumbnail.length > 0) {
      formData.thumbnail.forEach((thumbnail) => {
        data.append("thumbnail", thumbnail);
      });
    }
    if (formData.banners && formData.banners.length > 0) {
      formData.banners.forEach((banners) => {
        data.append("banners", banners);
      });
    }
    try {
      const response = await fetch(Baseurl + "/api/v1/Product/add", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Product added successfully!");
        navigate("/Product");
      } else {
        // Display the backend error message
        toast.error(
          result.message || "An error occurred while adding the product.",
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Create Product</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">Proven Ro</Link>
                      </li>
                      <li className="breadcrumb-item active">Create Product</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <form
              id="createproduct-form"
              autoComplete="off"
              className="needs-validation"
              noValidate=""
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Product Title
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.title ? "is-invalid" : ""
                          }`}
                          id="product-title-input"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />{" "}
                        {errors.title && (
                          <div className="invalid-feedback">{errors.title}</div>
                        )}
                      </div>
                      <div>
                        <label>Product Description</label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={formData.description}
                          onChange={handleCKEditorChange}
                        />
                        {errors.description && (
                          <div className="invalid-feedback">
                            {errors.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Product Gallery</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-4">
                        <h5 className="fs-14 mb-1">Product Image</h5>
                        <p className="text-muted">Add Product main Image.</p>
                        <div className="text-center">
                          <div className="position-relative d-inline-block">
                            <label
                              htmlFor="product-image-input"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select Image"
                            >
                              <div className="avatar-xs">
                                <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                  <i className="ri-image-fill"></i>
                                </div>
                              </div>
                            </label>
                            <input
                              className={`form-control d-none ${
                                errors.image ? "is-invalid" : ""
                              }`}
                              id="product-image-input"
                              type="file"
                              accept="image/png, image/gif, image/jpeg"
                              name="image"
                              onChange={handleFileChange}
                            />
                            {errors.image && (
                              <div className="invalid-feedback">
                                {errors.image}
                              </div>
                            )}
                          </div>

                          <ul
                            className="list-unstyled mb-0"
                            id="dropzone-preview"
                          >
                            <li className="mt-2" id="dropzone-preview-list">
                              <div className="border rounded">
                                <div className="d-flex p-2">
                                  <div className="flex-shrink-0 me-3">
                                    <div className="avatar-sm bg-light rounded">
                                      {formData.image && (
                                        <img
                                          src={URL.createObjectURL(
                                            formData.image
                                          )}
                                          alt="Selected"
                                          style={{
                                            width: "300px",
                                            height: "auto",
                                          }}
                                          className="img-fluid rounded d-block"
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex-grow-1">
                                    <div className="pt-1">
                                      <h5
                                        className="fs-14 mb-1"
                                        data-dz-name=""
                                      >
                                        &nbsp;
                                      </h5>
                                      <p
                                        className="fs-13 text-muted mb-0"
                                        data-dz-size=""
                                      ></p>
                                      <strong
                                        className="error text-danger"
                                        data-dz-errormessage=""
                                      ></strong>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h5 className="fs-14 mb-1">Product Thumbnail</h5>
                        <p className="text-muted">Add Product thumbnail.</p>
                        <div className="text-center">
                          <div className="position-relative d-inline-block">
                            <label
                              htmlFor="product-thumbnail-input"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select Image"
                            >
                              <div className="avatar-xs">
                                <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                  <i className="ri-image-fill"></i>
                                </div>
                              </div>
                            </label>
                            <input
                              className={`form-control d-none ${
                                errors.thumbnail ? "is-invalid" : ""
                              }`}
                              id="product-thumbnail-input"
                              type="file"
                              multiple
                              name="thumbnail"
                              onChange={handleFileChange}
                            />
                            {errors.thumbnail && (
                              <div className="invalid-feedback">
                                {errors.thumbnail}
                              </div>
                            )}
                          </div>
                        </div>
                        {formData.thumbnail.length > 0 && (
                          <ul
                            className="list-unstyled mb-0  d-flex"
                            id="gallery-preview"
                          >
                            {formData.thumbnail.map((file, index) => (
                              <li
                                key={index}
                                className="mt-2"
                                id="gallery-preview-list"
                              >
                                <div className="border rounded">
                                  <div className="d-flex p-2">
                                    <img
                                      src={
                                        file instanceof File
                                          ? URL.createObjectURL(file)
                                          : file
                                      }
                                      alt={`Thumbnail ${index}`}
                                      style={{
                                        width: "100px",
                                        height: "auto",
                                      }}
                                    />
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="mb-4">
                        <h5 className="fs-14 mb-1">Product Banners</h5>
                        <p className="text-muted">Add Product Banners.</p>
                        <div className="text-center">
                          <div className="position-relative d-inline-block">
                            <label
                              htmlFor="product-banners-input"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select Image"
                            >
                              <div className="avatar-xs">
                                <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                  <i className="ri-image-fill"></i>
                                </div>
                              </div>
                            </label>
                            <input
                              className={`form-control d-none ${
                                errors.banners ? "is-invalid" : ""
                              }`}
                              id="product-banners-input"
                              type="file"
                              multiple
                              name="banners"
                              onChange={handleFileChange}
                            />
                            {errors.banners && (
                              <div className="invalid-feedback">
                                {errors.banners}
                              </div>
                            )}
                          </div>
                        </div>
                        {formData.banners.length > 0 && (
                          <ul
                            className="list-unstyled mb-0  d-flex"
                            id="gallery-preview"
                          >
                            {formData.banners.map((file, index) => (
                              <li
                                key={index}
                                className="mt-2"
                                id="gallery-preview-list"
                              >
                                <div className="border rounded">
                                  <div className="d-flex p-2">
                                    <img
                                      src={
                                        file instanceof File
                                          ? URL.createObjectURL(file)
                                          : file
                                      }
                                      alt={`Thumbnail ${index}`}
                                      style={{
                                        width: "100px",
                                        height: "auto",
                                      }}
                                    />
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Product Link</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-3 col-sm-6">
                          <div className="mb-3">
                            <label className="form-label">VideoUrl </label>
                            <input
                              className={`form-control ${
                                errors.youtubeVideoLink ? "is-invalid" : ""
                              }`}
                              placeholder="Enter Url"
                              type="text"
                              name="youtubeVideoLink"
                              value={formData.youtubeVideoLink}
                              onChange={handleChange}
                            />
                            {errors.youtubeVideoLink && (
                              <div className="invalid-feedback">
                                {errors.youtubeVideoLink}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="mb-3">
                            <label className="form-label">Flipkart Link</label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors.tags ? "is-invalid" : ""
                              }`}
                              placeholder="Enter flipkarturl"
                              name="flipkarturl"
                              value={formData.flipkarturl}
                              onChange={handleChange}
                            />
                            {errors.flipkarturl && (
                              <div className="invalid-feedback">
                                {errors.flipkarturl}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="mb-3">
                            <label className="form-label">Amazon Link</label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors.amazonurl ? "is-invalid" : ""
                              }`}
                              placeholder="Enter tags"
                              name="amazonurl"
                              value={formData.amazonurl}
                              onChange={handleChange}
                            />
                            {errors.amazonurl && (
                              <div className="invalid-feedback">
                                {errors.amazonurl}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <ul
                        className="nav nav-tabs-custom card-header-tabs border-bottom-0"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <Link
                            className="nav-link active"
                            data-bs-toggle="tab"
                            to="#addproduct-general-info"
                            role="tab"
                          >
                            General Info
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <div className="tab-content">
                        <div
                          className="tab-pane active"
                          id="addproduct-general-info"
                          role="tabpanel"
                        >
                          <div className="row">
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Product Category
                                </label>
                                <select
                                  className={`form-select ${
                                    errors.categories ? "is-invalid" : ""
                                  }`}
                                  id="choices-category-input"
                                  name="categories"
                                  value={formData.categories}
                                  onChange={handleChange}
                                  data-choices=""
                                  data-choices-search-false=""
                                >
                                  <option>select </option>
                                  {categories.map((cat) => (
                                    <option
                                      key={cat._id}
                                      value={cat.categoriesTitle}
                                    >
                                      {cat.categoriesTitle}
                                    </option>
                                  ))}
                                </select>
                                {errors.categories && (
                                  <div className="invalid-feedback">
                                    {errors.categories}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Product Tags
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.tags ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter tags"
                                  name="tags"
                                  value={formData.tags}
                                  onChange={handleChange}
                                />
                                {errors.tags && (
                                  <div className="invalid-feedback">
                                    {errors.tags}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">MRP</label>
                                <input
                                  type="number"
                                  className={`form-control ${
                                    errors.cutPrice ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter cut price"
                                  name="cutPrice"
                                  value={formData.cutPrice}
                                  onChange={handleChange}
                                />
                                {errors.cutPrice && (
                                  <div className="invalid-feedback">
                                    {errors.cutPrice}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Product Price
                                </label>
                                <input
                                  type="number"
                                  className={`form-control ${
                                    errors.price ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter price"
                                  name="price"
                                  value={formData.price}
                                  onChange={handleChange}
                                />
                                {errors.price && (
                                  <div className="invalid-feedback">
                                    {errors.price}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Product Discount
                                </label>
                                <input
                                  readOnly
                                  type="number"
                                  className={`form-control ${
                                    errors.discount ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter discount"
                                  name="discount"
                                  value={formData.discount}
                                  onChange={handleChange}
                                />
                                {errors.discount && (
                                  <div className="invalid-feedback">
                                    {errors.discount}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Product SKU
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.sku ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter SKU"
                                  name="sku"
                                  value={formData.sku}
                                  onChange={handleChange}
                                />
                                {errors.sku && (
                                  <div className="invalid-feedback">
                                    {errors.sku}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">Stocks</label>
                                <input
                                  type="number"
                                  className={`form-control ${
                                    errors.stocks ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter stocks quantity"
                                  name="stocks"
                                  value={formData.stocks}
                                  onChange={handleChange}
                                />
                                {errors.stocks && (
                                  <div className="invalid-feedback">
                                    {errors.stocks}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Short Description
                                </label>
                                <textarea
                                  type="text"
                                  className={`form-control ${
                                    errors.shortDescription ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter short description"
                                  name="shortDescription"
                                  value={formData.shortDescription}
                                  onChange={handleChange}
                                />
                                {errors.shortDescription && (
                                  <div className="invalid-feedback">
                                    {errors.shortDescription}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-strat">
                    <button type="submit" className="btn btn-primary">
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
