"use client";
import { Col, Container, Row } from "react-bootstrap";
import Navigation from "../components/Navbar/navbar";

export default function About() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <Container as={"main"}>
        <Row className="p-5">
            <Col>
                <h1>AdoptScape</h1>
                <h2>About us</h2>
                <p>
                    The challenge of finding the perfect pet to adopt is knowing where to look. 
                    Our project, AdoptScape, aims to solve this problem by providing a user interface that searches nearby shelters for their perfect pet. 
                    AdoptScape uses user location data, API services, 
                    and user preferences to determine compatible dog or cat breeds and display matching animal in shelters nearby. 
                </p>
            </Col>
            <Col cl>
                <h1>API</h1>
                <p>Two APIs are used throughout this project</p>
                <ol>
                    <li>PetFinder</li>
                    <li>Random.Dog</li>
                </ol>
            </Col>
        </Row>
      </Container>
    </>
  );
}
