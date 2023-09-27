import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  EuiPanel,
  EuiTitle,
  EuiButton,
  EuiSpacer,
  EuiFlexGrid,
  EuiFlexItem,
  EuiCard,
  EuiText,
  EuiBadge,
  EuiIcon,
  EuiTextColor,
} from "@elastic/eui";

const SearchResults = ({ results, onClose }) => {
  const navigate = useNavigate();
  const { locations, users, interests } = results || {};
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [activeInterest, setActiveInterest] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !document.querySelector(".search-results-panel").contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const escapeListener = (e) => {
      if (e.key === "Escape" && typeof onClose === "function") {
        onClose();
      }
    };

    document.addEventListener("keydown", escapeListener, false);
    return () => {
      document.removeEventListener("keydown", escapeListener, false);
    };
  }, [onClose]);

  useEffect(() => {
    console.log("Filtered Users:", filteredUsers);
  }, [filteredUsers]);
  const filterByLocation = useCallback(async (locationName) => {
    setActiveLocation(locationName);
    try {
      const response = await axios.get(
        `http://localhost:8080/search?query=${locationName}`
      );
      console.log("Response from server:", response.data);
      setFilteredUsers(response.data.users);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching users by location:", error);
    }
  }, []);

  const filterByInterest = useCallback(async (interestId) => {
    setActiveInterest(interestId);
    try {
      const interestResponse = await axios.get(
        `http://localhost:8080/interests/${interestId}`
      );
      const interestName = interestResponse.data.name;

      const response = await axios.get(
        `http://localhost:8080/search?query=${interestName}`
      );
      console.log("Response from server:", response.data);

      setFilteredUsers(response.data.interestUsers);
      setCurrentPage(1);
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
    <EuiPanel
      paddingSize="l"
      style={{ overflowX: "auto" }}
      className="search-results-panel"
    >
      <EuiFlexGrid columns={3}>
        {displayedUsers && displayedUsers.length > 0 && (
          <EuiFlexItem>
            <EuiTitle size="s">
              <EuiTextColor color="secondary">
                <h2>
                  <EuiIcon type="user" color="primary" /> Users
                </h2>
              </EuiTextColor>
            </EuiTitle>
            <EuiSpacer size="s" />
            {displayedUsers.slice(0, endIndex).map((user) => (
              <EuiText key={user.id}>
                <EuiBadge
                  onClick={() => navigate(`/profile/${user.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {`${user.first_name} ${user.last_name}`}
                </EuiBadge>
              </EuiText>
            ))}
            {showLoadMore && (
              <EuiButton
                color="secondary"
                size="xxs"
                style={{ width: "20%" }}
                onClick={loadMore}
              >
                Load More
              </EuiButton>
            )}
          </EuiFlexItem>
        )}

        {interests && interests.length > 0 && (
          <EuiFlexItem>
            <EuiTitle size="s">
              <EuiTextColor color="secondary">
                <h2>
                  <EuiIcon type="sparkles" color="primary" /> Interests
                </h2>
              </EuiTextColor>
            </EuiTitle>
            <EuiSpacer size="s" />
            {interests.map((interest) => (
              <EuiText key={interest.id}>
                <EuiBadge
                  color={activeInterest === interest.id ? "primary" : "hollow"}
                  onClick={() => filterByInterest(interest.id)}
                >
                  {interest.name}
                </EuiBadge>
              </EuiText>
            ))}
          </EuiFlexItem>
        )}

        {locations && locations.length > 0 && (
          <EuiFlexItem>
            <EuiTitle size="s">
              <EuiTextColor color="secondary">
                <h2>
                  <EuiIcon type="mapMarker" color="primary" /> Locations
                </h2>
              </EuiTextColor>
            </EuiTitle>
            <EuiSpacer size="s" />
            {locations.map((location) => (
              <EuiText key={location.location}>
                <EuiBadge
                  color={
                    activeLocation === location.location ? "primary" : "hollow"
                  }
                  onClick={() => filterByLocation(location.location)}
                >
                  {location.location}
                </EuiBadge>
              </EuiText>
            ))}
          </EuiFlexItem>
        )}
      </EuiFlexGrid>
      <EuiSpacer size="l" />
    </EuiPanel>
  );
};

export default SearchResults;
