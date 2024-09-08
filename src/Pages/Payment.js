import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Row,
  Col,
} from "react-bootstrap";
import NavbarComponent from "./Navbar";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("account");

  return (
    <>
      <NavbarComponent />
      <Container className="mt-5 pt-4">
        <h2>Make a Payment</h2>
        <ToggleButtonGroup
          type="radio"
          name="paymentMethod"
          value={paymentMethod}
          onChange={setPaymentMethod}
          className="mb-3"
        >
          <ToggleButton id="tbg-radio-1" value="account">
            Pay by Account Number and IFSC
          </ToggleButton>
          <ToggleButton id="tbg-radio-2" value="upi">
            Pay by UPI ID
          </ToggleButton>
        </ToggleButtonGroup>

        {paymentMethod === "account" ? (
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="accountNumber">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Account Number"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="ifscCode">
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control type="text" placeholder="Enter IFSC Code" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3">
              Pay
            </Button>
          </Form>
        ) : (
          <Form>
            <Form.Group controlId="upiId">
              <Form.Label>UPI ID</Form.Label>
              <Form.Control type="text" placeholder="Enter UPI ID" />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Pay
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};

export default Payment;
