import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import NavbarComponent from "./Navbar";

const CheckBalance = () => {
  const [accountNumber, setAccountNumber] = useState("");

  const handleCheckBalance = () => {
    // API call to check balance based on account number
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-5 pt-4">
        <h2>Check Balance</h2>
        <Form>
          <Form.Group controlId="accountNumber">
            <Form.Label>Enter Account Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleCheckBalance}
            className="mt-3"
          >
            Check Balance
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default CheckBalance;
