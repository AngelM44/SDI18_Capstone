import React, { useCallback, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchResults = ({ results }) => {
  const { locations, users, interests } = results || {};
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [activeInterest, setActiveInterest] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null);

  const filterByLocation = useCallback(async (locationName) => {
    setActiveLocation(locationName);
    try {
      const response = await axios.get(
        `http://localhost:8080/search?query=${locationName}`
      );
      setFilteredUsers(response.data.users);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching users by location:", error);
    }
  }, []);

  const filterByInterest = useCallback(async (interestId) => {
    setActiveInterest(interestId);
    try {
      const response = await axios.get(
        `http://localhost:8080/interests/${interestId}/users`
      );
      console.log(response.data);

      setFilteredUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users by interest:", error);
    }
  }, []);

  const loadMore = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  const displayedUsers = filteredUsers.length > 0 ? filteredUsers : users || [];
  const endIndex = currentPage * itemsPerPage;
  const showLoadMore = endIndex < displayedUsers.length;

  return (
    <div>
      {users && users.length > 0 && (
        <>
          <h2>Users</h2>
          {displayedUsers.slice(0, endIndex).map((user) => (
            <div key={user.id}>
              <Link to={`/profile/${user.id}`}>{user.username}</Link>
            </div>
          ))}
          {showLoadMore && <button onClick={loadMore}>Load More</button>}
        </>
      )}

      {interests && interests.length > 0 && (
        <>
          <h2>Interests</h2>
          {interests.map((interest) => (
            <div
              key={interest.id}
              onClick={() => filterByInterest(interest.id)}
              style={{
                backgroundColor:
                  activeInterest === interest.id ? "lightgray" : "white",
              }}
            >
              {interest.name}
            </div>
          ))}
        </>
      )}

      {locations && locations.length > 0 && (
        <>
          <h2>Locations</h2>
          {locations.map((location) => (
            <div
              key={location.location}
              onClick={() => filterByLocation(location.location)}
              style={{
                backgroundColor:
                  activeLocation === location.location ? "lightgray" : "white",
              }}
            >
              {location.location}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SearchResults;
