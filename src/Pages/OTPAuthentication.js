import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { PaymentContext } from "../security/PaymentContext";
import { BASE_URL } from "../Config";

const OtpAuthentication = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [loading, setLoading] = useState(false); // New loading state
  const { paymentState, setPaymentState } = useContext(PaymentContext);

  // Extract payment details from location state
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

  useEffect(() => {
    // Countdown timer for 5 minutes
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // Clear interval on component unmount
      return () => clearInterval(timerId);
    } else {
      // Show notification and redirect to payment failure page if time runs out
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
          {/* Display the OTP sent message */}
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
              disabled={loading}
            >
              {loading ? "Processing..." : "Verify OTP"}
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

export default OtpAuthentication;
