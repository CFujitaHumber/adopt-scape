"use client";
import Navigation from "../components/Navbar/navbar";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
export default function Home() {
  const [imageUrl, setImageUrl] = useState("");

  const [intervalid, setIntervalid] = useState(setInterval(()=>{}, 2000));

  const email = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLTextAreaElement>(null);

  
//   useEffect(()=> {
//     const fetchImage = () => {
//       fetch("https://random.dog/woof.json?include=jpg,gif,png,webp").then(async(response) => {
//         const json = await response.json();
//         setImageUrl(json.url);
//       }).catch((error)=>console.error("Error Fetching Image:", error));
//     }

//     //get an image now
//     fetchImage();

//     //set interval to fetch a new image every 5 seconods
//     clearInterval(intervalid);
//     const id = setInterval(fetchImage, 10000);
//     setIntervalid(id);

//     //Clean up to clear inveral when component unmounts
//     return () => clearInterval(id);
//   }, [])



  const handleSubmit = (e: FormEvent) =>{
    e.preventDefault();
    const re = /[a-zA-Z]+@[a-zA-z]+.[a-zA-Z]+/g;
    console.log(email.current);
    
    if(email.current != null && re.test(email.current.value)){
       alert(`Post Submitted from ${email.current.value}`);
    }
  }

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
            <Col>
              {imageUrl ? <img src={imageUrl} style={{width: "auto", height: 500}} alt="Random Image of Dog"/> : (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </Col>
            <Col>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" ref={email} placeholder="name@example.com"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control ref={message} as="textarea" rows={3} />
                </Form.Group>
                <Form.Control type="submit" />
            </Form>
            </Col>
          </Row>
        </Container>
    </>
  );
}
