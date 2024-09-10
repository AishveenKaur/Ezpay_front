import React, { useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PaymentContext } from "../security/PaymentContext";

/**
 * PaymentSuccess Page
 *
 * Displays a confirmation message and transaction details upon successful payment.
 * The user can view the transaction details (sender/receiver information, amount, and purpose) and return to the home page.
 *
 * Author: Deepak Reddy Bijivemula
 * Date: September 10, 2024
 */
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { paymentState, setPaymentState } = useContext(PaymentContext);

  // Extract transaction details from payment state
  const {
    paymentMethod,
    senderAccountNumber,
    receiverAccountNumber,
    senderUpiId,
    receiverUpiId,
    amount,
    purpose,
    note,
  } = paymentState || {};

  // Get the current date and time for the transaction
  const transactionDateTime = new Date().toLocaleString();

  // Handle button click to reset payment state and navigate to home page
  const handleHomeClick = () => {
    setPaymentState(null);
    navigate("/");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card
        className="text-center shadow-lg p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <Card.Body>
          <Card.Title className="mb-4 text-success">
            Payment Successful!
          </Card.Title>
          <Card.Text className="mb-4">
            Thank you for your payment. Your transaction was processed
            successfully.
          </Card.Text>

          {/* Conditional rendering based on payment method */}
          {paymentMethod === "account" && (
            <>
              <Row className="mb-3">
                <Col>
                  <strong>Sender Account:</strong>{" "}
                  <span>{senderAccountNumber}</span>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <strong>Receiver Account:</strong>{" "}
                  <span>{receiverAccountNumber}</span>
                </Col>
              </Row>
            </>
          )}
          {paymentMethod === "upi" && (
            <>
              <Row className="mb-3">
                <Col>
                  <strong>Sender UPI ID:</strong> <span>{senderUpiId}</span>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <strong>Receiver UPI ID:</strong> <span>{receiverUpiId}</span>
                </Col>
              </Row>
            </>
          )}

          <Row className="mb-3">
            <Col>
              <strong>Amount Paid:</strong> <span>₹{amount}</span>
            </Col>
          </Row>
          {purpose && (
            <Row className="mb-3">
              <Col>
                <strong>Purpose:</strong> <span>{purpose}</span>
              </Col>
            </Row>
          )}
          {note && (
            <Row className="mb-3">
              <Col>
                <strong>Note:</strong> <span>{note}</span>
              </Col>
            </Row>
          )}
          <Row className="mb-4">
            <Col>
              <strong>Date & Time:</strong> <span>{transactionDateTime}</span>
            </Col>
          </Row>

          <Button variant="primary" onClick={handleHomeClick}>
            Go to Home
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
