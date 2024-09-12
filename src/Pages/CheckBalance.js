/**
 * CheckBalance.js
 * 
 * This component allows users to check their bank balance by entering an account number and IFSC code.
 * It sends a request to the backend API to fetch the balance, handles form validation, loading states, and error handling.
 * The UI displays the bank balance or an error message after checking is done.
 * 
 * Author: Hasini Sai Ramya
 * Date: September 10, 2024
 */

import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Spinner,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import NavbarComponent from "./NavbarComponent"; // Custom navigation bar component
import { useNavigate } from "react-router-dom";  // React Router's navigation hook
import axios from "axios";                      // Axios for making HTTP requests
import backgroundImage from "../assets/image3.jpeg"; // Background image
const BASE_URL = process.env.REACT_APP_BASE_URL; // Base URL for API calls

const CheckBalance = () => {
  // Define the state variables to manage form inputs, balance, loading, and error messages
  const [accountNumber, setAccountNumber] = useState("");  // Account number input
  const [ifscCode, setIfscCode] = useState("");            // IFSC code input
  const [balance, setBalance] = useState("");              // Holds the balance or error message
  const [numberError, setNumberError] = useState("");      // Error message for invalid account number
  const [loading, setLoading] = useState(false);           // Loading state during API call
  const [checkingDone, setCheckingDone] = useState(false); // State for whether balance check is completed
  const navigate = useNavigate();                          // Hook for navigation

  // Function to handle balance check by making an API request
  const handleCheckBalance = async () => {
    setLoading(true);     // Show loading indicator
    setBalance("");       // Reset balance before new check

    try {
      // Make GET request to backend API with account number and IFSC code as query params
      const response = await axios.get(`${BASE_URL}/api/payment/bank/check-balance`, {
        params: {
          accountNumber,
          ifscCode,
        },
      });
      setBalance(response.data);  // Set the balance returned by the API
      setCheckingDone(true);      // Mark checking as completed
    } catch (error) {
      setBalance("Error fetching balance. Please try again."); // Handle API errors
      setCheckingDone(true);
    } finally {
      setLoading(false); // Stop loading once API call is done
    }
  };

  // Validates that the form is filled correctly
  const isFormValid = accountNumber !== "" && ifscCode !== "" && numberError === "";

  // Handles changes to the account number input, allowing only numeric values
  const handleAccountNumberChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setAccountNumber(inputValue);
      setNumberError("");  // Clear error if valid
    } else {
      setNumberError("Account number must be numeric");  // Set error if input is non-numeric
    }
  };

  return (
    <>
      <NavbarComponent /> {/* Render navigation bar */}
      <div
        className="position-fixed w-100 h-100"
        style={{
          backgroundImage: `url(${backgroundImage})`, // Apply background image with blur and brightness filters
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(45%)",
          zIndex: -1,  // Ensure background is behind other elements
        }}
      ></div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Card
          className="w-50 shadow-sm"
          style={{
            maxWidth: "800px",
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent background for card
            zIndex: 1, // Ensure card appears above background
          }}
        >
          <Card.Body>
            {!checkingDone ? ( // Show form if balance hasn't been checked yet
              <>
                <h2 className="text-center mb-4" style={{ color: "black" }}>
                  Check Balance
                </h2>
                <Form>
                  {/* Account Number input field */}
                  <Form.Group controlId="accountNumber" className="mb-3">
                    <Form.Label style={{ fontSize: "1.25em", color: "black" }}>
                      Account Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Account Number"
                      value={accountNumber}
                      onChange={handleAccountNumberChange}
                      style={{ fontSize: "1em" }}
                    />
                    {numberError && ( // Show error if account number is invalid
                      <div style={{ color: "red", fontSize: "0.9em" }}>
                        {numberError}
                      </div>
                    )}
                  </Form.Group>

                  {/* IFSC Code input field */}
                  <Form.Group controlId="ifscCode" className="mb-3">
                    <Form.Label style={{ fontSize: "1.25em", color: "black" }}>
                      IFSC Code
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter IFSC Code"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)} // Update IFSC code on input change
                      style={{ fontSize: "1em" }}
                    />
                  </Form.Group>

                  {/* Button to check balance */}
                  <Row className="text-center">
                    <Col>
                      <Button
                        variant="primary"
                        onClick={handleCheckBalance}
                        className="mt-3"
                        disabled={!isFormValid || loading} // Disable button if form is invalid or loading
                      >
                        {loading ? (  // Show spinner while loading
                          <>
                            <Spinner animation="border" size="sm" /> Checking...
                          </>
                        ) : (
                          "Check Balance"
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </>
            ) : (
              <>
                {/* Display balance or error message */}
                <div
                  className="mt-3 text-center"
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "bold",
                    color:
                      balance === "Invalid account details." || balance.startsWith("Error")
                        ? "#C41E3A"  // Red color for errors
                        : "green",   // Green for successful balance
                  }}
                >
                  {balance}
                </div>

                {/* Navigation buttons after checking balance */}
                <Row className="mt-4">
                  <Col className="text-center">
                    {balance !== "Invalid account details." ? (  // Show buttons if valid balance
                      <>
                        <Button
                          variant="secondary"
                          className="me-3"
                          onClick={() => navigate("/")} // Navigate to home
                        >
                          Home
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => navigate("/payment-history")} // Navigate to view transactions
                        >
                          View Transactions
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="secondary"
                          className="me-3"
                          onClick={() => navigate("/")} // Navigate to home on error
                        >
                          Home
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setCheckingDone(false);  // Reset form and try again
                            setAccountNumber("");
                            setIfscCode("");
                          }}
                        >
                          Try Again
                        </Button>
                      </>
                    )}
                  </Col>
                </Row>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CheckBalance; 
