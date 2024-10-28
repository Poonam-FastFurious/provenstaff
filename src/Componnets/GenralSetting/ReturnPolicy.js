import React, { useState, useEffect } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Baseurl } from "../../config";

function ReturnPolicy() {
  const [returnPolicyData, setReturnPolicyData] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [policyExists, setPolicyExists] = useState(false);
  const [policyId, setPolicyId] = useState(null); // Add state for policy ID

  useEffect(() => {
    const fetchReturnPolicy = async () => {
      try {
        const response = await fetch(Baseurl + "/api/v1/Returnpolicy");
        if (response.ok) {
          const data = await response.json();
          if (data && data.data && data.data.ReturnPolicy) {
            setReturnPolicyData(data.data.ReturnPolicy);
            setPolicyExists(true);
            setPolicyId(data.data._id); // Store the policy ID
          } else {
            setPolicyExists(false);
          }
        } else {
          toast.error("Failed to fetch return policy");
        }
      } catch (error) {
        toast.error("An error occurred while fetching the return policy");
      }
    };
    fetchReturnPolicy();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const url = policyExists
        ? Baseurl + "/api/v1/Returnpolicy/update"
        : Baseurl + "/api/v1/Returnpolicy/add";

      const body = policyExists
        ? { id: policyId, ReturnPolicy: returnPolicyData } // Include the ID in the body if updating
        : { ReturnPolicy: returnPolicyData };

      const response = await fetch(url, {
        method: policyExists ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success(`Return policy ${policyExists ? "updated" : "added"} successfully`);
        setIsEditMode(false);
        setPolicyExists(true);
      } else {
        toast.error(`Failed to ${policyExists ? "update" : "add"} return policy`);
      }
    } catch (error) {
      toast.error("An error occurred during the request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <CKEditor
              editor={ClassicEditor}
              data={returnPolicyData}
              onChange={(event, editor) => setReturnPolicyData(editor.getData())}
              disabled={!isEditMode}
            />
            <div className="mt-3">
              {isEditMode ? (
                <button
                  type="button"
                  className={`btn btn-info ${loading ? "disabled" : ""}`}
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
                  {policyExists ? "Update Return Policy" : "Add Return Policy"}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsEditMode(true)}
                >
                  Edit Return Policy
                </button>
              )}
            </div>
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
      </div>
    </>
  );
}

export default ReturnPolicy;
