import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Baseurl } from "../../../config";

function EditSlider() {
      const { id } = useParams()
      const [sliderImage, setSliderImage] = useState("");
      const [title, setTitle] = useState("");
      const [details, setDetails] = useState("");
      const [link, setLink] = useState("");
      const [loading, setLoading] = useState(false);
      const [previewImage, setPreviewImage] = useState("");
      const navigate = useNavigate();

      useEffect(() => {
            // Fetch slider data by ID

            const fetchSliderData = async () => {
                  setLoading(true);
                  try {
                        const response = await fetch(`${Baseurl}/api/v1/slider/${id}`);
                        const data = await response.json();
                        console.log("Slider Data:", data);
                        if (response.ok) {
                              setTitle(data.data.title || "");
                              setDetails(data.data.details || "");
                              setLink(data.data.link || "");
                              setSliderImage(data.data.sliderImage || "");
                              setPreviewImage(data.data.sliderImage || "");
                        } else {
                              throw new Error("Failed to fetch slider data");
                        }
                  } catch (error) {
                        console.error("Error:", error);
                  } finally {
                        setLoading(false);
                  }
            };
            fetchSliderData();

      }, [id]);
      console.log("demo", title);
      const handleGoBack = () => {
            navigate(-1);
      };

      const handleImageChange = (e) => {
            const file = e.target.files[0];
            setSliderImage(file);
            setPreviewImage(URL.createObjectURL(file));
      };

      const handelsubmit = async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append("sliderImage", sliderImage);
            formData.append("title", title);
            formData.append("details", details);
            formData.append("link", link);
            formData.append("id", id);

            setLoading(true); // Start loader

            try {
                  const response = await fetch(Baseurl + "/api/v1/slider/edit", {
                        method: "PATCH",
                        body: formData,
                  });

                  if (!response.ok) {
                        throw new Error("Network response was not ok");
                  }

                  const data = await response.json();

                  if (data.success) {
                        toast.success("Slider  uploaded successfully", {
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
                                    setSliderImage("");
                                    setDetails("");
                                    setLink("");
                                    navigate("/Slider")
                              },
                        });
                  } else {
                        throw new Error("Slider upload failed");
                  }
            } catch (error) {
                  console.error("Error:", error.message);
                  toast.error("Slider upload failed", {
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
                  setLoading(false); // Stop loader
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
                                                                        <Link
                                                                              to="/addslider"
                                                                              className="btn"
                                                                              id="addproduct-btn"
                                                                        >
                                                                              Add Sliders
                                                                        </Link>
                                                                  </div>
                                                            </div>
                                                            <div className="col-sm">
                                                                  <div className="d-flex justify-content-sm-end">
                                                                        <div className="search-box ms-2">
                                                                              <Link
                                                                                    onClick={handleGoBack}
                                                                                    to="/add-product"
                                                                                    className="btn btn-success"
                                                                                    id="addproduct-btn"
                                                                              >
                                                                                    <i className="align-bottom me-1"></i> Back
                                                                              </Link>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                              <div style={{ backgroundColor: "white" }}>
                                    <form
                                          onSubmit={handelsubmit}
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
                                                                  <h4 className="card-title mb-0">Slider Image</h4>
                                                            </div>
                                                            <div className="card-body">
                                                                  <input
                                                                        type="file"
                                                                        className="filepond filepond-input-multiple"
                                                                        name="filepond"
                                                                        data-allow-reorder="true"
                                                                        data-max-file-size="3MB"
                                                                        data-max-files="3"
                                                                        onChange={handleImageChange}
                                                                  />
                                                                  {sliderImage && (
                                                                        <ul className="list-unstyled mb-0" id="dropzone-preview">
                                                                              <li className="mt-2" id="dropzone-preview-list">
                                                                                    <div className="border rounded">
                                                                                          <div className="d-flex p-2">
                                                                                                <div className="flex-shrink-0 me-3">
                                                                                                      <div className="avatar-sm bg-light rounded">
                                                                                                            <img
                                                                                                                  src={previewImage}
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
                                                </div>
                                          </div>
                                          <div className="mb-3">
                                                <label htmlFor="title" className="form-label">
                                                      Title
                                                </label>
                                                <input
                                                      type="text"
                                                      className="form-control"
                                                      id="title"
                                                      placeholder="Enter title"
                                                      onChange={(e) => setTitle(e.target.value)}
                                                      value={title}
                                                />
                                          </div>
                                          <div className="mb-3">
                                                <label htmlFor="details" className="form-label">
                                                      Details
                                                </label>
                                                <input
                                                      type="text"
                                                      className="form-control"
                                                      id="details"
                                                      placeholder="Enter details"
                                                      onChange={(e) => setDetails(e.target.value)}
                                                      value={details}
                                                />
                                          </div>
                                          <div className="mb-3">
                                                <label htmlFor="link" className="form-label">
                                                      Link
                                                </label>
                                                <input
                                                      type="text"
                                                      className="form-control"
                                                      id="link"
                                                      placeholder="Enter link"
                                                      onChange={(e) => setLink(e.target.value)}
                                                      value={link}
                                                />
                                          </div>

                                          <div className="">
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

export default EditSlider;
