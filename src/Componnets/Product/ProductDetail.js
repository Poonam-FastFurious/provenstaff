import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Baseurl } from "../../config";

function ProductDetail() {
  const [products, setProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${Baseurl}/api/v1/Product/product?id=${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.product);
        setThumbnail(data.product.thumbnail);
      } catch (err) {
        throw new Error("data not fetch", err);
      }
    };
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${Baseurl}/api/v1/review/product?productId=${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data.data || []);
        // Adjust based on actual API response structure
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchProducts();
    fetchReviews();
  }, [id]);
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Product Details</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">Proven Ro</Link>
                      </li>
                      <li className="breadcrumb-item active">
                        Product Details
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row gx-lg-5">
                      <div className="col-xl-4 col-md-8 mx-auto">
                        <div className="product-img-slider sticky-side-div">
                          <Swiper
                            className="swiper product-thumbnail-slider p-2 rounded bg-light"
                            spaceBetween={10}
                            slidesPerView={1}
                          >
                            {thumbnail.map((thumb, index) => (
                              <SwiperSlide key={index}>
                                <img
                                  src={thumb}
                                  alt=""
                                  className="img-fluid d-block"
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      </div>

                      <div className="col-xl-8">
                        <div className="mt-xl-0 mt-5">
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <h4>{products.title}</h4>
                              <div className="hstack gap-3 flex-wrap">
                                <div>
                                  <Link to="#" className="text-primary d-block">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: products.shortDescription,
                                      }}
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex flex-wrap gap-2 align-items-center mt-3">
                            <div className="text-muted fs-16">
                              <span className="mdi mdi-star text-warning"></span>
                              <span className="mdi mdi-star text-warning"></span>
                              <span className="mdi mdi-star text-warning"></span>
                              <span className="mdi mdi-star text-warning"></span>
                              <span className="mdi mdi-star text-warning"></span>
                            </div>
                            <div className="text-muted">
                              ( {reviews.length})
                            </div>
                          </div>

                          <div className="row mt-4">
                            <div className="col-lg-3 col-sm-6">
                              <div className="p-2 border border-dashed rounded">
                                <div className="d-flex align-items-center">
                                  <div className="avatar-sm me-2">
                                    <div className="avatar-title rounded bg-transparent text-success fs-24">
                                      <i className="ri-money-dollar-circle-fill"></i>
                                    </div>
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="text-muted mb-1">Price</p>
                                    <h5 className="mb-0">{products.price}</h5>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-3 col-sm-6">
                              <div className="p-2 border border-dashed rounded">
                                <div className="d-flex align-items-center">
                                  <div className="avatar-sm me-2">
                                    <div className="avatar-title rounded bg-transparent text-success fs-24">
                                      <i className="ri-file-copy-2-fill"></i>
                                    </div>
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="text-muted mb-1">
                                      Off Price :
                                    </p>
                                    <h5 className="mb-0">
                                      {products.cutPrice}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-3 col-sm-6">
                              <div className="p-2 border border-dashed rounded">
                                <div className="d-flex align-items-center">
                                  <div className="avatar-sm me-2">
                                    <div className="avatar-title rounded bg-transparent text-success fs-24">
                                      <i className="ri-stack-fill"></i>
                                    </div>
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="text-muted mb-1">
                                      Available Stocks :
                                    </p>
                                    <h5 className="mb-0">{products.stocks}</h5>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-3 col-sm-6">
                              <div className="p-2 border border-dashed rounded">
                                <div className="d-flex align-items-center">
                                  <div className="avatar-sm me-2">
                                    <div className="avatar-title rounded bg-transparent text-success fs-24">
                                      <i className="ri-inbox-archive-fill"></i>
                                    </div>
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="text-muted mb-1">status :</p>
                                    <h5 className="mb-0">Active</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 text-muted">
                            <h5 className="fs-14">Description :</h5>
                            <p>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: products.description,
                                }}
                              />
                            </p>
                          </div>

                          <div className="mt-5">
                            <div>
                              <h5 className="fs-14 mb-3">Ratings & Reviews</h5>
                            </div>
                            <div className="row gy-4 gx-0">
                              <div className="col-lg-4">
                                <div>
                                  <div className="pb-3">
                                    <div className="bg-light px-3 py-2 rounded-2 mb-2">
                                      <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                          <div className="fs-16 align-middle text-warning">
                                            <i className="ri-star-fill"></i>
                                            <i className="ri-star-fill"></i>
                                            <i className="ri-star-fill"></i>
                                            <i className="ri-star-fill"></i>
                                            <i className="ri-star-half-fill"></i>
                                          </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                          <h6 className="mb-0">4.5 out of 5</h6>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-muted">
                                        Total
                                        <span className="fw-medium">5.50k</span>
                                        reviews
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-3">
                                    <div className="row align-items-center g-2">
                                      <div className="col-auto">
                                        <div className="p-2">
                                          <h6 className="mb-0">5 star</h6>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div className="p-2">
                                          <div className="progress animated-progress progress-sm">
                                            <div
                                              className="progress-bar bg-success"
                                              role="progressbar"
                                              style={{ width: "50.16%" }}
                                              aria-valuenow="50.16"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="p-2">
                                          <h6 className="mb-0 text-muted">
                                            2758
                                          </h6>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row align-items-center g-2">
                                      <div className="col-auto">
                                        <div className="p-2">
                                          <h6 className="mb-0">4 star</h6>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div className="p-2">
                                          <div className="progress animated-progress progress-sm">
                                            <div
                                              className="progress-bar bg-success"
                                              role="progressbar"
                                              style={{ width: "19.32%" }}
                                              aria-valuenow="19.32"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="p-2">
                                          <h6 className="mb-0 text-muted">
                                            1063
                                          </h6>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row align-items-center g-2">
                                      <div className="col-auto">
                                        <div className="p-2">
                                          <h6 className="mb-0">3 star</h6>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div className="p-2">
                                          <div className="progress animated-progress progress-sm">
                                            <div
                                              className="progress-bar bg-success"
                                              role="progressbar"
                                              style={{ width: "18.12%" }}
                                              aria-valuenow="18.12"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="p-2">
                                          <h6 className="mb-0 text-muted">
                                            997
                                          </h6>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row align-items-center g-2">
                                      <div className="col-auto">
                                        <div className="p-2">
                                          <h6 className="mb-0">2 star</h6>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div className="p-2">
                                          <div className="progress animated-progress progress-sm">
                                            <div
                                              className="progress-bar bg-warning"
                                              role="progressbar"
                                              style={{ width: "7.42%" }}
                                              aria-valuenow="7.42"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-auto">
                                        <div className="p-2">
                                          <h6 className="mb-0 text-muted">
                                            408
                                          </h6>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row align-items-center g-2">
                                      <div className="col-auto">
                                        <div className="p-2">
                                          <h6 className="mb-0">1 star</h6>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div className="p-2">
                                          <div className="progress animated-progress progress-sm">
                                            <div
                                              className="progress-bar bg-danger"
                                              role="progressbar"
                                              style={{ width: "4.98%" }}
                                              aria-valuenow="4.98"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="p-2">
                                          <h6 className="mb-0 text-muted">
                                            274
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-8">
                                <div className="ps-lg-4">
                                  <div className="d-flex flex-wrap align-items-start gap-3">
                                    <h5 className="fs-14">Reviews: </h5>
                                  </div>

                                  <div
                                    className="me-lg-n3 pe-lg-4"
                                    data-simplebar=""
                                    style={{ maxheight: "225px" }}
                                  >
                                    <ul className="list-unstyled mb-0">
                                      {reviews.map((review, index) => (
                                        <li className="py-2" key={index}>
                                          <div className="border border-dashed rounded p-3">
                                            <div className="d-flex align-items-start mb-3">
                                              <div className="hstack gap-3">
                                                <div className="badge rounded-pill bg-success mb-0">
                                                  <i className="mdi mdi-star"></i>
                                                  {review.rating}
                                                </div>
                                                <div className="vr"></div>
                                                <div className="flex-grow-1">
                                                  <p className="text-muted mb-0">
                                                    {review.message}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="d-flex align-items-end">
                                              <div className="flex-grow-1">
                                                <h5 className="fs-14 mb-0">
                                                  {review.name}
                                                </h5>
                                              </div>

                                              <div className="flex-shrink-0">
                                                <p className="text-muted fs-13 mb-0">
                                                  {new Date(
                                                    review.createdAt
                                                  ).toLocaleDateString()}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">© ProvenRo.</div>
              <div className="col-sm-6">
                <div className="text-sm-end d-none d-sm-block">
                  Design & Develop by Brandbell
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default ProductDetail;
