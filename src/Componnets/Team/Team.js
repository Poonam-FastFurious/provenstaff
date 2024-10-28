import React from "react";
import { Link } from "react-router-dom";

function Team() {
  return (
    <>
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0">Team</h4>

                  <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item">
                        <Link to="#">Pages</Link>
                      </li>
                      <li class="breadcrumb-item active">Team</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <div class="row g-2">
                  <div class="col-sm-4">
                    <div class="search-box">
                      <input
                        type="text"
                        class="form-control"
                        id="searchMemberList"
                        placeholder="Search for name or designation..."
                      />
                      <i class="ri-search-line search-icon"></i>
                    </div>
                  </div>

                  <div class="col-sm-auto ms-auto">
                    <div class="list-grid-nav hstack gap-1">
                      <button
                        type="button"
                        id="grid-view-button"
                        class="btn btn-soft-info nav-link btn-icon fs-14 active filter-button"
                      >
                        <i class="ri-grid-fill"></i>
                      </button>
                      <button
                        type="button"
                        id="list-view-button"
                        class="btn btn-soft-info nav-link  btn-icon fs-14 filter-button"
                      >
                        <i class="ri-list-unordered"></i>
                      </button>
                      <button
                        type="button"
                        id="dropdownMenuLink1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        class="btn btn-soft-info btn-icon fs-14"
                      >
                        <i class="ri-more-2-fill"></i>
                      </button>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuLink1"
                      >
                        <li>
                          <Link class="dropdown-item" to="#">
                            All
                          </Link>
                        </li>
                        <li>
                          <Link class="dropdown-item" to="#">
                            Last Week
                          </Link>
                        </li>
                        <li>
                          <Link class="dropdown-item" to="#">
                            Last Month
                          </Link>
                        </li>
                        <li>
                          <Link class="dropdown-item" to="#">
                            Last Year
                          </Link>
                        </li>
                      </ul>
                      <button
                        class="btn btn-success addMembers-modal"
                        data-bs-toggle="modal"
                        data-bs-target="#addmemberModal"
                      >
                        <i class="ri-add-fill me-1 align-bottom"></i> Add
                        Members
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div>
                  <div id="teamlist">
                    <div
                      class="team-list grid-view-filter row"
                      id="team-member-list"
                    ></div>
                  </div>

                  <div
                    class="modal fade"
                    id="addmemberModal"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content border-0">
                        <div class="modal-body">
                          <form
                            autocomplete="off"
                            id="memberlist-form"
                            class="needs-validation"
                            novalidate=""
                          />
                          <div class="row">
                            <div class="col-lg-12">
                              <input
                                type="hidden"
                                id="memberid-input"
                                class="form-control"
                                value=""
                              />
                              <div class="px-1 pt-1">
                                <div class="modal-team-cover position-relative mb-0 mt-n4 mx-n4 rounded-top overflow-hidden">
                                  <img
                                    src="https://themesbrand.com/velzon/html/master/assets/images/small/img-9.jpg"
                                    alt=""
                                    id="cover-img"
                                    class="img-fluid"
                                  />

                                  <div class="d-flex position-absolute start-0 end-0 top-0 p-3">
                                    <div class="flex-grow-1">
                                      <h5
                                        class="modal-title text-white"
                                        id="createMemberLabel"
                                      >
                                        Add New Members
                                      </h5>
                                    </div>
                                    <div class="flex-shrink-0">
                                      <div class="d-flex gap-3 align-items-center">
                                        <div>
                                          <label
                                            for="cover-image-input"
                                            class="mb-0"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title="Select Cover Image"
                                          >
                                            <div class="avatar-xs">
                                              <div class="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                <i class="ri-image-fill"></i>
                                              </div>
                                            </div>
                                          </label>
                                          <input
                                            class="form-control d-none"
                                            value=""
                                            id="cover-image-input"
                                            type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                          />
                                        </div>
                                        <button
                                          type="button"
                                          class="btn-close btn-close-white"
                                          id="createMemberBtn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="text-center mb-4 mt-n5 pt-2">
                                <div class="position-relative d-inline-block">
                                  <div class="position-absolute bottom-0 end-0">
                                    <label
                                      for="member-image-input"
                                      class="mb-0"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="right"
                                      title="Select Member Image"
                                    >
                                      <div class="avatar-xs">
                                        <div class="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                          <i class="ri-image-fill"></i>
                                        </div>
                                      </div>
                                    </label>
                                    <input
                                      class="form-control d-none"
                                      value=""
                                      id="member-image-input"
                                      type="file"
                                      accept="image/png, image/gif, image/jpeg"
                                    />
                                  </div>
                                  <div class="avatar-lg">
                                    <div class="avatar-title bg-light rounded-circle">
                                      <img
                                        src="https://themesbrand.com/velzon/html/master/assets/images/users/user-dummy-img.jpg"
                                        id="member-img"
                                        class="avatar-md rounded-circle h-auto"
                                        alt="demo"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="mb-3">
                                <label for="teammembersName" class="form-label">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="teammembersName"
                                  placeholder="Enter name"
                                  required=""
                                />
                                <div class="invalid-feedback">
                                  Please Enter a member name.
                                </div>
                              </div>

                              <div class="mb-4">
                                <label for="designation" class="form-label">
                                  Designation
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="designation"
                                  placeholder="Enter designation"
                                  required=""
                                />
                                <div class="invalid-feedback">
                                  Please Enter a designation.
                                </div>
                              </div>
                              <input
                                type="hidden"
                                id="project-input"
                                class="form-control"
                                value=""
                              />
                              <input
                                type="hidden"
                                id="task-input"
                                class="form-control"
                                value=""
                              />

                              <div class="hstack gap-2 justify-content-end">
                                <button
                                  type="button"
                                  class="btn btn-light"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="submit"
                                  class="btn btn-success"
                                  id="addNewMember"
                                >
                                  Add Member
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-xl-4">
                      <div class="card">
                        <div class="card-header">
                          <button
                            type="button"
                            class="btn-close float-end fs-11"
                            aria-label="Close"
                          ></button>
                          <h6 class="card-title mb-0">Employee Card</h6>
                        </div>
                        <div class="card-body p-4 text-center">
                          <div class="mx-auto avatar-md mb-3">
                            <img
                              src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                              alt=""
                              class="img-fluid rounded-circle"
                            />
                          </div>
                          <h5 class="card-title mb-1">Gabriel Palmer</h5>
                          <p class="text-muted mb-0">Graphic Designer</p>
                        </div>
                        <div class="card-footer text-center">
                          <ul class="list-inline mb-0">
                            <li class="list-inline-item">
                              <Link
                                to="#;"
                                class="lh-1 align-middle link-secondary"
                              >
                                <i class="ri-facebook-fill"></i>
                              </Link>
                            </li>
                            <li class="list-inline-item">
                              <Link
                                to="#;"
                                class="lh-1 align-middle link-success"
                              >
                                <i class="ri-whatsapp-line"></i>
                              </Link>
                            </li>
                            <li class="list-inline-item">
                              <Link
                                to="#;"
                                class="lh-1 align-middle link-primary"
                              >
                                <i class="ri-linkedin-fill"></i>
                              </Link>
                            </li>
                            <li class="list-inline-item">
                              <Link
                                to="#;"
                                class="lh-1 align-middle link-danger"
                              >
                                <i class="ri-slack-fill"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-4">
                      <div class="card">
                        <div class="card-header">
                          <button
                            type="button"
                            class="btn-close float-end fs-11"
                            aria-label="Close"
                          ></button>
                          <h6 class="card-title mb-0">Employee Card</h6>
                        </div>
                        <div class="card-body p-4 text-center">
                          <div class="mx-auto avatar-md mb-3">
                            <img
                              src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                              alt=""
                              class="img-fluid rounded-circle"
                            />
                          </div>
                          <h5 class="card-title mb-1">Amelie Townsend</h5>
                          <p class="text-muted mb-0">Project Manager</p>
                        </div>
                        <div class="card-footer text-center">
                          <ul class="list-inline mb-0">
                            <li class="list-inline-item">
                              <Link
                                to="#;"
                                class="lh-1 align-middle link-secondary"
                              >
                                <i class="ri-facebook-fill"></i>
                              </Link>
                            </li>
                            <li class="list-inline-item">
                              <Link
                                to="#;"
                                class="lh-1 align-middle link-success"
                              >
                                <i class="ri-whatsapp-line"></i>
                              </Link>
                            </li>
                            <li class="list-inline-item">
                              <Link
                                to="#;"
                                class="lh-1 align-middle link-primary"
                              >
                                <i class="ri-linkedin-fill"></i>
                              </Link>
                            </li>
                            <li class="list-inline-item">
                              <Link
                                to="#;"
                                class="lh-1 align-middle link-danger"
                              >
                                <i class="ri-slack-fill"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-4">
                      <div class="card">
                        <div class="card-header">
                          <button
                            type="button"
                            class="btn-close float-end fs-11"
                            aria-label="Close"
                          ></button>
                          <h6 class="card-title mb-0">Employee Card</h6>
                        </div>
                        <div class="card-body p-4 text-center">
                          <div class="mx-auto avatar-md mb-3">
                            <img
                              src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                              alt=""
                              class="img-fluid rounded-circle"
                            />
                          </div>
                          <h5 class="card-title mb-1">Jeffrey Montgomery</h5>
                          <p class="text-muted mb-0">UI/UX Designer</p>
                        </div>
                        <div class="card-footer text-center">
                          <ul class="list-inline mb-0">
                            <li class="list-inline-item">
                              <Link
                                to="#;"
                                class="lh-1 align-middle link-secondary"
                              >
                                <i class="ri-facebook-fill"></i>
                              </Link>
                            </li>
                            <li class="list-inline-item">
                              <Link
                                to="#;"
                                class="lh-1 align-middle link-success"
                              >
                                <i class="ri-whatsapp-line"></i>
                              </Link>
                            </li>
                            <li class="list-inline-item">
                              <Link
                                to="#;"
                                class="lh-1 align-middle link-primary"
                              >
                                <i class="ri-linkedin-fill"></i>
                              </Link>
                            </li>
                            <li class="list-inline-item">
                              <Link
                                to="#;"
                                class="lh-1 align-middle link-danger"
                              >
                                <i class="ri-slack-fill"></i>
                              </Link>
                            </li>
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
    </>
  );
}

export default Team;
