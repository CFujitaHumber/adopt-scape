"use client";
/**
 * @author Carson Fujita
 * @copyright Carson FUjita, 2025
 */
import Navigation from "./components/Navbar/navbar";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export enum Theme {
  Light,
  Dark
}

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");

  const [intervalid, setIntervalid] = useState(setInterval(()=>{}, 2000));

  
  useEffect(()=> {
    const fetchImage = () => {
      fetch("https://random.dog/woof.json?include=jpg,gif,png,webp").then(async(response) => {
        const json = await response.json();
        setImageUrl(json.url);
      }).catch((error)=>console.error("Error Fetching Image:", error));
    }

    //get an image now
    fetchImage();

    //set interval to fetch a new image every 5 seconods
    clearInterval(intervalid);
    const id = setInterval(fetchImage, 10000);
    setIntervalid(id);

    //Clean up to clear inveral when component unmounts
    return () => clearInterval(id);
  }, [])

  return (
    <>
        <header>
            <Navigation />
            <Container className=" bg-body-tertiary text-dark text-center" fluid>
              <p>Pretend this is a cool fact</p>
            </Container>
        </header>
        <Container fluid as={"main"}>
          <Row className=" bg-body-secondary p-5">
            <Col className="" style={{margin: "auto 0", marginRight: 0}}>
              <h1 className=" text-dark " style={{textAlign: "right"}}>Welcome To AdoptScape</h1>
            </Col>
            <Col>
              {imageUrl ? <img src={imageUrl} style={{width: "auto", height: 500}} alt="Random Image of Dog"/> : <p>Loading...</p>}
            </Col>
          </Row>
          <Row style={{marginTop: "2rem"}}>
            <Col>
              <h2>Title</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae modi labore quam reiciendis tempora numquam corrupti distinctio dolores, inventore fugit animi enim, quis quo dolore error est ipsa delectus qui?</p>
            </Col>
            <Col>
            <h2>Title 2</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi officiis voluptates ex quod nulla enim assumenda sunt laudantium, sit vel eum odit ut facere beatae libero exercitationem. Provident, minima consectetur!</p>
            </Col>
          </Row>
        </Container>
    </>
  );
}
