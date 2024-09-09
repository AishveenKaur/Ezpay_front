import React, { useState } from "react";
import axios from "axios";
import NavbarComponent from "./Navbar";
import backgroundImage from "../assets/image4.jpeg"; // Replace with your local image path

const TransactionHistory = () => {
  const [upiId, setUpiId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [option, setOption] = useState("account"); // Default to account option

  const handleCheckTransactions = async () => {
    let url;
    if (option === "upi") {
      url = `http://localhost:8086/api/payment/upi/transactionHistory/${upiId}`;
    } else if (option === "account") {
      url = `http://localhost:8086/api/payment/bank/transactions/${accountNumber}`;
    }

    if (url) {
      try {
        const response = await axios.get(url);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
  };

  const handleOptionChange = (newOption) => {
    setOption(newOption);
    setTransactions([]); // Clear previous transactions
    setUpiId(""); // Clear UPI ID input
    setAccountNumber(""); // Clear Account Number input
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
      <div className="container mt-5 pt-4 position-relative" style={{ zIndex: 1 }}>
        <h2 className="text-center mb-5 text-white">Check Transactions</h2>

        <div className="d-flex justify-content-center mb-4">
          <div
            className="card border-primary shadow-lg p-4"
            style={{
              maxWidth: "600px",
              backgroundColor: "rgba(255, 255, 255, 0.9)", // Brighter container
              zIndex: 1,
            }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-center mb-4">
                <button
                  className="btn btn-primary mx-2 w-50"
                  onClick={() => handleOptionChange("upi")}
                >
                  Check Transactions Using UPI ID
                </button>
                <button
                  className="btn btn-secondary mx-2 w-50"
                  onClick={() => handleOptionChange("account")}
                >
                  Check Transactions Using Account Number
                </button>
              </div>

              <div className="d-flex justify-content-center">
                {option === "upi" && (
                  <>
                    <input
                      type="text"
                      id="upiId"
                      name="upiId"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
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
                      onChange={(e) => setAccountNumber(e.target.value)}
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

        {transactions.length > 0 && (
          <div
            className="card shadow-lg border-primary mt-5"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              zIndex: 1,
            }}
          >
            <div className="card-body">
              <h5 className="card-title text-center mb-4 text-dark">
                Transaction Details
              </h5>
              <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered">
                  <thead className="thead-light bg-primary text-white">
                    <tr>
                      {option === "upi" ? (
                        <>
                          <th scope="col">Sender UPI ID</th>
                          <th scope="col">Receiver UPI ID</th>
                          <th scope="col">Amount (₹)</th>
                          <th scope="col">Status</th>
                          <th scope="col">Note</th>
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
    </>
  );
};

export default TransactionHistory;
