import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Baseurl } from "../../config";

function OrderDetail() {
  const [orderData, setOrderData] = useState("");

  const { id } = useParams();
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `${Baseurl}/api/v1/order/singleorder/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOrderData(data.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id]);
  console.log("orderdatafff", orderData);

  if (!orderData) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Order Details</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">Proven Ro</Link>
                      </li>
                      <li className="breadcrumb-item active">Order Details</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-9">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex align-items-center">
                      <h5 className="card-title flex-grow-1 mb-0">
                        Order #{orderData.orderID}
                      </h5>
                      {/* <div className="flex-shrink-0">
                        <Link to="#" className="btn btn-success btn-sm">
                          <i className="ri-download-2-fill align-middle me-1"></i>
                          Invoice
                        </Link>
                      </div> */}
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive table-card">
                      <table className="table table-nowrap align-middle table-borderless mb-0">
                        <thead className="table-light text-muted">
                          <tr>
                            <th scope="col">Product Details</th>
                            <th scope="col">Item Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Rating</th>
                            <th scope="col" className="text-end">
                              Total Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderData.products.map((product, index) => (
                            <tr key={index}>
                              <td>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 avatar-md bg-light rounded p-1">
                                    {product.product &&
                                      product.product.image ? (
                                      <img
                                        src={product.product.image}
                                        alt=""
                                        className="img-fluid d-block"
                                      />
                                    ) : (
                                      <div>No Image Available</div>
                                    )}
                                  </div>
                                  <div className="flex-grow-1 ms-3">
                                    <h5 className="fs-15">
                                      <Link to="#" className="link-primary">
                                        {product.product
                                          ? product.product.name
                                          : "Product Not Found"}
                                      </Link>
                                    </h5>
                                  </div>
                                </div>
                              </td>
                              <td>Rs{product.price.toFixed(2)}</td>
                              <td>{product.quantity}</td>
                              <td>
                                {product.product ? (
                                  <div className="text-warning fs-15">
                                    {Array.from(
                                      {
                                        length: Math.floor(
                                          product.product.rating
                                        ),
                                      },
                                      (_, i) => (
                                        <i key={i} className="ri-star-fill"></i>
                                      )
                                    )}
                                    {product.product.rating % 1 !== 0 && (
                                      <i className="ri-star-half-fill"></i>
                                    )}
                                  </div>
                                ) : (
                                  <div>No Rating</div>
                                )}
                              </td>
                              <td className="fw-medium text-end">
                                Rs
                                {(product.price * product.quantity).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                          <tr className="border-top border-top-dashed">
                            <td colSpan="3"></td>
                            <td colSpan="2" className="fw-medium p-0">
                              <table className="table table-borderless mb-0">
                                <tbody>
                                  <tr>
                                    <td>Sub Total :</td>
                                    <td className="text-end">
                                      Rs{orderData.totalAmount.toFixed(2)}
                                    </td>
                                  </tr>

                                  <tr className="border-top border-top-dashed">
                                    <th scope="row">Total (INR) :</th>
                                    <th className="text-end">
                                      Rs{orderData.totalAmount.toFixed(2)}
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="d-sm-flex align-items-center">
                      <h5 className="card-title flex-grow-1 mb-0">
                        Order Status
                      </h5>
                      <div className="flex-shrink-0 mt-2 mt-sm-0"></div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="profile-timeline">
                      <div
                        className="accordion accordion-flush"
                        id="accordionFlushExample"
                      >
                        <div className="accordion-item border-0">
                          <div className="accordion-header" id="headingOne">
                            <Link
                              className="accordion-button p-2 shadow-none"
                              data-bs-toggle="collapse"
                              to="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 avatar-xs">
                                  <div className="avatar-title bg-success rounded-circle">
                                    <i className="ri-shopping-bag-line"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="fs-15 mb-0 fw-semibold">
                                    Order Placed -
                                    <span className="fw-normal">
                                      {new Date(
                                        orderData.createdAt
                                      ).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body ms-2 ps-5 pt-0">
                              <h6 className="mb-1">
                                An order has been placed.
                              </h6>
                              {new Date(orderData.createdAt).toLocaleString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )}
                            </div>
                          </div>
                        </div>

                        {orderData.orderHistory.map((history, index) => (
                          <div key={index} className="accordion-item border-0">
                            <div
                              className="accordion-header"
                              id={`heading${index + 2}`}
                            >
                              <Link
                                className="accordion-button p-2 shadow-none"
                                data-bs-toggle="collapse"
                                to={`#collapse${index + 2}`}
                                aria-expanded="false"
                                aria-controls={`collapse${index + 2}`}
                              >
                                <div className="d-flex align-items-center">
                                  <div className="flex-shrink-0 avatar-xs">
                                    <div className="avatar-title bg-success rounded-circle">
                                      <i
                                        className={`icon-for-${history.status.toLowerCase()}`}
                                      ></i>
                                    </div>
                                  </div>
                                  <div className="flex-grow-1 ms-3">
                                    <h6 className="fs-15 mb-1 fw-semibold">
                                      {history.status} -
                                      <span className="fw-normal">
                                        {new Date(
                                          history.changedAt
                                        ).toLocaleDateString("en-US", {
                                          weekday: "long",
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })}
                                      </span>
                                    </h6>
                                  </div>
                                </div>
                              </Link>
                            </div>
                            <div
                              id={`collapse${index + 2}`}
                              className="accordion-collapse collapse"
                              aria-labelledby={`heading${index + 2}`}
                              data-bs-parent="#accordionFlushExample"
                            >
                              <div className="accordion-body ms-2 ps-5 pt-0">
                                <h6 className="mb-1">{history.description}</h6>
                                <p className="text-muted mb-0">
                                  {new Date(history.changedAt).toLocaleString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    }
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex">
                      <h5 className="card-title flex-grow-1 mb-0">
                        <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>{" "}
                        Logistics Details
                      </h5>
                      <div className="flex-shrink-0">
                        <Link
                          to={orderData.shippingInfo.shippingLink}
                          className="badge bg-primary-subtle text-primary fs-11"
                        >
                          Track Order
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-center">
                      <img
                        src="https://media1.giphy.com/media/QxkMQ5sGmvoFr8YlR9/giphy.gif?cid=6c09b952txamu8xuoavh9yysf6qf5837cj8yc5kd4xojja2l&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                        trigger="loop"
                        colors="primary:#405189,secondary:#0ab39c"
                        style={{ width: "180px", height: "120px" }}
                        alt=""
                      ></img>
                      <h5 className="fs-16 mt-2">RQK Logistics</h5>
                      <p className="text-muted mb-0">ID: MFDS1400457854</p>
                      <p className="text-muted mb-0">
                        Payment Mode : Debit Card
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="d-flex">
                      <h5 className="card-title flex-grow-1 mb-0">
                        Customer Details
                      </h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled mb-0 vstack gap-3">
                      <li>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <img
                              src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                              alt=""
                              className="avatar-sm rounded"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="fs-14 mb-1">
                              {orderData.customer.fullName}
                            </h6>
                            <p className="text-muted mb-0">Customer</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <i className="ri-mail-line me-2 align-middle text-muted fs-16"></i>
                        {orderData.customer.email}
                      </li>
                      <li>
                        <i className="ri-phone-line me-2 align-middle text-muted fs-16"></i>
                        {orderData.customer && orderData.customer.mobile
                          ? orderData.customer.mobile
                          : "No mobile number available"}{" "}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">
                      <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                      Shipping Address
                    </h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                      <li className="fw-medium fs-14">Joseph Parker</li>
                      <li>{orderData.shippingInfo.address}</li>
                      <li>{orderData.shippingInfo.country}</li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
