/**
 * @module TransactionHistory
 * @description This module provides a React component to display transaction history based on the user's choice
 * of either UPI ID or bank account number. It allows the user to input the relevant information, fetch transaction
 * data from a backend API, and display the transactions in a table format. The module includes form validation
 * for numeric inputs and ensures that the input fields are reset when switching between options.
 * 
 * Author: Adithya Mode
 * Date: September 10, 2024
 */

import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import NavbarComponent from "./Navbar";
import backgroundImage from "../assets/image4.jpeg"; // Background image for styling
import { BASE_URL } from "../Config";

const TransactionHistory = () => {
  // State to handle UPI ID input
  const [upiId, setUpiId] = useState("");
  // State to handle account number input
  const [accountNumber, setAccountNumber] = useState("");
  // State to store fetched transaction data
  const [transactions, setTransactions] = useState([]);
  // State to handle the option selected by the user (UPI or Account)
  const [option, setOption] = useState("account"); // Default to account option

  /**
   * @function handleCheckTransactions
   * @description Fetches transactions based on the selected option (UPI or Account).
   */
  const handleCheckTransactions = async () => {
    let url;
    if (option === "upi") {
      url = `${BASE_URL}/api/payment/upi/transactionHistory/${upiId}`;
    } else if (option === "account") {
      url = `${BASE_URL}/api/payment/bank/transactions/${accountNumber}`;
    }

    if (url) {
      try {
        const response = await axios.get(url);
        setTransactions(response.data); // Set transactions data
      } catch (error) {
        console.error("Error fetching transactions:", error); // Log error if any
      }
    }
  };

  /**
   * @function handleOptionChange
   * @description Handles the changes when switching between UPI and Account options.
   * Clears previous transactions and resets input fields.
   * @param {string} newOption - The selected option (UPI or Account).
   */
  const handleOptionChange = (newOption) => {
    setOption(newOption);
    setTransactions([]); // Clear previous transactions
    setUpiId(""); // Clear UPI ID input
    setAccountNumber(""); // Clear Account Number input
  };

  /**
   * @function handleAccountNumberChange
   * @description Validates that only numbers are allowed in the account number input field.
   * @param {object} e - The input event object.
   */
  const handleAccountNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Allow only numeric input
      setAccountNumber(value);
    }
  };

  /**
   * @function handleUpiIdChange
   * @description Validates that no negative numbers are entered in the UPI ID field.
   * @param {object} e - The input event object.
   */
  const handleUpiIdChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith("-")) { // Prevent negative numbers
      setUpiId(value);
    }
  };

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
        <div className="container mt-5 pt-4 position-relative" style={{ zIndex: 1 }}>
          <div className="d-flex justify-content-center mb-4">
            <div
              className="card border-primary shadow-lg p-4"
              style={{
                maxWidth: "800px",
                backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent entry container
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
                        Check
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
                        Check
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
                backgroundColor: "rgba(255, 255, 255, 0.4)", // Transparent transactions container
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
                      backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent transactions table
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
                                {new Date(
                                  transaction.date
                                ).toLocaleDateString()}
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
                                {new Date(
                                  transaction.transactionDate
                                ).toLocaleDateString()}
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
    </>
  );
};

export default TransactionHistory;
