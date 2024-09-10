import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner, Row, Col, Card } from "react-bootstrap";
import NavbarComponent from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../assets/image5.jpeg"; 

const CheckBalance = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingDone, setCheckingDone] = useState(false);
  const navigate = useNavigate();

  const handleCheckBalance = async () => {
    setLoading(true);
    setBalance("");
    setError("");

    try {
      const response = await axios.get(`http://localhost:8086/api/payment/bank/check-balance`, {
        params: {
          accountNumber,
          ifscCode,
        },
      });
      setBalance(response.data);
      setCheckingDone(true);
    } catch (err) {
      setError("Error retrieving balance. Please check the account number and IFSC code.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = accountNumber !== "" && ifscCode !== "";

  return (
    <>
      <NavbarComponent />
      {/* Background Image */}
      <div
        className="position-fixed w-100 h-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(50%)", // Blur and dim the background
          zIndex: -1,
        }}
      ></div>

      {/* Main Content */}
      <Container className="d-flex justify-content-center align-items-center position-relative" style={{ minHeight: "100vh", zIndex: 1 }}>
        <Card className="w-50 shadow-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}> {/* Adjusted opacity for transparency */}
          <Card.Body>
            {!checkingDone ? (
              <>
                <h2 className="text-center mb-4 text-dark">Check Balance</h2>
                <Form>
                  <Form.Group controlId="accountNumber" className="mb-3">
                    <Form.Label style={{ fontSize: '1.25em', color: 'black' }}>Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Account Number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      style={{ fontSize: '1em' }} 
                    />
                  </Form.Group>
                  <Form.Group controlId="ifscCode" className="mb-3">
                    <Form.Label style={{ fontSize: '1.25em', color: 'black' }}>IFSC Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter IFSC Code"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      style={{ fontSize: '1em' }} 
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
                  <div className="mt-3 text-center" style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'green' }}>
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
