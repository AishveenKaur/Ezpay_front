import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { PaymentContext } from "../security/PaymentContext";
const BASE_URL = process.env.REACT_APP_BASE_URL;

/**
 * OTP Authentication Page
 *
 * This page handles OTP verification for payments.
 * It displays a form where users can input the OTP, and verifies the OTP by calling the appropriate API based on the payment method (account or UPI).
 * If the OTP is successfully verified, the user is   edirected to the success page, otherwise, they are prompted to try again.
 * A countdown timer is used to invalidate the OTP after 5 minutes.
 *
 * Author: Deepak Reddy Bijivemula
 * Date: September 10, 2024
 */
const OtpAuthenticationPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(""); // State for OTP input
  const [timeLeft, setTimeLeft] = useState(300); // Countdown timer for 5 minutes (300 seconds)
  const [loading, setLoading] = useState(false); // Loading state to show a spinner during processing
  const { paymentState, setPaymentState } = useContext(PaymentContext); // Access payment state from context
  const [disableVerifyButton, setDisableVerifyButton] = useState(false); // Disable button after OTP success

  // Extract payment details from paymentState (passed from previous payment page)
  const {
    paymentMethod,
    senderAccountNumber,
    senderIfscCode,
    receiverAccountNumber,
    receiverIfscCode,
    amount,
    purpose,
    senderUpiId,
    receiverUpiId,
    note,
  } = paymentState || {};

  // useEffect to handle countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // Clear the interval on component unmount to avoid memory leaks
      return () => clearInterval(timerId);
    } else {
      // If time runs out, show error and redirect to the failure page
      toast.error("OTP expired! Redirecting to Payment Failure page...", {
        onClose: () => navigate("/payment/payment-failure"),
      });
    }
  }, [timeLeft, navigate]);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Handle OTP verification based on payment method
      if (paymentMethod === "account") {
        await axios
          .post(`${BASE_URL}/api/payment/bank/verifyOtpAndTransfer`, {
            senderAccountNumber,
            senderIfscCode,
            otp,
            receiverAccountNumber,
            receiverIfscCode,
            amount,
            purpose,
          })
          .then((res) => {
            if (res.data === "Funds transferred successfully.") {
              setDisableVerifyButton(true);
              toast.success("OTP Verified Successfully!", {
                onClose: () => navigate("/payment/payment-success"),
              });
            } else {
              setOtp("");
              toast.error("Invalid OTP. Please try again.");
            }
          });
      } else if (paymentMethod === "upi") {
        await axios
          .post(`${BASE_URL}/api/payment/upi/verifyOtpAndTransfer`, {
            senderUpiId,
            otp,
            receiverUpiId,
            amount,
            note,
          })
          .then((res) => {
            if (res.data === "Transaction Successful.") {
              setDisableVerifyButton(true);
              toast.success("OTP Verified Successfully!", {
                onClose: () => navigate("/payment/payment-success"),
              });
            } else {
              setOtp("");
              toast.error("Invalid OTP. Please try again.");
            }
          });
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Format time left in mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer position="top-center" autoClose={3000} />
      <Card
        className="p-4 shadow-lg rounded"
        style={{
          maxWidth: "400px",
          width: "100%",
          border: "none",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Card.Body>
          <Card.Title className="text-center mb-4" style={{ color: "#007bff" }}>
            OTP Authentication
          </Card.Title>
          <div className="text-center mb-3" style={{ fontWeight: "bold" }}>
            OTP has been sent to your registered email.
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="otp" className="mb-3">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                required
                className="shadow-sm"
              />
            </Form.Group>
            <div className="text-center mb-3">
              <small style={{ color: timeLeft <= 60 ? "red" : "green" }}>
                Time Left: {formatTime(timeLeft)}
              </small>
            </div>
            <Button
              variant="primary"
              type="submit"
              className="w-100 shadow-sm"
              disabled={loading || disableVerifyButton}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Processing...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link
              to="/"
              className="text-decoration-none"
              style={{ color: "#007bff" }}
              onClick={() => setPaymentState(null)}
            >
              Go back to Home
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OtpAuthenticationPage;
