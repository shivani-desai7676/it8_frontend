import { useEffect, useState } from "react";

export default function Dashboard({ setStep }) {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const [tab, setTab] = useState("profile");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [generatedLink, setGeneratedLink] = useState("");

  // ✅ CHECK LOGIN
  useEffect(() => {
    if (!token) {
      setStep("home");
    }
  }, [token, setStep]);

  // ✅ FETCH FILES
  useEffect(() => {
    if (tab === "files" || tab === "share") {
      fetchFiles();
    }
  }, [tab]);

  const fetchFiles = async () => {
    const userId = localStorage.getItem("userId");
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    const res = await fetch(`${API_URL}/api/files/${userId}`);
    const data = await res.json();

    setFiles(data);
  };

  // ✅ FILE UPLOAD
  // FILE UPLOAD
const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  const userId = localStorage.getItem("userId");
  const API_URL = process.env.REACT_APP_API_URL;

  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  try {
    const res = await fetch(`${API_URL}/api/files/upload`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (res.ok) {
      alert("File uploaded successfully ✅");
      fetchFiles();
    } else {
      alert(data.message || "Upload failed ❌");
    }

  } catch (err) {
    console.error(err);
    alert("Upload failed ❌");
  }
};


  // ✅ DELETE FILE (NEW)
  const deleteFile = async (fileId) => {
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      await fetch(`${API_URL}/api/files/delete/${fileId}`, {
        method: "DELETE"
      });

      // ✅ instantly update UI (no alert)
      setFiles((prevFiles) => prevFiles.filter(file => file._id !== fileId));

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ GENERATE LINK
  const generateLink = async () => {
    if (!selectedFile) {
      alert("Please select a file ❗");
      return;
    }

    const API_URL = process.env.REACT_APP_API_URL;
    const res = await fetch(`${API_URL}/api/files/generate-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fileId: selectedFile
      })
    });

    const data = await res.json();
    setGeneratedLink(data.link);
  };

  // ✅ LOGOUT
  const handleLogout = async () => {
    const userId = localStorage.getItem("userId");
    const API_URL = process.env.REACT_APP_API_URL;

    try {
      if (userId) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId })
        });
      }
    } catch (err) {
      console.error(err);
    }

    localStorage.clear();
    setStep("home");
  };

  return (
    <div style={container}>

      {/* LEFT CONTENT */}
      <div style={content}>

        {/* PROFILE */}
        {tab === "profile" && (
          <div>
            <h2>User Profile</h2>
            <div style={card}>
              <p><b>Email:</b> {email}</p>
            </div>
          </div>
        )}

        {/* FILES */}
        {tab === "files" && (
          <div>
            <h2>My Files</h2>

            <div style={card}>
              {files.length === 0 ? (
                <p>No files uploaded</p>
              ) : (
                files.map((file) => (
                  <div key={file._id} style={fileRow}>
                    <span>📄 {file.filename}</span>

                    <button
                      style={deleteBtn}
                      onClick={() => deleteFile(file._id)}
                    >
                      ❌ Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SHARE LINK */}
        {tab === "share" && (
          <div>
            <h2>Generate Share Link</h2>

            <div style={card}>
              {files.map((file) => (
                <div key={file._id} style={fileItem}>
                  <input
                    type="radio"
                    name="file"
                    onChange={() => setSelectedFile(file._id)}
                  />
                  &nbsp; {file.filename}
                </div>
              ))}

              <button style={generateBtn} onClick={generateLink}>
                🔗 Generate Link
              </button>

              {generatedLink && (
                <div style={{ marginTop: "15px" }}>
                  <p><b>Share Link:</b></p>

                  <input
                    value={generatedLink}
                    readOnly
                    style={inputBox}
                  />

                  <button
                    style={copyBtn}
                    onClick={() => {
                      navigator.clipboard.writeText(generatedLink);
                      alert("Link copied ✅");
                    }}
                  >
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* RIGHT SIDEBAR */}
      <div style={sidebar}>
        <h3>Dashboard</h3>

        <button style={menuBtn} onClick={() => setTab("profile")}>
          Profile
        </button>

        <button style={menuBtn} onClick={() => setTab("files")}>
          My Files
        </button>

        <button style={menuBtn} onClick={() => setTab("share")}>
          Generate Link
        </button>

        {/* UPLOAD */}
        <button
          style={uploadBtn}
          onClick={() => document.getElementById("fileInput").click()}
        >
          ➕ Upload File
        </button>

        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />

        <button style={logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
}

/* ✅ STYLES */

const container = {
  display: "flex",
  minHeight: "100vh"
};

const content = {
  flex: 1,
  padding: "40px",
  background: "#f8fafc"
};

const sidebar = {
  width: "250px",
  background: "#1e293b",
  color: "white",
  padding: "20px"
};

const menuBtn = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const uploadBtn = {
  ...menuBtn,
  background: "#10b981"
};

const logoutBtn = {
  ...menuBtn,
  background: "#ef4444"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const fileItem = {
  marginBottom: "10px",
  padding: "8px",
  borderBottom: "1px solid #ddd"
};

const fileRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  borderBottom: "1px solid #ddd"
};

const deleteBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "4px 8px",   // 🔥 smaller
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",     // 🔥 smaller text
  display: "flex",
  alignItems: "center",
  gap: "4px"
};
const generateBtn = {
  marginTop: "15px",
  padding: "10px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const inputBox = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const copyBtn = {
  marginTop: "10px",
  padding: "8px",
  background: "#6366f1",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};