// File: src/components/TextEditor.jsx
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ userData }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) setContent(savedContent);
  }, []);

  useEffect(() => {
    if (userData && userData.length > 0) {
      const formattedText = userData
        .map(
          (user, index) => `
          <h2><strong>User ${index + 1} Details</strong></h2>
          <p><strong>Name:</strong> ${user.name || "N/A"}</p>
          <p><strong>Address:</strong> ${user.address || "N/A"}</p>
          <p><strong>Email:</strong> ${user.email || "N/A"}</p>
          <p><strong>Phone:</strong> ${user.phone || "N/A"}</p>
          <hr />
        `
        )
        .join("");

      setContent(formattedText);
      localStorage.setItem("editorContent", formattedText);
    }
  }, [userData]);

  const handleChange = (value) => {
    setContent(value);
    localStorage.setItem("editorContent", value);
  };

  return (
    <div className="p-4 border border-gray-700 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Rich Text Editor</h2>
      <ReactQuill
        value={content}
        onChange={handleChange}
        theme="snow"
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["bold", "italic", "underline"],
            ["link"],
            ["blockquote", "code-block"],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            ["clean"],
          ],
        }}
      />
    </div>
  );
};

export default TextEditor;
