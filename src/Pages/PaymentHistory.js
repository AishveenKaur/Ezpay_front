import React, { useState } from "react";
import {
  Container,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "react-bootstrap";
import NavbarComponent from "./Navbar";

const PaymentHistory = () => {
  const [historyType, setHistoryType] = useState("account");

  return (
    <>
      <NavbarComponent />
      <Container className="mt-5 pt-4">
        <h2>Payment History</h2>
        <ToggleButtonGroup
          type="radio"
          name="historyType"
          value={historyType}
          onChange={setHistoryType}
          className="mb-3"
        >
          <ToggleButton id="tbg-radio-3" value="account">
            History by Account Number
          </ToggleButton>
          <ToggleButton id="tbg-radio-4" value="upi">
            History by UPI ID
          </ToggleButton>
        </ToggleButtonGroup>
        <Button variant="primary" className="mt-2">
          Check History
        </Button>
      </Container>
    </>
  );
};

export default PaymentHistory;
