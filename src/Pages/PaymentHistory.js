import React, { useState } from "react";
import { Container, Spinner, Modal, Button, Alert } from "react-bootstrap";
import axios from "axios";
import NavbarComponent from "./Navbar";
import backgroundImage from "../assets/image4.jpeg";

/**
 * TransactionHistory Component
 * 
 * This component allows users to check their transaction history either through UPI ID or Account Number.
 * The results can be a list of transactions, a message (for empty transactions), or an error string.
 * Based on the response from the backend, it dynamically shows a table of transactions or a popup for error/empty results.
 * 
 * Author: Adithya Mode
 * Date: September 10, 2024
 * 
 */
const TransactionHistory = () => {
  const [upiId, setUpiId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [option, setOption] = useState("account");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVariant, setPopupVariant] = useState("info"); 
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  /**
   * Handles checking transactions based on the selected option (UPI ID or Account Number)
   * Displays appropriate feedback (transactions table, error message, or info message) depending on the response.
   */
  const handleCheckTransactions = async () => {
    let url;
    if (option === "upi") {
      url = `${BASE_URL}/api/payment/upi/transactionHistory/${upiId}`;
    } else if (option === "account") {
      url = `${BASE_URL}/api/payment/bank/transactions/${accountNumber}`;
    }

    if (url) {
      setIsLoading(true);
      try {
        const response = await axios.get(url);

        // Check if the response data is a string (error message from backend)
        if (typeof response.data.body === "string") {
          setPopupMessage(response.data.body);
          setPopupVariant("danger"); // Mark as an error message
          setShowPopup(true);
          setTransactions([]); // Clear the transactions state
        } 
        // If the response is an array (transaction history)
        else if (Array.isArray(response.data.body.body)) {
          const sortedTransactions = response.data.body.sort((a, b) => new Date(b.date) - new Date(a.date));

          // If no transactions found
          if (sortedTransactions.length === 0) {
            setPopupMessage("No transactions found.");
            setPopupVariant("info"); // Mark as an informational message
            setShowPopup(true);
            setTransactions([]);
          } else {
            setTransactions(sortedTransactions);
            setShowPopup(false); // Hide popup when transactions are present
          }
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setPopupMessage("An error occurred while fetching transactions.");
        setPopupVariant("danger");
        setShowPopup(true);
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  /**
   * Resets the selected option, clearing input fields and transactions.
   */
  const handleOptionChange = (newOption) => {
    setOption(newOption);
    setTransactions([]);
    setUpiId("");
    setAccountNumber("");
  };

  /**
   * Handles input for account number, ensuring only digits are allowed.
   */
  const handleAccountNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAccountNumber(value);
    }
  };

  /**
   * Handles input for UPI ID, preventing invalid characters at the beginning.
   */
  const handleUpiIdChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith("-")) {
      setUpiId(value);
    }
  };

  return (
    <>
      <NavbarComponent />

      {/* Background Image Styling */}
      <div
        className="position-fixed w-100 h-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(50%)",
          zIndex: -1,
        }}
      ></div>

      {/* Main Content */}
      <Container className="d-flex justify-content-center align-items-center position-relative" style={{ minHeight: "100vh", zIndex: 1 }}>
        <div className="container mt-5 pt-4 position-relative" style={{ zIndex: 1 }}>
          <div className="d-flex justify-content-center mb-4">
            <div
              className="card border-primary shadow-lg p-4"
              style={{
                maxWidth: "800px",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                zIndex: 1,
              }}
            >
              <h2 className="text-center mb-5 text-black">Check Transactions</h2>
              <div className="card-body">
                {/* Option Selection Buttons */}
                <div className="d-flex justify-content-center mb-4">
                  <button
                    className={`btn ${option === "account" ? "btn-primary" : "btn-secondary"} mx-2 w-100`}
                    onClick={() => handleOptionChange("account")}
                  >
                    Check Transactions Using Account Number
                  </button>
                  <button
                    className={`btn ${option === "upi" ? "btn-primary" : "btn-secondary"} mx-2 w-100`}
                    onClick={() => handleOptionChange("upi")}
                  >
                    Check Transactions Using UPI ID
                  </button>
                </div>

                {/* Input fields based on selected option */}
                <div className="d-flex justify-content-center">
                  {option === "upi" && (
                    <>
                      <input
                        type="text"
                        id="upiId"
                        name="upiId"
                        value={upiId}
                        onChange={handleUpiIdChange}
                        placeholder="Enter UPI ID"
                        className="form-control w-75 mr-2"
                      />
                      <button
                        className="btn btn-success"
                        onClick={handleCheckTransactions}
                      >
                        {isLoading ? <Spinner animation="border" size="sm" /> : "Check"}
                      </button>
                    </>
                  )}

                  {option === "account" && (
                    <>
                      <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        value={accountNumber}
                        onChange={handleAccountNumberChange}
                        placeholder="Enter Account Number"
                        className="form-control w-75 mr-2"
                      />
                      <button
                        className="btn btn-success"
                        onClick={handleCheckTransactions}
                      >
                        {isLoading ? <Spinner animation="border" size="sm" /> : "Check"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Table */}
          {transactions.length > 0 && (
            <div
              className="card shadow-lg border-primary mt-5"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                zIndex: 1,
              }}
            >
              <div className="card-body">
                <h5 className="card-title text-center mb-4 text-dark">
                  Transaction Details
                </h5>
                <div className="table-responsive">
                  <table
                    className="table table-striped table-hover table-bordered"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <thead className="thead-light bg-primary text-white">
                      <tr>
                        {option === "upi" ? (
                          <>
                            <th scope="col">Sender UPI ID</th>
                            <th scope="col">Receiver UPI ID</th>
                            <th scope="col">Amount (₹)</th>
                            <th scope="col">Status</th>
                            <th scope="col">Note</th>
                            <th scope="col">Transaction Date</th>
                          </>
                        ) : (
                          <>
                            <th scope="col">Sender Account Number</th>
                            <th scope="col">Receiver Account Number</th>
                            <th scope="col">Amount (₹)</th>
                            <th scope="col">Status</th>
                            <th scope="col">Transaction Date</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          {option === "upi" ? (
                            <>
                              <td>{transaction.senderUpiId}</td>
                              <td>{transaction.receiverUpiId}</td>
                              <td>₹{transaction.amount}</td>
                              <td>
                                <span className="badge bg-success">
                                  {transaction.status}
                                </span>
                              </td>
                              <td>{transaction.note}</td>
                              <td>
                                {new Date(transaction.date).toLocaleString("en-US", {
                                  dateStyle: "short",
                                  timeStyle: "short",
                                })}
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{transaction.senderAccountNumber}</td>
                              <td>{transaction.receiverAccountNumber}</td>
                              <td>₹{transaction.amount}</td>
                              <td>
                                <span className="badge bg-success">
                                  {transaction.status}
                                </span>
                              </td>
                              <td>
                                {new Date(transaction.transactionDate).toLocaleString("en-US", {
                                  dateStyle: "short",
                                  timeStyle: "short",
                                })}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Popup for Errors or Informational Messages */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{popupVariant === "danger" ? "Error" : "Information"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant={popupVariant}>{popupMessage}</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPopup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransactionHistory;
