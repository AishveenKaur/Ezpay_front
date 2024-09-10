import React, { useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PaymentContext } from "../security/PaymentContext";

/**
 * PaymentFailure Page
 *
 * This page displays a message indicating that the payment has failed, either due to an expired OTP.
 * The user can retry the payment process by clicking the "Retry Payment" button, which resets the payment state and navigates them back to the payment page.
 *
 * Author: Deepak Reddy Bijivemula
 * Date: September 10, 2024
 */
const PaymentFailurePage = () => {
  const navigate = useNavigate();
  const { setPaymentState } = useContext(PaymentContext);

  // Handle retry button click to reset payment state and navigate back to the payment page
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
            Your OTP has expired. Please retry the payment
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

export default PaymentFailurePage;
