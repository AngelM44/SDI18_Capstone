import React, { useState } from "react";
import "./App.css";
import { EuiFlexItem } from "@elastic/eui";

function EditPost({ post, onUpdate }) {
  const [editedPost, setEditedPost] = useState(post.body);

  const handlePostChange = (event) => {
    setEditedPost(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: editedPost }),
      });

      const data = await response.json();

      if (response.ok) {
        onUpdate(data);
      } else {
        console.error("Failed to update post:", data.message);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="edit-post-container">
      <textarea
        className="edit-post-textarea"
        value={editedPost}
        onChange={handlePostChange}
      ></textarea>
      <button className="edit-post-button" onClick={handleSubmit}>
        Update Post
      </button>
    </div>
  );
}

export default EditPost;
