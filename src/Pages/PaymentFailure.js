import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PaymentContext } from "../security/PaymentContext";
import { useContext } from "react";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const { setPaymentState } = useContext(PaymentContext);

  const handleRetryClick = () => {
    setPaymentState(null);
    navigate("/payment");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="text-center shadow-lg p-4" style={{ maxWidth: "500px" }}>
        <Card.Body>
          <Card.Title className="mb-3 text-danger">Payment Failed!</Card.Title>
          <Card.Text className="mb-4">
            Your OTP has expired or was invalid. Please retry the payment
            process.
          </Card.Text>
          <Button variant="primary" onClick={handleRetryClick}>
            Retry Payment
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentFailure;
