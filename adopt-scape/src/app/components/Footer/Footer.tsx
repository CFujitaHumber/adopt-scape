import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

export default function Footer(){
    return (
        <footer className="m-0 mt-5 p-0" style={{borderTop: "1px solid grey"}}>
            <Row>
                <Col className="m-3">
                 <Link className=" text-black text-primary navbar-brand" href={"/"}>AdoptScape</Link>
                </Col>
            </Row>
            <Row>
                <Col>
                <Container>
                    <Row>
                        <Col><h5>About Us</h5></Col>
                    </Row>
                    <Row>
                        <Link className="text-black" href={"/about"}>About</Link>
                        <Link className="text-black" href={"/contact"}>Contact</Link>
                    </Row>
                </Container>
                </Col>
                <Col>
                <Container>
                    <Row>
                        <Col><h5>Account</h5></Col>
                    </Row>
                    <Row>
                        <Link className="text-black" href={"/"} >Signup</Link>
                        <Link className="text-black" href={"/"}>Login</Link>
                    </Row>
                </Container>
                </Col>
                <Col>
                <Container>
                    <Row>
                        <Col><h5>Animals</h5></Col>
                    </Row>
                    <Row>
                        <Link className="text-black" href={"/search/animals/cat"}>Cats</Link>
                        <Link className="text-black" href={"/search/animals/dog"}>Dogs</Link>
                    </Row>
                </Container>
                </Col>
            </Row>
        </footer>
    )
}