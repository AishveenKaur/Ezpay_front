// src/components/Home.js
import React from "react";
import { Container, Card } from "react-bootstrap";
import NavbarComponent from "./Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <>
      <NavbarComponent />
      <Container className="mt-5 pt-4">
        <Card className="text-center">
          <Card.Body>
            <Card.Title><h1>Welcome to EZPay</h1></Card.Title>
            <Card.Text>
              <h2>Your one-stop solution for easy and secure payments.</h2>
            </Card.Text>
            <Card.Img variant="top" src="assests\images\EzpayLogo.jpg" />
          </Card.Body>
        </Card>
        <Row>
          <Col>
            <Card className="text-center" style={{ minHeight: '500px' }}>
              <Card.Body>
              <Card.Title><h2>Payments Made Easy</h2>
              </Card.Title>
              <Card.Text>
                <img src="assests\images\Logo2.jpg" width="300" style={{borderRadius:"500%"}}></img><br/>
                <ul>
                  <li>Secure and Efficient Digital Payment</li>
                  <li>Manage transactions on a click</li>
                </ul>
                <br/>
              </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          <Card className="text-center" style={{ minHeight: '500px' }}>
            <Card.Body>
            <img src="assests\images\transactionIMG.jpeg" width="250" style={{borderRadius:"500%"}} class="center"/>
            <img src="assests\images\transaction2.avif" width="200" style={{borderRadius:"500%"}} class="center"/>
            <img src="assests\images\banking.jpeg" width="200" height="170"style={{borderRadius:"500%"}} class="center"/>
            <img src="assests\images\images.png" width="200" style={{borderRadius:"500%"}} class="center"/>
            </Card.Body>
          </Card>
          
          </Col>
        </Row>
        <Row>
          <Col>
          <Card className="text-center" style={{ minHeight: '500px' }}>
            <Card.Body>
              <h2>UPI Payments</h2>
              <img src="assests\images\upiIcon.jpeg" height="200" /><br/>
              <Link to="/upi">
              <button>Pay by UPI</button>
              </Link>
            </Card.Body>
          </Card>
          </Col>
          <Col>
          <Card className="text-center" style={{ minHeight: '500px' }}>
            <Card.Body>
              <h2>Bank Transaction</h2>
                <img src="assests\images\bankTransfer.png" /><br/>
                <Link to="/payment">
                <button>Pay by Account Number</button></Link>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
