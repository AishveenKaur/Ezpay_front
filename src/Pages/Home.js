import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import NavbarComponent from "./Navbar";

// Import your local images
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import image4 from "../assets/image4.jpeg";
import image5 from "../assets/image5.jpeg";

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Array of local images
  const backgroundImages = [image1, image2, image3, image4, image5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % backgroundImages.length);
    }, 4000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <>
      <NavbarComponent />
      <div
        className="position-relative vh-100 d-flex flex-column align-items-center justify-content-center"
      >
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
          <Card className="bg-light bg-opacity-75 border-0 p-4 shadow-lg">
            <Card.Body>
              <Card.Title className="display-1 fw-bold text-dark">
                Welcome to EZPay
              </Card.Title>
              <Card.Text className="lead mt-3 text-dark">
                Your one-stop solution for easy and secure payments.
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Home;
