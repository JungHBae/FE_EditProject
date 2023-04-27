import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

const QuillEditor = () => {
  const [value, setValue] = useState("");

  const handleInputChange = (newValue) => {
    setValue(newValue);
  };

  const handleButtonClick = () => {
    console.log(value);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", height: "400px" }}>
        <ReactQuill value={value} onChange={handleInputChange} />
      </div>
      <button onClick={handleButtonClick}>Log Content</button>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}></div>
    </>
  );
};

export default QuillEditor;
