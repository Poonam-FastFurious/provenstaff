//* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { Baseurl } from "../../../config";
function ListBlog() {
  const [bloges, setBloges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5); // Adjust number of blogs per page
  const navigate = useNavigate();
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await fetch(Baseurl + "/api/v1/blog/allblogs");
    const data = await response.json();
    setBloges(data.data || []);
  };

  const handleDelete = async (id) => {
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
          const response = await fetch(`${Baseurl}/api/v1/blog/delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
          if (!response.ok) {
            throw new Error("Failed to delete blog");
          }
          fetchBlogs(); // Refresh the blog list after deletion
          Swal.fire("Deleted!", "Your blog has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting blog:", error);
          Swal.fire(
            "Error!",
            "Failed to delete blog. Please try again.",
            "error"
          );
        }
      }
    });
  };
  const handleEdit = (id) => {
    navigate(`/Editblog/${id}`); // Navigate to edit page with blog ID
  };
  const filteredBlogs = bloges.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const truncateText = (text, maxLength) => {
    if (!text) return ""; // Return an empty string if text is undefined or null
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };
  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title mb-0">Manage, Blogs</h4>
                  </div>

                  <div className="card-body">
                    <div className="listjs-table" id="customerList">
                      <div className="row g-4 mb-3">
                        <div className="col-sm-auto">
                          <div>
                            <Link to="/Addblogs">
                              <div className="btn btn-success add-btn">
                                <i className="ri-add-line align-bottom me-1"></i>
                                Add
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="d-flex justify-content-sm-end">
                            <div className="search-box ms-2">
                              <input
                                type="text"
                                className="form-control search"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              <i className="ri-search-line search-icon"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="table-responsive table-card mt-3 mb-1">
                        <table
                          className="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead className="table-light">
                            <tr>
                              <th scope="col" style={{ width: "50px" }}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkAll"
                                    value="option"
                                  />
                                </div>
                              </th>
                              <th className="sort" data-sort="customer_name">
                                Image
                              </th>
                              <th className="sort" data-sort="email">
                                Title
                              </th>
                              <th className="sort" data-sort="phone">
                                Date
                              </th>
                              <th className="sort" data-sort="date">
                                Created
                              </th>

                              <th className="sort" data-sort="action">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {currentBlogs.map((blog, index) => (
                              <tr key={index}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="chk_child"
                                      value="option1"
                                    />
                                  </div>
                                </th>

                                <td className="customer_name">
                                  <div className="flex-shrink-0 me-2">
                                    <img
                                      src={blog.image}
                                      alt=""
                                      className="avatar-md p-2"
                                    />
                                  </div>
                                </td>
                                <td className="email ">
                                  {" "}
                                  {truncateText(blog.title, 20)}{" "}
                                </td>
                                <td className="phone">
                                  {new Date(
                                    blog.createdAt
                                  ).toLocaleDateString()}
                                </td>
                                <td className="date">{blog.author}</td>

                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-success edit-item-btn"
                                        onClick={() => handleEdit(blog._id)}
                                      >
                                        Edit
                                      </button>
                                    </div>
                                    <div className="remove">
                                      <button
                                        className="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() => handleDelete(blog._id)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {filteredBlogs.length === 0 && (
                          <div className="noresult">
                            <div className="text-center">
                              <h5 className="mt-2">Sorry! No Result Found</h5>
                              <p className="text-muted mb-0">
                                We couldn't find any blogs matching your search.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="d-flex justify-content-end">
                        <div className="pagination-wrap hstack gap-2">
                          <button
                            className="page-item pagination-prev"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                          <ul className="pagination listjs-pagination mb-0">
                            {Array.from({ length: totalPages }, (_, index) => (
                              <li
                                key={index}
                                className={`page-item ${
                                  currentPage === index + 1 ? "active" : ""
                                }`}
                              >
                                <button
                                  onClick={() => setCurrentPage(index + 1)}
                                  className="page-link"
                                >
                                  {index + 1}
                                </button>
                              </li>
                            ))}
                          </ul>
                          <button
                            className="page-item pagination-next"
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
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

export default ListBlog;
