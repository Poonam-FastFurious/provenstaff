/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Baseurl } from "../../config";

/* eslint-disable react/no-unescaped-entities */
function Order() {
  const [orders, setOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [shiped, setShiped] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newShippingLink, setNewShippingLink] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  // Calculate indexes for slicing current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination control handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setFetching(true);
        const response = await fetch(Baseurl + "/api/v1/order/allorder");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const sortedOrders = data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
        const filteredCanceledOrders = data.data.filter(
          (order) => order.status === "Cancelled"
        );
        setCanceledOrders(filteredCanceledOrders);
        const filterdeliverd = data.data.filter(
          (order) => order.status === "Delivered"
        );
        setDelivered(filterdeliverd);

        const filtershiped = data.data.filter(
          (order) => order.status === "Shipped"
        );
        setShiped(filtershiped);
      } catch (err) {
        throw (new Error("data not fetch "), err);
      } finally {
        setFetching(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.orderID.includes(searchQuery) ||
      order.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return; // Ensure there's a selected order

    try {
      const response = await fetch(Baseurl + "/api/v1/order/updateorder", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: selectedOrder.orderID, // Assuming orderID is the unique identifier for the order
          status: newStatus, // Assuming newStatus is the updated status value
          shippingLink: newShippingLink, // Assuming newShippingLink is the updated shipping link value
        }),
      });

      if (!response.ok) {
        console.log("Error updating status");
        return;
      }

      // Update local state to reflect the status change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? {
              ...order,
              status: newStatus,
              shippingInfo: {
                ...order.shippingInfo,
                shippingLink: newShippingLink,
              },
            }
            : order
        )
      );

      setCanceledOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? {
              ...order,
              status: newStatus,
              shippingInfo: {
                ...order.shippingInfo,
                shippingLink: newShippingLink,
              },
            }
            : order
        )
      );

      setSelectedOrder(null); // Close the modal

      // Show success toast message
      toast.success("Status and shipping link updated successfully!", {
        position: "top-right",
        autoClose: 1000, // Auto close after 1 second
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          // Close the modal using Bootstrap Modal API
          const modalElement = document.getElementById("showModal");
          const modal = window.bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        },
      });
    } catch (err) {
      console.error("Failed to update order status", err);
      // Handle error condition if required
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Orders</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">Proven Ro</Link>
                      </li>
                      <li className="breadcrumb-item active">Orders</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                          Total Orders
                        </p>
                      </div>

                    </div>
                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                          <span className="counter-value" data-target="559.25">
                            {orders.length}
                          </span>
                        </h4>
                        <Link
                          to=""
                          className="text-decoration-underline"
                          style={{ visibility: "hidden" }}
                        >
                          View net earnings
                        </Link>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-success-subtle rounded fs-3">
                          <i className="bx bx-dollar-circle text-success"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                          Processing
                        </p>
                      </div>
                      <div className="flex-shrink-0"></div>
                    </div>
                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                          <span className="counter-value" data-target="36894">
                            {shiped.length}
                          </span>
                        </h4>
                        <Link
                          to=""
                          className="text-decoration-underline"
                          style={{ visibility: "hidden" }}
                        >
                          View all orders
                        </Link>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-info-subtle rounded fs-3">
                          <i className="bx bx-shopping-bag text-info"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                          Completed
                        </p>
                      </div>
                      <div className="flex-shrink-0"></div>
                    </div>
                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                          <span className="counter-value" data-target="183.35">
                            {delivered.length}
                          </span>
                        </h4>
                        <Link
                          to=""
                          className="text-decoration-underline"
                          style={{ visibility: "hidden" }}
                        >
                          See details
                        </Link>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-warning-subtle rounded fs-3">
                          <i className="bx bx-user-circle text-warning"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                          Cancelled
                        </p>
                      </div>
                      <div className="flex-shrink-0"></div>
                    </div>
                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                          <span className="counter-value" data-target="165.89">
                            {canceledOrders.length}
                          </span>
                        </h4>
                        <Link
                          to=""
                          className="text-decoration-underline"
                          style={{ visibility: "hidden" }}
                        >
                          Withdraw money
                        </Link>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-primary-subtle rounded fs-3">
                          <i className="bx bx-wallet text-primary"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card" id="orderList">
                  <div className="card-header border-0">
                    <div className="row align-items-center gy-3">
                      <div className="col-sm">
                        <h5 className="card-title mb-0">Order History</h5>
                      </div>
                      <div className="col-sm-auto">
                        <div className="d-flex gap-1 flex-wrap">
                          <button
                            type="button"
                            className="btn btn-info"
                            style={{ visibility: "hidden" }}
                          >
                            <i className="ri-file-download-line align-bottom me-1"></i>
                            Import
                          </button>
                          <button
                            className="btn btn-soft-danger"
                            id="remove-actions"
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body border border-dashed border-end-0 border-start-0">
                    <form>
                      <div className="row g-3">
                        <div className="col-xxl-5 col-sm-6">
                          <div className="search-box">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search for order ID, customer, order status or something..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>

                        <div className="col-xxl-2 col-sm-6  d-hidden" style={{ visibility: "hidden" }}>
                          <div>
                            <input
                              type="date"
                              className="form-control"
                              id="demo-datepicker"
                              placeholder="Select date"
                            />
                          </div>
                        </div>

                        <div className="col-xxl-1 col-sm-4 " style={{ visibility: "hidden" }}>
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary w-100"
                            >
                              <i className="ri-equalizer-fill me-1 align-bottom"></i>
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="card-body pt-0">
                    <div>
                      <ul
                        className="nav nav-tabs nav-tabs-custom nav-success mb-3"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <Link
                            className="nav-link active All py-3"
                            data-bs-toggle="tab"
                            id="All"
                            to="#home1"
                            role="tab"
                            aria-selected="true"
                          >
                            <i className="ri-store-2-fill me-1 align-bottom"></i>
                            All Orders
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link py-3 Delivered"
                            data-bs-toggle="tab"
                            id="Delivered"
                            to="#delivered"
                            role="tab"
                            aria-selected="false"
                          >
                            <i className="ri-checkbox-circle-line me-1 align-bottom"></i>
                            Delivered
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link py-3 Pickups"
                            data-bs-toggle="tab"
                            id="Pickups"
                            to="#pickups"
                            role="tab"
                            aria-selected="false"
                          >
                            <i className="ri-truck-line me-1 align-bottom"></i>
                            Shiped
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link py-3 Cancelled"
                            data-bs-toggle="tab"
                            id="Cancelled"
                            to="#cancelled"
                            role="tab"
                            aria-selected="false"
                          >
                            <i className="ri-close-circle-line me-1 align-bottom"></i>
                            Cancelled
                          </Link>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="home1"
                          role="tabpanel"
                        >
                          <div className="table-responsive table-card mb-1">
                            <table className="table table-nowrap align-middle">
                              <thead className="text-muted table-light">
                                <tr className="text-uppercase">
                                  <th scope="col" style={{ width: "25px" }}>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkAll"
                                        value="option"
                                      />
                                    </div>
                                  </th>
                                  <th className="sort" data-sort="id">
                                    Order ID
                                  </th>
                                  <th
                                    className="sort"
                                    data-sort="customer_name"
                                  >
                                    Customer
                                  </th>
                                  <th className="sort" data-sort="date">
                                    Order Date
                                  </th>
                                  <th className="sort" data-sort="amount">
                                    Amount
                                  </th>
                                  <th className="sort" data-sort="payment">
                                    Payment Method
                                  </th>
                                  <th className="sort" data-sort="status">
                                    Delivery Status
                                  </th>
                                  <th className="sort" data-sort="city">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="list form-check-all">
                                {filteredOrders.map((order, index) => (
                                  <tr key={index}>
                                    <th scope="row">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name="checkAll"
                                          value="option1"
                                        />
                                      </div>
                                    </th>
                                    <td className="id">
                                      <Link
                                        to={`${order._id}`}
                                        className="fw-medium link-primary"
                                      >
                                        {order.orderID}
                                      </Link>
                                    </td>
                                    <td className="customer_name">
                                      {order.customer.fullName}
                                    </td>

                                    <td className="date">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleDateString()}
                                    </td>
                                    <td className="amount">
                                      {order.totalAmount}
                                    </td>
                                    <td className="payment">
                                      {order.paymentInfo.method}
                                    </td>
                                    <td className="status">
                                      <span className="badge bg-warning-subtle text-warning text-uppercase">
                                        {order.status}
                                      </span>
                                    </td>
                                    <td>
                                      <ul className="list-inline hstack gap-2 mb-0">
                                        <li
                                          className="list-inline-item"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="View"
                                        >
                                          <Link
                                            to={`${order._id}`}
                                            className="text-primary d-inline-block"
                                          >
                                            <i className="ri-eye-fill fs-16"></i>
                                          </Link>
                                        </li>
                                        {order.status !== "Delivered" && (
                                          <li
                                            className="list-inline-item edit"
                                            data-bs-toggle="tooltip"
                                            data-bs-trigger="hover"
                                            data-bs-placement="top"
                                            title="Edit"
                                          >
                                            <Link
                                              to="#showModal"
                                              data-bs-toggle="modal"
                                              className="text-primary d-inline-block edit-item-btn"
                                              onClick={() =>
                                                handleEditClick(order)
                                              }
                                            >
                                              <i className="ri-pencil-fill fs-16"></i>
                                            </Link>
                                          </li>
                                        )}
                                      </ul>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            {filteredOrders.length === 0 && !fetching && (
                              <div className="noresult">
                                <div className="text-center">
                                  <lord-icon
                                    src="../../../msoeawqm.json"
                                    trigger="loop"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{ width: "75px", height: "75px" }}
                                  ></lord-icon>
                                  <h5 className="mt-2">
                                    Sorry! No Result Found
                                  </h5>
                                  <p className="text-muted mb-0">
                                    We've searched more than 150+ customers. We
                                    did not find any customer for your search.
                                  </p>
                                </div>
                              </div>
                            )}
                            <div className="d-flex justify-content-end mt-3">
                              <nav>
                                <ul className="pagination">
                                  <li
                                    className={`page-item ${currentPage === 1 && "disabled"
                                      }`}
                                  >
                                    <button
                                      className="page-link"
                                      onClick={() => paginate(currentPage - 1)}
                                    >
                                      Previous
                                    </button>
                                  </li>
                                  {Array.from(
                                    {
                                      length: Math.ceil(
                                        orders.length / itemsPerPage
                                      ),
                                    },
                                    (_, i) => (
                                      <li
                                        key={i}
                                        className={`page-item ${currentPage === i + 1 && "active"
                                          }`}
                                      >
                                        <button
                                          className="page-link"
                                          onClick={() => paginate(i + 1)}
                                        >
                                          {i + 1}
                                        </button>
                                      </li>
                                    )
                                  )}
                                  <li
                                    className={`page-item ${currentPage ===
                                      Math.ceil(
                                        orders.length / itemsPerPage
                                      ) && "disabled"
                                      }`}
                                  >
                                    <button
                                      className="page-link"
                                      onClick={() => paginate(currentPage + 1)}
                                    >
                                      Next
                                    </button>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="delivered"
                          role="tabpanel"
                        >
                          <div className="table-responsive table-card mb-1">
                            <table className="table table-nowrap align-middle">
                              <thead className="text-muted table-light">
                                <tr className="text-uppercase">
                                  <th scope="col" style={{ width: "25px" }}>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkAll"
                                        value="option"
                                      />
                                    </div>
                                  </th>
                                  <th className="sort" data-sort="id">
                                    Order ID
                                  </th>
                                  <th
                                    className="sort"
                                    data-sort="customer_name"
                                  >
                                    Customer
                                  </th>
                                  <th className="sort" data-sort="product_name">
                                    Product
                                  </th>
                                  <th className="sort" data-sort="date">
                                    Order Date
                                  </th>
                                  <th className="sort" data-sort="amount">
                                    Amount
                                  </th>
                                  <th className="sort" data-sort="payment">
                                    Payment Method
                                  </th>
                                  <th className="sort" data-sort="status">
                                    Delivery Status
                                  </th>
                                  <th className="sort" data-sort="city">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="list form-check-all">
                                {delivered.map((order, index) => (
                                  <tr key={index}>
                                    <th scope="row">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name="checkAllCancelled"
                                          value="option1"
                                        />
                                      </div>
                                    </th>
                                    <td className="id">
                                      <Link
                                        to={`${order._id}`}
                                        className="fw-medium link-primary"
                                      >
                                        {order.orderID}
                                      </Link>
                                    </td>
                                    <td className="customer_name">
                                      {order.customer.fullName}
                                    </td>
                                    <td className="product_name">
                                      {order.products.length}
                                    </td>
                                    <td className="date">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleDateString()}
                                    </td>
                                    <td className="amount">
                                      {order.totalAmount}
                                    </td>
                                    <td className="payment">
                                      {order.paymentInfo.method}
                                    </td>
                                    <td className="status">
                                      <span className="badge bg-warning-subtle text-warning text-uppercase">
                                        {order.status}
                                      </span>
                                    </td>
                                    <td>
                                      <ul className="list-inline hstack gap-2 mb-0">
                                        <li
                                          className="list-inline-item"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="View"
                                        >
                                          <Link
                                            to={`${order._id}`}
                                            className="text-primary d-inline-block"
                                          >
                                            <i className="ri-eye-fill fs-16"></i>
                                          </Link>
                                        </li>
                                        {order.status !== "Delivered" && (
                                          <li
                                            className="list-inline-item edit"
                                            data-bs-toggle="tooltip"
                                            data-bs-trigger="hover"
                                            data-bs-placement="top"
                                            title="Edit"
                                          >
                                            <Link
                                              to="#showModal"
                                              data-bs-toggle="modal"
                                              className="text-primary d-inline-block edit-item-btn"
                                              onClick={() =>
                                                handleEditClick(order)
                                              }
                                            >
                                              <i className="ri-pencil-fill fs-16"></i>
                                            </Link>
                                          </li>
                                        )}
                                      </ul>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {delivered.length === 0 && !fetching && (
                              <div className="noresult">
                                <div className="text-center">
                                  <lord-icon
                                    src="../../../msoeawqm.json"
                                    trigger="loop"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{ width: "75px", height: "75px" }}
                                  ></lord-icon>
                                  <h5 className="mt-2">
                                    Sorry! No Result Found
                                  </h5>
                                  <p className="text-muted mb-0">
                                    We've searched more than 150+ customers. We
                                    did not find any customer for your search.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pickups"
                          role="tabpanel"
                        >
                          <div className="table-responsive table-card mb-1">
                            <table className="table table-nowrap align-middle">
                              <thead className="text-muted table-light">
                                <tr className="text-uppercase">
                                  <th scope="col" style={{ width: "25px" }}>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkAll"
                                        value="option"
                                      />
                                    </div>
                                  </th>
                                  <th className="sort" data-sort="id">
                                    Order ID
                                  </th>
                                  <th
                                    className="sort"
                                    data-sort="customer_name"
                                  >
                                    Customer
                                  </th>
                                  <th className="sort" data-sort="product_name">
                                    Product
                                  </th>
                                  <th className="sort" data-sort="date">
                                    Order Date
                                  </th>
                                  <th className="sort" data-sort="amount">
                                    Amount
                                  </th>
                                  <th className="sort" data-sort="payment">
                                    Payment Method
                                  </th>
                                  <th className="sort" data-sort="status">
                                    Delivery Status
                                  </th>
                                  <th className="sort" data-sort="city">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="list form-check-all">
                                {shiped.map((order, index) => (
                                  <tr key={index}>
                                    <th scope="row">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name="checkAllCancelled"
                                          value="option1"
                                        />
                                      </div>
                                    </th>
                                    <td className="id">
                                      <Link
                                        to={`${order._id}`}
                                        className="fw-medium link-primary"
                                      >
                                        {order.orderID}
                                      </Link>
                                    </td>
                                    <td className="customer_name">
                                      {order.customer.fullName}
                                    </td>
                                    <td className="product_name">
                                      {order.products.length}
                                    </td>
                                    <td className="date">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleDateString()}
                                    </td>
                                    <td className="amount">
                                      {order.totalAmount}
                                    </td>
                                    <td className="payment">
                                      {order.paymentInfo.method}
                                    </td>
                                    <td className="status">
                                      <span className="badge bg-warning-subtle text-warning text-uppercase">
                                        {order.status}
                                      </span>
                                    </td>
                                    <td>
                                      <ul className="list-inline hstack gap-2 mb-0">
                                        <li
                                          className="list-inline-item"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="View"
                                        >
                                          <Link
                                            to={`${order._id}`}
                                            className="text-primary d-inline-block"
                                          >
                                            <i className="ri-eye-fill fs-16"></i>
                                          </Link>
                                        </li>
                                        <li
                                          className="list-inline-item edit"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="Edit"
                                        >
                                          <Link
                                            to="#showModal"
                                            data-bs-toggle="modal"
                                            className="text-primary d-inline-block edit-item-btn"
                                            onClick={() =>
                                              handleEditClick(order)
                                            }
                                          >
                                            <i className="ri-pencil-fill fs-16"></i>
                                          </Link>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {shiped.length === 0 && !fetching && (
                              <div className="noresult">
                                <div className="text-center">
                                  <lord-icon
                                    src="../../../msoeawqm.json"
                                    trigger="loop"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{ width: "75px", height: "75px" }}
                                  ></lord-icon>
                                  <h5 className="mt-2">
                                    Sorry! No Result Found
                                  </h5>
                                  <p className="text-muted mb-0">
                                    We've searched more than 150+ customers. We
                                    did not find any customer for your search.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="cancelled"
                          role="tabpanel"
                        >
                          {/* Cancelled Orders Content */}
                          <div className="table-responsive table-card mb-1">
                            <table className="table table-nowrap align-middle">
                              <thead className="text-muted table-light">
                                <tr className="text-uppercase">
                                  <th scope="col" style={{ width: "25px" }}>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkAll"
                                        value="option"
                                      />
                                    </div>
                                  </th>
                                  <th className="sort" data-sort="id">
                                    Order ID
                                  </th>
                                  <th
                                    className="sort"
                                    data-sort="customer_name"
                                  >
                                    Customer
                                  </th>
                                  <th className="sort" data-sort="product_name">
                                    Product
                                  </th>
                                  <th className="sort" data-sort="date">
                                    Order Date
                                  </th>
                                  <th className="sort" data-sort="amount">
                                    Amount
                                  </th>
                                  <th className="sort" data-sort="payment">
                                    Payment Method
                                  </th>
                                  <th className="sort" data-sort="status">
                                    Delivery Status
                                  </th>
                                  <th className="sort" data-sort="city">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="list form-check-all">
                                {canceledOrders.map((order, index) => (
                                  <tr key={index}>
                                    <th scope="row">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name="checkAllCancelled"
                                          value="option1"
                                        />
                                      </div>
                                    </th>
                                    <td className="id">
                                      <Link
                                        to={`${order._id}`}
                                        className="fw-medium link-primary"
                                      >
                                        {order.orderID}
                                      </Link>
                                    </td>
                                    <td className="customer_name">
                                      {order.customer.fullName}
                                    </td>
                                    <td className="product_name">
                                      {order.products.length}
                                    </td>
                                    <td className="date">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleDateString()}
                                    </td>
                                    <td className="amount">
                                      {order.totalAmount}
                                    </td>
                                    <td className="payment">
                                      {order.paymentInfo.method}
                                    </td>
                                    <td className="status">
                                      <span className="badge bg-warning-subtle text-warning text-uppercase">
                                        {order.status}
                                      </span>
                                    </td>
                                    <td>
                                      <ul className="list-inline hstack gap-2 mb-0">
                                        <li
                                          className="list-inline-item"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="View"
                                        >
                                          <Link
                                            to={`${order._id}`}
                                            className="text-primary d-inline-block"
                                          >
                                            <i className="ri-eye-fill fs-16"></i>
                                          </Link>
                                        </li>
                                        <li
                                          className="list-inline-item edit"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="Edit"
                                        >
                                          <Link
                                            to="#showModal"
                                            data-bs-toggle="modal"
                                            className="text-primary d-inline-block edit-item-btn"
                                            onClick={() =>
                                              handleEditClick(order)
                                            }
                                          >
                                            <i className="ri-pencil-fill fs-16"></i>
                                          </Link>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {canceledOrders.length === 0 && !fetching && (
                              <div className="noresult">
                                <div className="text-center">
                                  <lord-icon
                                    src="../../../msoeawqm.json"
                                    trigger="loop"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{ width: "75px", height: "75px" }}
                                  ></lord-icon>
                                  <h5 className="mt-2">
                                    Sorry! No Result Found
                                  </h5>
                                  <p className="text-muted mb-0">
                                    We've searched more than 150+ customers. We
                                    did not find any customer for your search.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="modal fade"
                      id="showModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header bg-light p-3">
                            <h5 className="modal-title" id="exampleModalLabel">
                              &nbsp;
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              id="close-modal"
                            ></button>
                          </div>
                          <form className="tablelist-form" autoComplete="off">
                            <div className="modal-body">
                              <input type="hidden" id="id-field" />

                              <div>
                                <label
                                  htmlFor="delivered-status"
                                  className="form-label"
                                >
                                  Delivery Status
                                </label>
                                <select
                                  className="form-control"
                                  data-trigger=""
                                  name="delivered-status"
                                  required=""
                                  id="delivered-status"
                                  value={newStatus}
                                  onChange={(e) => setNewStatus(e.target.value)}
                                >
                                  <option value="Pending">Select Status</option>

                                  <option value="Shipped">Shipped</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </div>
                              <div class="mt-4">
                                <label
                                  for="customername-field"
                                  class="form-label"
                                >
                                  Shiping By
                                </label>
                                <input
                                  type="text"
                                  id="customername-field"
                                  class="form-control"
                                  placeholder="Enter your shipping partner  details"
                                  required
                                  value={newShippingLink}
                                  onChange={(e) =>
                                    setNewShippingLink(e.target.value)
                                  }
                                />
                                <div class="invalid-feedback">
                                  Please enter a Title
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <div className="hstack gap-2 justify-content-end">
                                <button
                                  type="button"
                                  className="btn btn-light"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-success"
                                  id="edit-btn"
                                  onClick={handleUpdateStatus}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
