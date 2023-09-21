import React, { useState } from 'react';

function InterestPage({ interestName }) {
    const [postBody, setPostBody] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    body: postBody,
                    // Add any other required fields here, e.g., profile_id, etc.
                    // interest_name: interestName // If you're tracking interest with posts
                })
            });

            const newPost = await response.json();
            // Optionally, you can update the local state with the new post or refetch all posts.
            console.log(newPost);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            {/* ... other components ... */}

            <div>
                <h2>Create a new post for {interestName}</h2>
                <textarea
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    placeholder="Share your thoughts..."
                />
                <button onClick={handleSubmit}>Post</button>
            </div>
        </div>
    );
}

export default InterestPage;
