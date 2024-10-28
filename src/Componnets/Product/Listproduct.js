/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Baseurl } from "../../config";

function Listproduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(Baseurl + "/api/v1/Product/products");
        const sortedProducts = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      } catch (error) {
        setError("Error fetching products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  console.log(products);

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);

    const lowercasedQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowercasedQuery) ||
        product.sku.toLowerCase().includes(lowercasedQuery) ||
        product.categories.toLowerCase().includes(lowercasedQuery)
    );

    setFilteredProducts(filtered);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${Baseurl}/api/v1/Product/delete?id=${id}`);
          // Remove deleted product from state
          setProducts(products.filter((product) => product._id !== id));
          setFilteredProducts(
            filteredProducts.filter((product) => product._id !== id)
          );
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting product:", error);
          setError("Error deleting product. Please try again later.");
          Swal.fire(
            "Error!",
            "There was a problem deleting the product.",
            "error"
          );
        }
      }
    });
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Products</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">Proven Ro</Link>
                      </li>
                      <li className="breadcrumb-item active">Products</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12 col-lg-8">
                <div>
                  <div className="card">
                    <div className="card-header border-0">
                      <div className="row g-4">
                        <div className="col-sm-auto">
                          <div>
                            <Link
                              to="/AddProduct"
                              className="btn btn-success"
                              id="addproduct-btn"
                            >
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
                              Add Product
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="d-flex justify-content-sm-end">
                            <div className="search-box ms-2">
                              <input
                                type="text"
                                className="form-control"
                                id="searchProductList"
                                placeholder="Search Products..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)} // Update search query
                              />
                              <i className="ri-search-line search-icon"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-header">
                      <div className="row align-items-center">
                        <div className="col">
                          <ul
                            className="nav nav-tabs-custom card-header-tabs border-bottom-0"
                            role="tablist"
                          >
                            <li className="nav-item">
                              <Link
                                className="nav-link active fw-semibold"
                                data-bs-toggle="tab"
                                to="#productnav-all"
                                role="tab"
                              >
                                All
                                <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                                  {filteredProducts.length}{" "}
                                  {/* Display count of filtered products */}
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="col-auto">
                          <div id="selection-element">
                            <div className="my-n1 d-flex align-items-center text-muted">
                              Select
                              <div
                                id="select-content"
                                className="text-body fw-semibold px-1"
                              ></div>
                              Result
                              <button
                                type="button"
                                className="btn btn-link link-danger p-0 ms-3"
                                data-bs-toggle="modal"
                                data-bs-target="#removeItemModal"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="tab-content text-muted">
                        <div
                          className="tab-pane active"
                          id="productnav-all"
                          role="tabpanel"
                        >
                          <div className="table-responsive table-card">
                            <table className="table table-nowrap table-striped-columns mb-0">
                              <thead className="table-light">
                                <tr>
                                  <th scope="col">Image</th>
                                  <th scope="col">Product Name</th>
                                  <th scope="col">Category</th>
                                  <th scope="col">Stock</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Discount</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredProducts.map((product) => (
                                  <tr key={product._id}>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-2">
                                          <img
                                            src={product.image}
                                            alt={product.title}
                                            className="avatar-xs rounded-circle"
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <Link
                                        to={`/product/${product._id}`}
                                        className="fw-semibold text-truncate"
                                        title={product.title}
                                      >
                                        {product.title}
                                      </Link>
                                    </td>
                                    <td>{product.categories}</td>
                                    <td>{product.stocks}</td>
                                    <td>₹{product.price}</td>
                                    <td>{product.discount}</td>
                                    <td>
                                      <div className="hstack gap-3 flex-wrap">
                                        <Link
                                          to={`/editProduct/${product._id}`}
                                          className="link-success fs-15"
                                        >
                                          <i className="ri-edit-2-line"></i>
                                        </Link>
                                        <Link
                                          to="#;"
                                          className="link-danger fs-15"
                                          onClick={() =>
                                            handleDelete(product._id)
                                          }
                                        >
                                          <i className="ri-delete-bin-line"></i>
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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
    </>
  );
}

export default Listproduct;
