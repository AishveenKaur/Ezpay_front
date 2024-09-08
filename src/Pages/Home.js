// src/components/Home.js
import React from "react";
import { Container, Card } from "react-bootstrap";
import NavbarComponent from "./Navbar";

const Home = () => {
  return (
    <>
      <NavbarComponent />
      <Container className="mt-5 pt-4">
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Welcome to EZPay</Card.Title>
            <Card.Text>
              Your one-stop solution for easy and secure payments.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Home;
