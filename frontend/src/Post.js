import React, { useState } from 'react';
import { EuiButton, EuiTextArea, EuiFormRow } from "@elastic/eui";

function Post({ onNewPost, data }) {
    const [newPostContent, setNewPostContent] = useState('');

    const handleNewPost = async () => {
        console.log("Attempting to create a new post");
        console.log("Profile ID being passed:", data.profile_id);

        const date_created = new Date().toISOString().slice(0, 10); // Current date in 'YYYY-MM-DD' format
        try {
            const response = await fetch('http://localhost:8080/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    body: newPostContent,
                    profile_id: data.profile_id,
                    date_created: date_created,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Post created:', result);
                onNewPost(result);
                setNewPostContent('');
            } else {
                console.error('Error creating post:', result.error);
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="post-container">
            <textarea
                className="post-textarea"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind?"
            />
            <EuiButton className="post-button" onClick={handleNewPost}>Post</EuiButton>
        </div>
    );
}

export default Post;


