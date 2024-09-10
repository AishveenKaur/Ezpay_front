/**
 * Home Component
 * 
 * Module Description:
 * The Home component serves as the landing page for the EZPay application. 
 * It features a dynamic background that cycles through local images with a blur effect, 
 * overlaid by welcoming text content. The component uses React hooks for state management 
 * and effects, along with Bootstrap for styling and layout.
 * 
 * Author: Adithya Mode
 * Date: September 10, 2024
 */

import React, { useState, useEffect } from "react";
import { Container, Card , Carousel, Button} from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Import your local images
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import image4 from "../assets/image4.jpeg";
import image5 from "../assets/image5.jpeg";
import slideImage1 from "../assets/slideImage1.jpg";
import slideImage2 from "../assets/slideImage2.jpeg";
import slideImage3 from "../assets/slideImage3.jpeg";
import slideImage4 from "../assets/slideImage4.png";


const Home = () => {
  // State to manage the currently displayed image
  const [currentImage, setCurrentImage] = useState(0);

  // Array of local images for background
  const backgroundImages = [image1, image2, image3, image4, image5];

  const navigate = useNavigate();

  // useEffect to handle the image transition effect every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % backgroundImages.length);
    }, 4000); // Change image every 4 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Handle navigation to the payments page
  const handlePaymentsRedirect = () => {
    navigate("/Payment");
  };

  return (
    <>
      {/* Navbar component */}
      <NavbarComponent />
      <div className="position-relative vh-100 d-flex flex-column align-items-center justify-content-center">
        {/* Blurred background image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${backgroundImages[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)", // Apply blur effect
            transition: "background-image 0.5s ease-in-out",
            zIndex: 1,
          }}
        ></div>

        {/* Text content on top of the blurred background */}
        <Container
          className="text-center d-flex flex-column align-items-center justify-content-center position-relative"
          style={{ zIndex: 2 }}
        >
          {/* <Card className="bg-light bg-opacity-75 border-0 p-4 shadow-lg">
            <Card.Body>
              <Card.Title className="display-1 fw-bold text-dark">
                Welcome to EZPay
              </Card.Title>
              <Card.Text className="lead mt-3 text-dark">
                Your one-stop solution for easy and secure payments.
              </Card.Text>
            </Card.Body>
          </Card> */}
        </Container>

        
        {/* Carousel content on top of the blurred background */}
        <Container
          className="text-center d-flex flex-column align-items-center justify-content-center position-relative"
          style={{ zIndex: 2 }}
        >
          <Carousel style={{ border: "5px solid #007bff", borderRadius: "10px",backgroundColor: "white" }}>
            {/* Slide 1 */}
            <Carousel.Item>
              <div className="d-flex align-items-center justify-content-center">
              <div className="text-left me-4">
                  <h2 className="fw-bold text-dark">
                    Welcome to EZPay
                  </h2>
                  <p className="lead text-dark">
                    Your one-stop solution for easy and secure payments.
                  </p>
                </div>
                <img
                  src={slideImage1}
                  alt="Fast & Secure Transactions"
                  className="img-fluid"
                  style={{ width: "400px", height: "auto" }}
                />
                {/* <h1 className="display-1 fw-bold text-dark">
                  Welcome to EZPay
                </h1>
                <p className="lead mt-3 text-dark">
                  Your one-stop solution for easy and secure payments.
                </p> */}
              </div>
            </Carousel.Item>

            {/* Slide 2 - Heading with image on the left */}
            <Carousel.Item>
              <div className="d-flex align-items-center justify-content-center">
                <div className="text-left me-4">
                  <h2 className="fw-bold text-dark">
                    Fast & Secure Transactions
                  </h2>
                  <p className="lead text-dark">
                    With EZPay,<br/> your transactions are processed quickly and
                    securely.
                  </p>
                </div>
                <img
                  src={slideImage2}
                  alt="Fast & Secure Transactions"
                  className="img-fluid"
                  style={{ width: "400px", height: "auto" }}
                />
              </div>
            </Carousel.Item>

            {/* Slide 3 - Heading with image on the left */}
            <Carousel.Item>
              <div className="d-flex align-items-center justify-content-center">
                <div className="text-left me-4">
                  <h2 className="fw-bold text-dark">
                    <p>Manage Your Payments<br/>
                    with Ease</p>
                  </h2>
                  <p className="lead text-dark">
                    Track your transactions<br/> and manage payments efficiently.
                  </p>
                </div>
                <img
                  src={slideImage3}
                  alt="Manage Your Payments with Ease"
                  className="img-fluid"
                  style={{ width: "400px", height: "auto" }}
                />
              </div>
            </Carousel.Item>

            {/* Slide 4 - Heading, Button, and Image on the right */}
            <Carousel.Item>
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={slideImage4}
                  alt="Start Making Payments"
                  className="img-fluid me-4"
                  style={{ width: "400px", height: "auto" }}
                />
                <div className="text-right">
                  <h2 className="fw-bold text-dark">
                    Ready to Make Payments?
                  </h2>
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={handlePaymentsRedirect}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </Container>
      </div>
    </>
  );
};

export default Home;
