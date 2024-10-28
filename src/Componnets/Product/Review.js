import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Baseurl } from "../../config";

function Review() {
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(Baseurl + "/api/v1/Product/products")
      .then((responce) => responce.json())
      .then((data) => setProducts(data.data));
  }, []);

  const handleReviewAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", name);
    formData.append("productName", productName);
    formData.append("rating", rating);
    formData.append("message", message);
    formData.append("email", email);

    try {
      const response = await fetch(Baseurl + "/api/v1/review/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("email id already exist");
      }

      const data = await response.json();
      if (data.success) {
        toast.success("Review submitted successfully", {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
        });
      } else {
        throw new Error("Review submission failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("email id already exist", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="col-xl-12 col-lg-8">
            <div>
              <div className="card">
                <div className="card-header border-0">
                  <div className="row g-4">
                    <div className="col-sm-auto">
                      <div>
                        <Link to="#" className="btn" id="addproduct-btn">
                          Add Review
                        </Link>
                      </div>
                    </div>
                    <div className="col-sm">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "white" }}>
            <form
              onSubmit={handleReviewSubmit}
              style={{
                paddingLeft: "50px",
                paddingRight: "50px",
                height: "100vh",
              }}
            >
              <div className="row" style={{ paddingTop: "10px" }}>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-0">avatar Image</h4>
                    </div>

                    <div className="card-body">
                      <input
                        type="file"
                        className="filepond filepond-input-multiple"
                        name="filepond"
                        data-allow-reorder="true"
                        data-max-file-size="3MB"
                        data-max-files="3"
                        onChange={handleReviewAvatarChange}
                      />
                    </div>
                  </div>
                  {avatar && (
                    <ul className="list-unstyled mb-0" id="dropzone-preview">
                      <li className="mt-2" id="dropzone-preview-list">
                        <div className="border rounded">
                          <div className="d-flex p-2">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar-sm bg-light rounded">
                                <img
                                  src={URL.createObjectURL(avatar)}
                                  alt="Selected"
                                  style={{
                                    width: "300px",
                                    height: "auto",
                                  }}
                                  className="img-fluid rounded d-block"
                                />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <div className="pt-1">
                                <h5 className="fs-14 mb-1" data-dz-name="">
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
              <div className="mb-3">
                <label htmlFor="employeeName" className="form-label">
                  email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="employeeName"
                  placeholder="Enter employee name"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="details" className="form-label">
                  name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="details"
                  placeholder="Enter details"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="link" className="form-label">
                  Message
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="link"
                  placeholder="Enter link"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              </div>
              <div className="col-lg-12 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <select
                    className={`form-select`}
                    id="choices-category-input"
                    name="categories"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    data-choices=""
                    data-choices-search-false=""
                  >
                    <option>select </option>
                    {products.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="link" className="form-label">
                  rating
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="rating"
                  placeholder="Enter rating"
                  onChange={(e) => {
                    let value = Number(e.target.value);
                    // Ensure the value is within 1 and 5
                    if (value < 0) value = 1;
                    if (value > 5) value = 5;
                    setRating(value);
                  }}
                  value={rating}
                  min="0"
                  max="5"
                  step="0.1" // Allows decimal values like 1.1, 1.2, etc.
                />
              </div>

              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm me-1"></span>
                  )}
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
            {loading && <span className="loader"></span>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
