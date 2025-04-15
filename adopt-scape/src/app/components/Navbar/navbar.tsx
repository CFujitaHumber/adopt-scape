/**
 * @author Carson Fujita
 * @copyright Carson Fujita, 2025
 */
"use client";
import style from "./component.module.css";
import { useState } from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

/**
 * Navbar JSX
 * @author Carson Fujita
 * @param children children JSX
 * @returns Navbar JSX
 */
function Navigation({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleCanvas = () => setShow((s) => !s);

  /**
   * Conditional Rendering of a canvas based on if there is children.
   * @returns The required canvas elements
   */
  const renderCanvas = () => {
      return (children != null) ? (
        <>
          <Button
            aria-controls="searchCanvas-expand"
            onClick={toggleCanvas}
            style={{ position: "absolute", top: "0.5rem", right: "1rem" }}

            //We want the variant to match the opposite of the color scheme
            variant={ window.matchMedia('(prefers-color-scheme: dark)').matches ? "light" : "dark" }
          >
            <span className="navbar-toggler-icon" />
          </Button>

          <Offcanvas
            show={show}
            id="searchCanvas-expand"
            aria-labelledby="searchCanvas-expand"
            onHide={handleClose}
            backdrop={true}
            scroll={true}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Advanced Search</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>{children}</Offcanvas.Body>
          </Offcanvas>
        </>
      ): <></>;
  };

  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container fluid style={{ display: "flex", alignItems: "center" }}>
        <Navbar.Brand as={Link} href="/">
          AdoptScape
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} href="/search/animals/cats">
            Cats
          </Nav.Link>
          <Nav.Link as={Link} href="/search/animals/dogs">
            Dogs
          </Nav.Link>
          {renderCanvas()}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
