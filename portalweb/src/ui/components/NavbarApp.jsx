import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import {Nav, Navbar, Container} from 'react-bootstrap'
import { TbLogout } from "react-icons/tb";
import "./styles.css";

export const NavbarApp = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>
        <img src="/favicon.svg" alt="" width="30" height="24"/>
        Taekwondo App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to='/home'>Home</Nav.Link>
          <Nav.Link as={Link} to='/students'>Students</Nav.Link>
          <Nav.Link as={Link} to='/professors'>Professors</Nav.Link>
          <Nav.Link as={Link} to='/judges'>Judges</Nav.Link>
          <Nav.Link as={Link} to='/personal'>Personal</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to='/account'>{user.name}</Nav.Link>
          <Nav.Link onClick={logout}>
            Salir <TbLogout/>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};
