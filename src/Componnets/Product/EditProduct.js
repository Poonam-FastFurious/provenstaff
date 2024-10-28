import { Link, useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import axios from "axios";
import { Baseurl } from "../../config";
import { toast } from "react-toastify";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [error, setError] = useState("");
  const [productData, setProductData] = useState(null);
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [thumbnailPreviews, setThumbnailPreviews] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const [discount, setDiscount] = useState(); // State for calculated discount
  const [price, setPrice] = useState();
  const [cutPrice, setCutPrice] = useState();
  const [flipkarturl, setFlipkarturl] = useState("");
  const [amazonurl, setAmazonurl] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(Baseurl + "/api/v1/category/allcategory")
      .then((response) => response.json())
      .then((jsonData) => setCategory(jsonData.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    axios
      .get(`${Baseurl}/api/v1/Product/product?id=${id}`)
      .then((response) => {
        if (response.data.success) {
          const product = response.data.product;
          setProductData(product);
          setDescription(product.description || "");
          setImagePreview(product.image || null);
          setThumbnailPreviews(product.thumbnail || []);
          setFlipkarturl(product.flipkarturl || ""); // Set flipkarturl
          setAmazonurl(product.amazonurl || ""); // Set amazonurl
          setBannerPreviews(product.banners || []);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the product data!", error);
      });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        if (img.width === 1280 && img.height === 1280) {
          setImagePreview(URL.createObjectURL(file));
          setError("");
        } else {
          setError("Please upload an image of size 1280x1280 pixels.");
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleThumbnailChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    let errorMessage = "";

    files.forEach((file) => {
      const img = new Image();
      img.onload = () => {
        if (img.width === 1280 && img.height === 1280) {
          validFiles.push(URL.createObjectURL(file));
        } else {
          errorMessage =
            "One or more thumbnails do not meet the 1280x1280 size requirement.";
        }

        // Update state after processing all files
        if (validFiles.length === files.length) {
          setThumbnailPreviews(validFiles);
          setError("");
        } else {
          setError(errorMessage);
        }
      };
      img.src = URL.createObjectURL(file);
    });
  };
  const handleBannerChange = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => URL.createObjectURL(file)); // Create object URLs for preview
    setBannerPreviews(previews);
  };
  const calculateDiscount = (price, cutPrice) => {
    const calculatedDiscount =
      cutPrice > 0 ? ((cutPrice - price) / cutPrice) * 100 : 0;
    setDiscount(calculatedDiscount.toFixed(2));
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value) || 0;
    setPrice(newPrice);
    calculateDiscount(newPrice, cutPrice);
  };

  const handleCutPriceChange = (e) => {
    const newCutPrice = parseFloat(e.target.value) || 0;
    setCutPrice(newCutPrice);
    calculateDiscount(price, newCutPrice);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("id", productData._id);
    formData.append("title", event.target.title?.value || "");
    formData.append("description", description);
    formData.append("stocks", event.target.stocks?.value || 0);
    formData.append("price", price);
    formData.append(
      "youtubeVideoLink",
      event.target.youtubeVideoLink?.value || ""
    );
    formData.append("discount", discount);
    formData.append(
      "shortDescription",
      event.target.shortDescription?.value || ""
    );
    formData.append("cutPrice", cutPrice);
    formData.append("categories", event.target.categories?.value || "");
    formData.append("amazonurl", amazonurl);
    formData.append("flipkarturl", flipkarturl);
    const imageInput = document.getElementById("product-image-input");
    if (imageInput.files.length > 0) {
      formData.append("image", imageInput.files[0]);
    }

    const thumbnailInput = document.getElementById("product-thumbnail-input");
    for (let i = 0; i < thumbnailInput.files.length; i++) {
      formData.append("thumbnail", thumbnailInput.files[i]);
    }
    const bannerInput = document.getElementById("product-banner-input");
    for (let i = 0; i < bannerInput.files.length; i++) {
      formData.append("banners", bannerInput.files[i]); // Append each banner file
    }

    axios
      .patch(Baseurl + "/api/v1/Product/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("Product updated successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              navigate("/Product");
            },
          });
        } setLoading(false); 
      })
      .catch((error) => {
        console.error("There was an error updating the product!", error);
        setLoading(false); 
      });
  };

  if (!productData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Edit Product</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">Proven Ro</Link>
                      </li>
                      <li className="breadcrumb-item active">Edit Product</li>
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
              onSubmit={handleFormSubmit}
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
                          Product ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          name="id"
                          defaultValue={id}
                          readOnly
                        />
                        <div className="invalid-feedback">
                          Please Enter a product title.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Product Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          name="title"
                          defaultValue={productData.title}
                        />
                        <div className="invalid-feedback">
                          Please Enter a product title.
                        </div>
                      </div>
                      <div>
                        <label>Product Description</label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={productData.description}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescription(data);
                          }}
                        />
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
                            <div className="position-absolute top-100 start-100 translate-middle">
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
                                className="form-control d-none"
                                id="product-image-input"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleImageChange}
                              />
                              {error && (
                                <div style={{ color: "red" }}>{error}</div>
                              )}
                            </div>
                            {productData.image && (
                              <ul
                                className="list-unstyled mb-0"
                                id="dropzone-preview"
                              >
                                <li className="mt-2" id="dropzone-preview-list">
                                  <div className="border rounded">
                                    <div className="d-flex p-2">
                                      <div className="flex-shrink-0 me-3">
                                        <div className="avatar-sm bg-light rounded">
                                          {imagePreview && (
                                            <div className="mt-2">
                                              <img
                                                src={imagePreview}
                                                alt="Selected"
                                                style={{
                                                  width: "300px",
                                                  height: "auto",
                                                }}
                                                className="img-fluid rounded d-block"
                                              />
                                            </div>
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
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h5 className="fs-14 mb-1">Product Thumbnail</h5>
                        <p className="text-muted">Add Product thumbnail.</p>
                        <div className="text-center">
                          <div className="position-relative d-inline-block">
                            <div className="position-absolute top-100 start-100 translate-middle">
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
                                className="form-control  d-none"
                                id="product-thumbnail-input"
                                type="file"
                                multiple
                                onChange={handleThumbnailChange}
                              />{" "}
                              {error && (
                                <div style={{ color: "red" }}>{error}</div>
                              )}
                            </div>
                          </div>
                        </div>
                        {productData.thumbnail.length > 0 && (
                          <ul
                            className="list-unstyled mb-0  d-flex"
                            id="gallery-preview"
                          >
                            {thumbnailPreviews.map((file, index) => (
                              <li
                                key={index}
                                className="mt-2"
                                id="gallery-preview-list"
                              >
                                <div className="border rounded">
                                  <div className="d-flex p-2">
                                    <img
                                      src={file}
                                      alt={`Thumbnail ${index}`}
                                      style={{ width: "100px", height: "auto" }}
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
                            <div className="position-absolute top-100 start-100 translate-middle">
                              <label
                                htmlFor="product-banner-input"
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
                                className="form-control  d-none"
                                id="product-banner-input"
                                type="file"
                                multiple
                                onChange={handleBannerChange}
                              />{" "}
                              {error && (
                                <div style={{ color: "red" }}>{error}</div>
                              )}
                            </div>
                          </div>
                        </div>
                        {productData.banners.length > 0 && (
                          <ul
                            className="list-unstyled mb-0  d-flex"
                            id="gallery-preview"
                          >
                            {bannerPreviews.map((file, index) => (
                              <li
                                key={index}
                                className="mt-2"
                                id="gallery-preview-list"
                              >
                                <div className="border rounded">
                                  <div className="d-flex p-2">
                                    <img
                                      src={file}
                                      alt={`Thumbnail ${index}`}
                                      style={{ width: "100px", height: "auto" }}
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
                              className={`form-control `}
                              placeholder="Enter Url"
                              type="text"
                              name="youtubeVideoLink"
                              defaultValue={productData.youtubeVideoLink}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="mb-3">
                            <label className="form-label">Flipkart Link</label>
                            <input
                              type="text"
                              className={`form-control `}
                              placeholder="Enter flipkarturl"
                              name="flipkarturl"
                              defaultValue={productData.flipkarturl}
                              onChange={(e) => setFlipkarturl(e.target.value)}

                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                          <div className="mb-3">
                            <label className="form-label">Amazon Link</label>
                            <input
                              type="text"
                              className={`form-control `}
                              placeholder="Enter tags"
                              name="amazonurl"
                              defaultValue={productData.amazonurl}
                              onChange={(e) => setAmazonurl(e.target.value)}
                            />
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
                                  className={`form-select `}
                                  id="choices-category-input"
                                  name="categories"
                                  defaultValue={productData.categories}
                                  //
                                  data-choices=""
                                  data-choices-search-false=""
                                  required
                                >
                                  <option>select </option>
                                  {category.map((cat) => (
                                    <option
                                      key={cat._id}
                                      value={cat.categoriesTitle}
                                    >
                                      {cat.categoriesTitle}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Product Tags
                                </label>
                                <input
                                  type="text"
                                  className={`form-control `}
                                  placeholder="Enter tags"
                                  name="tags"
                                  defaultValue={productData.tags}
                                />
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">MRP</label>
                                <input
                                  type="number"
                                  className={`form-control `}
                                  placeholder="Enter cut price"
                                  name="cutPrice"
                                  value={cutPrice}
                                  onChange={handleCutPriceChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Product Price
                                </label>
                                <input
                                  type="number"
                                  className={`form-control `}
                                  placeholder="Enter price"
                                  name="price"
                                  value={price}
                                  onChange={handlePriceChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Product Discount
                                </label>
                                <input
                                  type="number"
                                  className={`form-control `}
                                  placeholder="Enter discount"
                                  name="discount"
                                  value={discount} // Show the computed discount
                                  readOnly
                                />
                              </div>
                            </div>

                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Product SKU
                                </label>
                                <input
                                  type="text"
                                  className={`form-control `}
                                  placeholder="Enter SKU"
                                  name="sku"
                                  defaultValue={productData.sku}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">Stocks</label>
                                <input
                                  type="number"
                                  className={`form-control `}
                                  placeholder="Enter stocks quantity"
                                  name="stocks"
                                  defaultValue={productData.stocks}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Short Description
                                </label>
                                <textarea
                                  type="text"
                                  className={`form-control `}
                                  placeholder="Enter short description"
                                  name="shortDescription"
                                  defaultValue={productData.shortDescription}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-start mb-3">
                    <button type="submit" className="btn btn-success w-sm">
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

export default EditProduct;
