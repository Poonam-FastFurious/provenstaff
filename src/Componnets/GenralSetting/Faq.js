import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Baseurl } from "../../config";


function Faq() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true); // Start loading

      const response = await fetch(Baseurl + "/api/v1/faq/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question, // Add the question field
          answer: answer, // Add the answer field
        }),
      });

      if (response.ok) {
        // FAQ added successfully
        toast.success("FAQ added successfully");
        setQuestion(""); // Clear the question field
        setAnswer(""); // Clear the answer field
      } else {
        // Handle error response
        toast.error("Failed to add FAQ");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">FAQ</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">Proven Ro</Link>
                      </li>
                      <li className="breadcrumb-item active">FAQ</li>
                    </ol>
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
                      <h5 className="card-title mb-0">FAQ</h5>
                    </div>
                    <div className="col-sm-auto">
                      <div className="d-flex gap-1 flex-wrap">
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
                  <div className="mb-3">
                    <label htmlFor="sectionTitle" className="form-label">
                      Question
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="sectionTitle"
                      placeholder="Enter section title"
                      value={question} // Bind state value
                      onChange={(e) => setQuestion(e.target.value)} // Update state
                    />
                  </div>
                </div>
                <div className="card-body border border-dashed border-end-0 border-start-0">
                  <div className="mb-3">
                    <CKEditor
                      editor={ClassicEditor}
                      data={answer} // Bind state value
                      onChange={(event, editor) => setAnswer(editor.getData())} // Update state
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className={`btn btn-success ${loading ? "disabled" : ""}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <div
                className="spinner-border spinner-border-sm me-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <i className="ri-file-download-line align-bottom me-1"></i>
            )}
            Add FAQ
          </button>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </>
  );
}

export default Faq;