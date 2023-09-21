import React, { useState } from 'react';

const Post = ({ onNewPost }) => {
    const [newPostContent, setNewPostContent] = useState('');

    const handleNewPost = async () => {
        console.log("Attempting to create a new post");
        try {
            const response = await fetch('http://localhost:8080/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    body: newPostContent,
                    profile_id: 1, // This is a placeholder. Will replace it with the actual user's profile_id
                    date_created: new Date().toISOString().slice(0, 10) // Current date in 'YYYY-MM-DD' format
                }),
            });

            const newPost = await response.json();
            console.log("Received response:", newPost);

            if (response.ok) {
                console.log('Post created:', newPost);
                onNewPost(newPost);
                setNewPostContent('');
            } else {
                console.error('Error creating post:', newPost.message);
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind?"
            />
            <button onClick={handleNewPost}>Post</button>
        </div>
    );
};

export default Post;
