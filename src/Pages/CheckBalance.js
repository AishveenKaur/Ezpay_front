import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Spinner,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../assets/image3.jpeg";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const CheckBalance = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState("");
  const [numberError, setNumberError] = useState(""); // Error for invalid account number
  const [ifscError, setIfscError] = useState(""); // Error for invalid IFSC code
  const [loading, setLoading] = useState(false);
  const [checkingDone, setCheckingDone] = useState(false);
  const navigate = useNavigate();

  const handleCheckBalance = async () => {
    setLoading(true);
    setBalance("");
    setError("");

    try {
      const response = await axios.get(
        `${BASE_URL}/api/payment/bank/check-balance`,
        {
          params: {
            accountNumber,
            ifscCode,
          },
        }
      );
      setBalance(response.data);
      setCheckingDone(true);
    } catch (err) {
      setError(
        "Error retrieving balance. Please check the account number and IFSC code."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAccountNumberChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setAccountNumber(inputValue);
      setNumberError("");
    } else if (inputValue.length > 0) {
      setNumberError("Account number must be numeric and between 6 to 18 digits.");
    } else {
      setNumberError("");
    }
  };
  const handleIfscCodeChange = (e) => {
    const inputValue = e.target.value.toUpperCase(); // Convert to uppercase automatically
    setIfscCode(inputValue);
    if (/^[A-Z]{4}[0-9A-Z]{7}$/.test(inputValue)) {
      setIfscError("");
    } else if (inputValue.length > 0) {
      setIfscError("IFSC code must be 11 characters: 4 letters followed by alphanumeric.");
    } else {
      setIfscError("");
    }
  };
  const isFormValid =
    accountNumber !== "" && ifscCode !== "" && numberError === "" && ifscError === "";
  return (
    <>
      <NavbarComponent />
      <div
        className="position-fixed w-100 h-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: " 90% center",
          filter: "blur(8px) brightness(50%)",
          zIndex: -1,
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
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent entry container
            zIndex: 1,
          }}
        >
          <Card.Body>
            {!checkingDone ? (
              <>
                <h2 className="text-center mb-4" style={{ color: "black" }}>
                  Check Balance
                </h2>
                <Form>
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
                    {numberError && (
                      <div style={{ color: "red", fontSize: "0.9em" }}>
                        {numberError}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="ifscCode" className="mb-3">
                    <Form.Label style={{ fontSize: "1.25em", color: "black" }}>
                      IFSC Code
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter IFSC Code"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      style={{ fontSize: "1em" }}
                    />
                  </Form.Group>
                  <Row className="text-center">
                    <Col>
                      <Button
                        variant="primary"
                        onClick={handleCheckBalance}
                        className="mt-3"
                        disabled={!isFormValid || loading}
                      >
                        {loading ? (
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
                {balance && (
                  <div
                    className="mt-3 text-center"
                    style={{
                      fontSize: "1.5em",
                      fontWeight: "bold",
                      color: "green",
                    }}
                  >
                    {balance}
                  </div>
                )}
                {error && (
                  <Alert variant="danger" className="mt-3 text-center">
                    {error}
                  </Alert>
                )}

                <Row className="mt-4">
                  <Col className="text-center">
                    <Button
                      variant="secondary"
                      className="me-3"
                      onClick={() => navigate("/")}
                    >
                      Home
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => navigate("/payment-history")}
                    >
                      View Transactions
                    </Button>
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
