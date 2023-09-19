

import React, { useState, useEffect } from 'react';

function ListComponent({ category }) {
    const [users, setUsers] = useState([]);
    const [interests, setInterests] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {

        Promise.all([
            fetch('http://localhost:8080/users').then(response => response.json()),
            fetch('http://localhost:8080/interests').then(response => response.json()),
            fetch('http://localhost:8080/user-interests').then(response => response.json())
        ]).then(([usersData, interestsData, userInterestsData]) => {
            setUsers(usersData);
            setInterests(interestsData);
            setUserInterests(userInterestsData);


            const combined = usersData.map(user => {
                const userInterestsForUser = userInterestsData.filter(ui => ui.user_id === user.id);
                const interestsForUser = userInterestsForUser.map(ui => interestsData.find(interest => interest.id === ui.interest_id));
                return {
                    ...user,
                    interests: interestsForUser
                };
            });
            setCombinedData(combined);
        })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, []);


    const filteredData = combinedData.filter(user => user.interests.some(interest => interest.category === category));

    return (
        <div>
            <h2>Users Interested in {category}</h2>
            <ul>
                {filteredData.map(user => (
                    <li key={user.id}>
                        <strong>{user.first_name} {user.last_name}</strong> <br />
                        Email: {user.email} <br />
                        Location: {user.location} <br />
                        Interests: {user.interests.map(interest => interest.name).join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListComponent;

