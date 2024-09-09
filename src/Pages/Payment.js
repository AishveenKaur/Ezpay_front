import React, { useContext, useState } from "react";
import axios from "axios";
import {Card, CardBody} from "react-bootstrap";
import backgroundImage from "../assets/image2.jpeg";
import {
  Container,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import NavbarComponent from "./Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PaymentContext } from "../security/PaymentContext";

const Payment = () => {
  const navigate = useNavigate();
  const { setPaymentState } = useContext(PaymentContext);
  const [paymentMethod, setPaymentMethod] = useState("account");
  const [senderAccountNumber, setSenderAccountNumber] = useState("");
  const [senderIfscCode, setSenderIfscCode] = useState("");
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [receiverIfscCode, setReceiverIfscCode] = useState("");
  const [senderUpiId, setSenderUpiId] = useState("");
  const [receiverUpiId, setReceiverUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (paymentMethod === "account") {
        await axios
          .post("/api/payment/bank/initiateTransaction", {
            senderAccountNumber,
            senderIfscCode,
            receiverAccountNumber,
            receiverIfscCode,
            amount,
            purpose,
          })
          .then((res) => {
            if (
              res.data ===
              "OTP sent to your registered email. Please verify to complete the transaction."
            ) {
              toast.success("Redirecting to OTP Authentication Page.", {
                onClose: () => {
                  setPaymentState({
                    paymentMethod,
                    senderAccountNumber,
                    senderIfscCode,
                    receiverAccountNumber,
                    receiverIfscCode,
                    amount,
                    purpose,
                  });
                  navigate("/api/payment/otp-auth");
                },
              });
            } else {
              setError(res.data);
            }
          });
      } else {
        await axios
          .post("/api/payment/upi/initiateTransaction", {
            senderUpiId,
            receiverUpiId,
            amount,
            note,
          })
          .then((res) => {
            if (
              res.data ===
              "OTP sent to your registered email. Please verify to complete the transaction."
            ) {
              toast.success("Redirecting to OTP Authentication Page.", {
                onClose: () => {
                  setPaymentState({
                    paymentMethod,
                    senderUpiId,
                    receiverUpiId,
                    amount,
                    note,
                  });
                  navigate("/api/payment/otp-auth");
                },
              });
            } else {
              setError(res.data);
            }
          })
          .catch((err) => {
            setError("An error occurred during the UPI transaction.");
          });
      }
    } catch (err) {
      console.log(err);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when request completes
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
          filter: "blur(8px) brightness(50%)", // Blur and dim the background
          zIndex: -1,
        }}
      ></div>
      <Container className="mt-5 pt-5 justify-content-center align-items-center" >
      <Card className="shadow-sm" style={{ width: '100%', height: '400px' }} >
        <Card.Body>
        <ToastContainer position="top-center" autoClose={3000} />
        <h2 className="mb-4 text-center">Make a Payment</h2>
        <ToggleButtonGroup
          type="radio"
          name="paymentMethod"
          value={paymentMethod}
          onChange={setPaymentMethod}
          className="d-flex justify-content-center mb-4"
        >
          <ToggleButton
            id="tbg-radio-1"
            value="account"
            className={`w-100 text-center ${
              paymentMethod === "account" ? "btn-primary" : "btn-secondary"
            }`}
          >
            Pay by Account Number and IFSC
          </ToggleButton>
          <ToggleButton
            id="tbg-radio-2"
            value="upi"
            className={`w-100 text-center ${
              paymentMethod === "upi" ? "btn-primary" : "btn-secondary"
            }`}
          >
            Pay by UPI ID
          </ToggleButton>
        </ToggleButtonGroup>

        {paymentMethod === "account" ? (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="senderAccountNumber">
                  <Form.Label color="white">Sender Account Number</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Enter Sender Account Number"
                    value={senderAccountNumber}
                    onChange={(e) => setSenderAccountNumber(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="senderIfscCode">
                  <Form.Label>Sender IFSC Code</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Enter Sender IFSC Code"
                    value={senderIfscCode}
                    onChange={(e) => setSenderIfscCode(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="receiverAccountNumber">
                  <Form.Label>Receiver Account Number</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Enter Receiver Account Number"
                    value={receiverAccountNumber}
                    onChange={(e) => setReceiverAccountNumber(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="receiverIfscCode">
                  <Form.Label>Receiver IFSC Code</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Enter Receiver IFSC Code"
                    value={receiverIfscCode}
                    onChange={(e) => setReceiverIfscCode(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <FormControl
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="purpose">
                  <Form.Label>Note</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Enter Note"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-4"
              disabled={loading}
            >
              {loading ? "Processing payment..." : "Pay"}
            </Button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </Form>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="senderUpiId">
                  <Form.Label>Sender UPI ID</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Enter Sender UPI ID"
                    value={senderUpiId}
                    onChange={(e) => setSenderUpiId(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="receiverUpiId">
                  <Form.Label>Receiver UPI ID</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Enter Receiver UPI ID"
                    value={receiverUpiId}
                    onChange={(e) => setReceiverUpiId(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <FormControl
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="note">
                  <Form.Label>Note</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Enter Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-4"
              disabled={loading}
            >
              {loading ? "Processing payment..." : "Pay"}
            </Button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </Form>
        )}
 
      </Card.Body>
      </Card>
      </Container>
      
    </>
  );
};

export default Payment;
