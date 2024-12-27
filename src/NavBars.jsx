import React, { useContext } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./components/AuthContext";

const NavBars = () => {
  const { userName, userId, logoutUser } = useContext(AuthContext); // Asegúrate de que userId esté disponible
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Adiossss");
    logoutUser();
    navigate("/login");
  };

  return (
    <Navbar fixed="bottom" collapseOnSelect expand="lg" className="bg-body-tertiary py-100">
      <Container>
       
        <Navbar.Brand as={Link} to={{ pathname: "/perfil", state: { userId } }}>
          {userName || "Perfil"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/features">Features</Nav.Link>
            <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} as={Link} to="/memes">Dank memes</Nav.Link>
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBars;