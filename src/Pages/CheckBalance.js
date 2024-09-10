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
import NavbarComponent from "./NavbarComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../assets/image3.jpeg";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const CheckBalance = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [balance, setBalance] = useState("");
  const [numberError, setNumberError] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [checkingDone, setCheckingDone] = useState(false);
  const navigate = useNavigate();

  const handleCheckBalance = async () => {
    setLoading(true);
    setBalance("");

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
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    accountNumber !== "" && ifscCode !== "" && numberError === "";

  const handleAccountNumberChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setAccountNumber(inputValue);
      setNumberError("");
    } else {
      setNumberError("Account number must be numeric");
    }
  };

  return (
    <>
      <NavbarComponent />
      <div
        className="position-fixed w-100 h-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(45%)",
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
            backgroundColor: "rgba(255, 255, 255, 0.5)", 
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
                <div
                  className="mt-3 text-center"
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "bold",
                    color: balance === "Invalid account details." ? "#C41E3A" : "green",
                  }}
                >
                  {balance}
                </div>

                <Row className="mt-4">
                  <Col className="text-center">
                    {balance !== "Invalid account details." ? (
                      <>
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
                      </>
                    ) : (
                      <>

                      <Button
                      variant="secondary"
                      className="me-3"
                      onClick={() => navigate("/")}
                    >
                      Home
                    </Button>

                      <Button
                        variant="primary"
                        onClick={() => {
                          setCheckingDone(false);
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
