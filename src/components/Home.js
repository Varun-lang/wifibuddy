import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaWifi, FaRegUser } from "react-icons/fa"; // Icons to enhance visual appeal
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  const navigateOwner = () => {
    navigate("/register");
  };

  const navigateUser = () => {
    navigate("/display");
  };

  return (
    <div className="home-page">
      {/* Main Container */}
      <Container className="text-center py-5">
        {/* Heading and Inspirational Quotes */}
        <h1 className="main-title">Welcome to WifiBuddy</h1>
        <p className="quote">
          "Join the growing network and eliminate unused high-paying internet
          costs."
        </p>

        {/* Description */}
        <p className="description">
          😒 Tired of paying for unused bandwidth? <br />
          Share your connection with neighbors and split your Wi-Fi bills in
          half. Connect, collaborate, and create a more affordable internet
          experience for everyone! 😊
        </p>

        {/* Action Buttons */}
        <Row className="mt-4 action-cards-row">
          <Col md={6} className="mb-3">
            <Card className="action-card">
              <Card.Body>
                <FaWifi size={50} className="action-icon" />
                <h3>Register Yourself</h3>
                <p>Share your Wi-Fi, save on bills.🔒</p>
                <Button
                  variant="primary"
                  className="action-button"
                  onClick={navigateOwner}
                >
                  Register as Wi-Fi Owner
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card className="action-card">
              <Card.Body>
                <FaRegUser size={50} className="action-icon" />
                <h3>Access WiFi</h3>
                <p>
                  Find available WiFi in your locality and save on data costs.🔑
                </p>
                <Button
                  variant="secondary"
                  className="action-button"
                  onClick={navigateUser}
                >
                  Access Nearby Wi-Fi
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Customer Reviews */}
        <div className="customer-reviews mt-5">
          <h2>
            ✨<u>What Our Community Says:</u>
          </h2>
          <Row>
            <Col md={4}>
              <Card className="review-card">
                <Card.Body>
                  <h5>John D.</h5>
                  <p>
                    "WifiBuddy helped me cut my internet bills in half! I can
                    now enjoy the internet with my neighbors without worrying
                    about excessive costs. Highly recommend!👍"
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="review-card">
                <Card.Body>
                  <h5>Ashish V.</h5>
                  <p>
                    "It's so easy to use and the community is amazing! No more
                    overpaying for Wi-Fi. Sharing is caring, and WifiBuddy is
                    the perfect way to do it!"
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="review-card">
                <Card.Body>
                  <h5>Sukriti R.</h5>
                  <p>
                    "As a Wi-Fi owner, I love sharing my connection and saving
                    on my bills. It’s a win-win for everyone in the
                    neighborhood!🤩"
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Contact Us Section */}
        <div className="contact-us mt-5">
          <h2>📩 Contact Us</h2>
          <p>
            Have any questions or need support? Reach out to us at{" "}
            <a href="mailto:contactme.owner247@gmail.com">
              contactme.owner247@gmail.com
            </a>
            .
          </p>
          <Button
            variant="outline-primary"
            onClick={() =>
              (window.location = "mailto:contactme.owner247@gmail.com")
            }
          >
            Send us an email
          </Button>
        </div>
      </Container>

      {/* Custom Styles */}
      <style>
        {`
          .home-page {
            background-color: #f4f8fc;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .main-title {
            font-size: 36px;
            font-weight: bold;
            color: #007bff;
            margin-bottom: 20px;
          }

          .quote {
            font-size: 20px;
            font-style: italic;
            color: #555;
            margin-bottom: 20px;
          }

          .description {
            font-size: 18px;
            color: #333;
            max-width: 700px;
            margin-bottom: 30px;
          }

          .action-cards-row {
            display: flex;
            justify-content: space-between;
          }

          .action-card {
            border-radius: 8px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
            width: 100%;
          }

          .action-card h3 {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin-top: 10px;
          }

          .action-card p {
            font-size: 16px;
            color: #777;
          }

          .action-icon {
            color: #007bff;
          }

          .action-button {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 18px;
            border-radius: 5px;
          }

          .action-button:hover {
            opacity: 0.9;
          }

          .home-page .row {
            max-width: 800px;
          }

          .customer-reviews {
            background-color: #f4f8fc;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            max-width: 1000px;
            margin-top: 20px;
          }

          .customer-reviews h3 {
            text-align: center;
            font-size: 28px;
            margin-bottom: 30px;
          }

          .review-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
          }

          .review-card h5 {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #319;
          }

          .review-card p {
            font-size: 16px;
            color: #525;
          }

          .contact-us {
            background-color: #f4f2fc;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          .contact-us h2 {
            font-size: 28px;
            color: #007bff;
            margin-bottom: 20px;
          }

          .contact-us p {
            font-size: 16px;
            color: #555;
          }

          .contact-us a {
            color: #007bff;
            text-decoration: none;
          }

          .contact-us a:hover {
            text-decoration: underline;
          }

          .contact-us button {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            background-color: #007bff;
            color: white;
          }

          .contact-us button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
}

export default Home;
