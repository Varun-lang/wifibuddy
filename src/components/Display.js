import React, { useEffect, useState } from "react";
import { Container, Table, Form } from "react-bootstrap";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

function Display() {
  const firebaseConfig = {
    apiKey: "AIzaSyC6KXpKb5yUQaNSQvfVjzwPCFeyuPDl1rc",
    authDomain: "wifibuddy-84663.firebaseapp.com",
    databaseURL: "https://wifibuddy-84663-default-rtdb.firebaseio.com",
    projectId: "wifibuddy-84663",
    storageBucket: "wifibuddy-84663.firebasestorage.app",
    messagingSenderId: "334840319432",
    appId: "1:334840319432:web:5a65088c81b8c590c984fd",
  };

  let app;

  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp(); // Get the default app if it's already initialized
  }

  const db = getDatabase(app); // Initialize Realtime Database

  const [registrations, setRegistrations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const dataRef = ref(db, "registrations");

    onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setRegistrations(formattedData);
        setFilteredData(formattedData);
      } else {
        setRegistrations([]);
        setFilteredData([]);
      }
    });
  }, [db]);

  // Handle search/filter functionality
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);

    const filtered = registrations.filter((entry) =>
      [
        "name",
        "email",
        "address.streetAddress", // Add Street Address to the search
        "address.area", // Add Area to the search
        "address.city", // Add City to the search
        "address.pincode", // Add Pincode to the search
        "broadbandName",
        "wifiNames",
      ].some((key) =>
        getNestedValue(entry, key).toLowerCase().includes(keyword)
      )
    );

    setFilteredData(filtered);
  };

  // Helper function to get nested values
  const getNestedValue = (obj, path) => {
    if (path === "wifiNames" && Array.isArray(obj.wifiNames)) {
      return obj.wifiNames.join(", "); // Convert array to string for searching
    }
    if (path === "address.pincode") {
      return obj.address && obj.address.pincode
        ? obj.address.pincode.toString()
        : ""; // Ensure pincode is string for searching
    }
    return path.split(".").reduce((acc, part) => acc && acc[part], obj) || "";
  };

  return (
    <Container className="mt-4">
      <h3 className="table-title">Registered Wifi Owners</h3>

      {/* Search Input */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "15vh",
        }}
      >
        <Form.Control
          type="text"
          placeholder="Search by Wifi-Name, Address or Area"
          value={search}
          onChange={handleSearch}
          className="search-input"
          style={{
            width: "50%", // Adjust the width as needed
            padding: "10px",
          }}
        />
      </div>

      <p style={{ color: "#800000" }}>
        ➡️ Simply search for nearby Wi-Fi networks and connect with owners who
        are willing to share their connection.
      </p>

      {/* Table */}
      <Table striped bordered hover responsive className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Numbers</th>
            <th>Street Address</th>
            <th>Area</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Broadband</th>
            <th>WiFi Names</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.name || "N/A"}</td>
                <td>{entry.email || "N/A"}</td>
                <td className="wrap-text">
                  {entry.phoneNumbers ? entry.phoneNumbers.join(", ") : "N/A"}
                </td>
                <td>{entry.address ? entry.address.streetAddress : "N/A"}</td>
                <td>{entry.address ? entry.address.area : "N/A"}</td>
                <td>{entry.address ? entry.address.city : "N/A"}</td>
                <td>{entry.address ? entry.address.state : "N/A"}</td>
                <td>{entry.address ? entry.address.pincode : "N/A"}</td>
                <td>{entry.broadbandName || "N/A"}</td>
                <td className="wrap-text">
                  {entry.wifiNames ? entry.wifiNames.join(", ") : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="no-data">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Custom Styles */}
      <style>
        {`
          .table-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
          }

          .search-input {
            width: 100%;
            max-width: 400px;
            margin-bottom: 20px;
            padding: 10px;
            font-size: 16px;
            border-radius: 8px;
            border: 1px solid #ccc;
          }

          .custom-table {
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
          }

          .custom-table th {
            background-color: #007bff;
            color: white;
            text-align: center;
            padding: 12px;
          }

          .custom-table td {
            padding: 10px;
            text-align: center;
          }

          .wrap-text {
            word-wrap: break-word;
            max-width: 200px;
            white-space: pre-wrap;
          }

          .no-data {
            text-align: center;
            font-size: 18px;
            color: #888;
            padding: 20px;
          }
        `}
      </style>
    </Container>
  );
}

export default Display;
