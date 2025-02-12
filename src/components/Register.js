import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database"; // Modular imports
import toast from "react-hot-toast";

function Register() {
  const firebaseConfig = {
    apiKey: "AIzaSyC6KXpKb5yUQaNSQvfVjzwPCFeyuPDl1rc",
    authDomain: "Ywifibuddy-84663.firebaseapp.com",
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

  const [name, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState([]);
  const [pincode, setPincode] = useState("");
  const [wifiNames, setWifiNames] = useState([""]);
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [email, setEmail] = useState("");
  const [broadbandName, setBroadbandName] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  useEffect(() => {
    // Initial setup if needed
  }, []);

  const handleSubmit = () => {
    const formData = {
      name,
      email,
      phoneNumbers,
      address: {
        streetAddress,
        pincode,
        country,
        state,
        city,
        area: selectedArea,
      },
      wifiNames,
      broadbandName,
    };

    // Save data to Firebase Realtime Database
    const dataRef = ref(db, "registrations");
    push(dataRef, formData)
      .then(() => {
        toast.success("You are registered!", {
          duration: 5000,
        });
        resetForm(); // Optionally reset the form here after successful submission
      })
      .catch((error) => {
        toast.error("Error saving data to Firebase:", error);
        toast.alert("Error submitting the form, please try again.");
      });
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    setPincode(value);

    if (value.length === 6) {
      fetchCountryStateCity(value); // Fetch details based on pincode
    }
  };

  const fetchCountryStateCity = (pincode) => {
    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        if (data[0].Status === "Success") {
          const countryName = data[0].PostOffice[0].Country;
          const stateName = data[0].PostOffice[0].State;
          const cityName = data[0].PostOffice[0].District;
          const areaList = data[0].PostOffice.map((post) => post.Name);

          setCountry(countryName); // Set country
          setState(stateName); // Set state
          setCity(cityName); // Set city
          setArea(areaList); // Set areas based on pincode
        } else {
          setCountry("");
          setState("");
          setCity("");
          setArea([]);
        }
      })
      .catch((error) => {
        toast.error("Error fetching country, state, city, and area:", error);
        setCountry("");
        setState("");
        setCity("");
        setArea([]);
      });
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleAddWifi = () => {
    setWifiNames([...wifiNames, ""]);
  };

  const handleWifiChange = (e, index) => {
    const updatedWifiNames = [...wifiNames];
    updatedWifiNames[index] = e.target.value;
    setWifiNames(updatedWifiNames);
  };

  const handleDeleteWifi = (index) => {
    const updatedWifiNames = wifiNames.filter((_, i) => i !== index);
    setWifiNames(updatedWifiNames);
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const handlePhoneNumberChange = (e, index) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = e.target.value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleDeletePhoneNumber = (index) => {
    const updatedPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const resetForm = () => {
    setName("");
    setStreetAddress("");
    setCountry("");
    setState("");
    setCity("");
    setArea([]);
    setPincode("");
    setWifiNames([""]);
    setPhoneNumbers([""]);
    setEmail("");
    setBroadbandName("");
  };

  return (
    <Container
      className="my-4 register-container"
      style={{
        maxWidth: "1200px",
        padding: "40px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#0056b3",
          fontWeight: "600",
        }}
      >
        Register as Wifi Owner
      </h2>

      <p style={{ color: "#800000" }}>
        ➡️ Enter the details to share your Wi-Fi and split the internet bill
        with others in your area.
      </p>

      <div className="section" style={{ marginBottom: "30px" }}>
        <h4 style={{ color: "#343a40", marginBottom: "10px" }}>Name</h4>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          style={{
            padding: "12px",
            fontSize: "16px",
            marginBottom: "15px",
            borderRadius: "8px",
            borderColor: "#007bff",
          }}
        />
      </div>

      {/* <div className="section" style={{ marginBottom: "30px" }}>
        <h4 style={{ color: "#343a40", marginBottom: "10px" }}>Email</h4>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter email"
          style={{
            padding: "12px",
            fontSize: "16px",
            marginBottom: "15px",
            borderRadius: "8px",
            borderColor: "#007bff",
          }}
        />
      </div> */}

      <div className="section" style={{ marginBottom: "30px" }}>
        <h4 style={{ color: "#343a40", marginBottom: "10px" }}>Contact</h4>
        {phoneNumbers.map((phone, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              width: "30%",
            }}
          >
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => handlePhoneNumberChange(e, index)}
              placeholder="Enter phone number"
              maxLength={10}
              required
              style={{
                padding: "12px",
                fontSize: "16px",
                marginRight: "10px",
                flex: 1,
                borderRadius: "8px",
                borderColor: "#007bff",
              }}
            />
            {index > 0 && (
              <Button
                variant="danger"
                onClick={() => handleDeletePhoneNumber(index)}
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                }}
              >
                Delete
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="link"
          onClick={handleAddPhoneNumber}
          style={{
            color: "#007bff",
            fontSize: "16px",
            textAlign: "left",
            display: "block",
            marginTop: "10px",
          }}
        >
          Add More Phone Numbers
        </Button>
      </div>

      <div className="section" style={{ marginBottom: "30px" }}>
        <h4 style={{ color: "#343a40", marginBottom: "10px" }}>Address</h4>
        <Form.Control
          type="text"
          value={pincode}
          onChange={handlePincodeChange}
          maxLength={6}
          placeholder="Enter pincode"
          required
          style={{
            padding: "12px",
            fontSize: "16px",
            marginBottom: "15px",
            borderRadius: "8px",
            borderColor: "#007bff",
          }}
        />
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <Form.Control
            type="text"
            value={country}
            readOnly
            required
            style={{
              padding: "12px",
              fontSize: "16px",
              flex: 1,
              marginRight: "10px",
              borderRadius: "8px",
              borderColor: "#007bff",
            }}
          />
          <Form.Control
            type="text"
            value={state}
            readOnly
            required
            style={{
              padding: "12px",
              fontSize: "16px",
              flex: 1,
              borderRadius: "8px",
              borderColor: "#007bff",
            }}
          />
        </div>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <Form.Control
            type="text"
            value={city}
            readOnly
            required
            style={{
              padding: "12px",
              fontSize: "16px",
              flex: 1,
              marginRight: "10px",
              borderRadius: "8px",
              borderColor: "#007bff",
            }}
          />
          <Form.Control
            as="select"
            value={selectedArea}
            onChange={handleAreaChange}
            style={{
              padding: "12px",
              fontSize: "16px",
              flex: 1,
              borderRadius: "8px",
              borderColor: "#007bff",
            }}
          >
            <option value="">Select Area</option>
            {area.map((areaName, index) => (
              <option key={index} value={areaName}>
                {areaName}
              </option>
            ))}
          </Form.Control>
        </div>
        <Form.Control
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          placeholder="Flat or Street Address"
          required
          style={{
            padding: "12px",
            fontSize: "16px",
            marginBottom: "15px",
            borderRadius: "8px",
            borderColor: "#007bff",
          }}
        />
      </div>

      <div className="section" style={{ marginBottom: "30px" }}>
        <h4 style={{ color: "#343a40", marginBottom: "10px" }}>
          Broadband Name
        </h4>
        <Form.Control
          type="text"
          value={broadbandName}
          onChange={(e) => setBroadbandName(e.target.value)}
          placeholder="Eg: Airtel, Jio etc."
          required
          style={{
            padding: "12px",
            fontSize: "16px",
            marginBottom: "15px",
            borderRadius: "8px",
            borderColor: "#007bff",
          }}
        />
      </div>

      <div className="section" style={{ marginBottom: "30px" }}>
        <h4 style={{ color: "#343a40", marginBottom: "10px" }}>WiFi Name</h4>
        {wifiNames.map((wifi, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              width: "30%",
            }}
          >
            <Form.Control
              type="text"
              value={wifi}
              placeholder="Eg: abc-2.4G, abc-5G"
              onChange={(e) => handleWifiChange(e, index)}
              required
              style={{
                padding: "12px",
                fontSize: "16px",
                marginRight: "10px",
                flex: 1,
                borderRadius: "8px",
                borderColor: "#007bff",
              }}
            />
            {index > 0 && (
              <Button
                variant="danger"
                onClick={() => handleDeleteWifi(index)}
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                }}
              >
                Delete
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="link"
          onClick={handleAddWifi}
          style={{
            color: "#007bff",
            fontSize: "16px",
            textAlign: "left",
            display: "block",
            marginTop: "10px",
          }}
        >
          Add More WiFi
        </Button>
      </div>

      <div
        className="actions"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <Button
          onClick={handleSubmit}
          variant="success"
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            width: "40%",
            backgroundColor: "#6263b6",
            borderColor: "#d1aadf",
            color: "#fff",
          }}
        >
          Save and Submit
        </Button>
      </div>
    </Container>
  );
}

export default Register;
