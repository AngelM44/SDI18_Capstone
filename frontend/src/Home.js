import React, { useState, useEffect } from 'react';
import {
  EuiButton,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
} from '@elastic/eui';

function Home() {
    const [users, setUsers] = useState([]);
    const [interests, setInterests] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));

        fetch('http://localhost:8080/interests')
            .then(response => response.json())
            .then(data => setInterests(data))
            .catch(error => console.error('Error fetching interests:', error));

        fetch('http://localhost:8080/user-interests')
            .then(response => response.json())
            .then(data => setUserInterests(data))
            .catch(error => console.error('Error fetching user-interests:', error));
    }, []);

    useEffect(() => {
        const data = users.map(user => {
            const userInterestsForUser = userInterests.filter(ui => ui.user_id === user.id);
            const interestsForUser = userInterestsForUser.map(ui => interests.find(interest => interest.id === ui.interest_id));
            return {
                ...user,
                interests: interestsForUser
            };
        });
        setCombinedData(data);
    }, [users, interests, userInterests]);

    return (
        <>

        <div>
            <h1>Users</h1>
            <ul>
                {combinedData.map(user => (
                    <li key={user.id}>
                        <strong>{user.first_name} {user.last_name}</strong> <br />
                        Email: {user.email} <br />
                        Location: {user.location} <br />
                        Interests: {user.interests.map(interest => interest.name).join(", ")}
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default Home;
