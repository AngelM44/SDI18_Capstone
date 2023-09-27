import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import {
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiIcon,
  EuiSpacer,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiText,
} from "@elastic/eui";
import SearchResults from "./SearchResults";

const generateColor = () => {
  let color = "#000000";
  while (
    color === "#FFFFFF" ||
    color === "#ffffff" ||
    color === "#FFF" ||
    color === "#fff" ||
    color === "#000000" ||
    color === "#000" ||
    color === "#000000"
  ) {
    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  return color;
};

const renderActiveShape = (props) => {
  return <Sector {...props} />;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const percentage = payload[0].payload.percentage;
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p>{`${payload[0].name}: ${percentage}%`}</p>
      </div>
    );
  }
  return null;
};

const LegendComponent = ({ chartData }) => {
  return (
    <div>
      {chartData.map((entry, index) => (
        <div
          key={index}
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: entry.color,
              marginRight: "8px",
              border: "1px solid #ccc",
            }}
          ></div>
          <span>{`${entry.name}: ${entry.percentage}%`}</span>
        </div>
      ))}
    </div>
  );
};

const InterestsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const fetchInterestsAndUsers = async () => {
      try {
        const interestsResponse = await axios.get(
          "http://localhost:8080/interests"
        );
        const interests = interestsResponse.data;
        const userCounts = [];

        let totalUsers = 0;
        for (const interest of interests) {
          const usersResponse = await axios.get(
            `http://localhost:8080/interests/${interest.id}/users`
          );
          const userCount = usersResponse.data.users.length;
          totalUsers += userCount;
          userCounts.push({
            id: interest.id,
            name: interest.name,
            value: userCount,
            color: generateColor(),
          });
        }

        const percentageData = userCounts
          .map((interest) => ({
            ...interest,
            percentage: ((interest.value / totalUsers) * 100).toFixed(2),
          }))
          .filter((interest) => interest.percentage !== "0.00");

        setChartData(percentageData);
      } catch (error) {
        console.error("Error fetching data for chart:", error);
      }
    };

    fetchInterestsAndUsers();
  }, []);

  const onPieSectorClick = async (data) => {
    try {
      const interestResponse = await axios.get(
        `http://localhost:8080/interests/${data.id}`
      );
      const interestName = interestResponse.data.name;

      const response = await axios.get(
        `http://localhost:8080/search?query=${interestName}`
      );

      setFilteredUsers(response.data.interestUsers);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Error fetching users by interest:", error);
    }
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
    setFilteredUsers([]);
  };

  return (
    <EuiPanel paddingSize="l">
      <div style={{ textAlign: "center" }}>
        <EuiTitle size="l">
          <h2>
            <EuiIcon
              type="searchProfilerApp"
              style={{ marginRight: "8px" }}
            />
            <EuiText
              color="secondary"
              style={{ display: "inline", fontSize: "larger" }}
            >
              Interest By Users
            </EuiText>
          </h2>
        </EuiTitle>
      </div>
      <EuiSpacer size="m" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                activeShape={renderActiveShape}
                label={(entry) => entry.name}
                onClick={onPieSectorClick}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </EuiFlexItem>
        <EuiFlexItem>
          <LegendComponent chartData={chartData} />
        </EuiFlexItem>
      </EuiFlexGroup>
      {showSearchResults && (
        <EuiModal onClose={closeSearchResults}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Search Results</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <SearchResults
              results={{ users: filteredUsers }}
              onClose={closeSearchResults}
            />
          </EuiModalBody>
        </EuiModal>
      )}
    </EuiPanel>
  );
};

export default InterestsChart;
