import { useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../config";

function PrivacyPolicy() {
  const [version, setVersion] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [sections, setSections] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionContent, setSectionContent] = useState("");
  const [error, setError] = useState("");

  const handleVersionChange = (e) => {
    setVersion(e.target.value);
    setError("");
  };

  const handleEffectiveDateChange = (e) => {
    setEffectiveDate(e.target.value);
    setError("");
  };

  const handleSectionTitleChange = (e) => {
    setSectionTitle(e.target.value);
    setError("");
  };

  const handleSectionContentChange = (data) => {
    setSectionContent(data);
    setError("");
  };

  const handleAddSection = () => {
    if (!sectionTitle || !sectionContent) {
      setError("Section title and content are required");
      return;
    }

    const newSection = { title: sectionTitle, content: sectionContent };
    setSections([...sections, newSection]);
    setSectionTitle("");
    setSectionContent("");
  };

  const handleRemoveSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const handleAddPrivacyPolicy = async () => {
    if (!version || !effectiveDate || sections.length === 0) {
      setError(
        "Version, effective date, and at least one section are required"
      );
      return;
    }

    const privacyPolicyData = {
      version,
      effectiveDate,
      sections: sections.map((section) => ({
        title: section.title,
        content: section.content,
      })),
    };

    try {
      const response = await axios.post(
        Baseurl + "/api/v1/privacy/add",
        privacyPolicyData
      );
      console.log("Privacy Policy added:", response.data);
      // Optionally, show a success message or redirect to another page
    } catch (error) {
      console.error("Error adding Privacy Policy:", error);
      // Log the full error details
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("Request Error:", error.request);
      } else {
        console.error("Error Message:", error.message);
      }
      setError("Failed to add Privacy Policy. Please try again later.");
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
                  <h4 className="mb-sm-0">Privacy Policy</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="breadcrumb-item active">Privacy Policy</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card" id="privacyPolicyForm">
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="version" className="form-label">
                      Version
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="version"
                      value={version}
                      onChange={handleVersionChange}
                      placeholder="Enter version"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="effectiveDate" className="form-label">
                      Effective Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="effectiveDate"
                      value={effectiveDate}
                      onChange={handleEffectiveDateChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sectionTitle" className="form-label">
                      Section Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="sectionTitle"
                      value={sectionTitle}
                      onChange={handleSectionTitleChange}
                      placeholder="Enter section title"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Section Content</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={sectionContent}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        handleSectionContentChange(data);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      type="button"
                      className="btn btn-primary me-2"
                      onClick={handleAddSection}
                    >
                      Add Section
                    </button>
                  </div>
                  {sections.length > 0 && (
                    <div className="mb-3">
                      <h5>Sections:</h5>
                      <ul className="list-group">
                        {sections.map((section, index) => (
                          <li key={index} className="list-group-item">
                            <strong>{section.title}</strong>
                            <p>{section.content}</p>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm float-end"
                              onClick={() => handleRemoveSection(index)}
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddPrivacyPolicy}
                  >
                    Add Privacy Policy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
