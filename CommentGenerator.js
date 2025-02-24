import React, { useState } from "react";
import axios from "axios";

const CommentGenerator = () => {
  const [postDescription, setPostDescription] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("casual");
  const [generatedComment, setGeneratedComment] = useState("");

  const generateComment = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/generate_comment/", {
        post_description: postDescription,
        style: selectedStyle
      });
      setGeneratedComment(response.data.comment);
    } catch (error) {
      console.error("Error generating comment:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">AI Comment Generator</h2>
      <textarea
        className="border p-2 w-full mb-2"
        rows="3"
        placeholder="Enter post description..."
        value={postDescription}
        onChange={(e) => setPostDescription(e.target.value)}
      />
      <select
        className="border p-2 mb-2"
        value={selectedStyle}
        onChange={(e) => setSelectedStyle(e.target.value)}
      >
        <option value="casual">Casual</option>
        <option value="professional">Professional</option>
        <option value="funny">Funny</option>
      </select>
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={generateComment}
      >
        Generate Comment
      </button>
      {generatedComment && (
        <p className="mt-4 p-2 border bg-gray-100">{generatedComment}</p>
      )}
    </div>
  );
};

export default CommentGenerator;
