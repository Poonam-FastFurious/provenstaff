import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../../../config";
import Swal from "sweetalert2";

function Sliderlist() {
  const [sliders, setSliders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch(Baseurl + "/api/v1/slider/allslider");
        if (!response.ok) {
          throw new Error("Failed to fetch sliders");
        }
        const data = await response.json();
        setSliders(data.data);
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };

    fetchSliders();
  }, []);
  const deleteSlider = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const response = await fetch(Baseurl + "/api/v1/slider/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error("Failed to delete slider");
        }

        Swal.fire(
          'Deleted!',
          'Your slider has been deleted.',
          'success'
        );

        // Update sliders state after successful deletion
        setSliders(sliders.filter((slider) => slider._id !== id));
      }
    } catch (error) {
      console.error("Error deleting slider:", error);
      Swal.fire(
        'Error!',
        'There was a problem deleting the slider.',
        'error'
      );
    }
  };
  const filterbaneer = sliders.filter((slider) =>
    slider.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
                          className="btn btn-success"
                          id="addproduct-btn"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Slider
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
                            placeholder="Search Slider with Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mt-2"
            style={{ marginTop: "25px", backgroundColor: "white" }}
          >
            <table className="table  table-striped align-middle table-nowrap mb-0">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col"> Title</th>
                  <th scope="col"> Details</th>
                  <th scope="col"> Link</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filterbaneer.map((slider) => (
                  <tr key={slider._id}>
                    <th scope="row">
                      <img
                        style={{ maxWidth: "70px", maxHeight: "70px" }}
                        src={slider.sliderImage}
                        alt={slider.title}
                      />
                    </th>
                    <td>{slider.title}</td>
                    <td>{slider.details}</td>
                    <td>{slider.link}</td>
                    <td>
                      <div className="hstack gap-3 flex-wrap">
                        <Link
                          to={`/edit/${slider._id}`}
                          className="link-success fs-15"
                        >
                          <i className="ri-edit-2-line"></i>
                        </Link>
                        <Link
                          onClick={() => deleteSlider(slider._id)}
                          className="link-danger fs-15"
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
    </>
  );
}

export default Sliderlist;
