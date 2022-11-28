import { useState } from 'react';
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TbLogout } from "react-icons/tb";
import "./styles.css";
import { logout } from "../../slices";
import { MDBNavbar, MDBContainer, MDBNavbarBrand,MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBNavbarToggler,MDBCollapse, MDBBtn } from "mdb-react-ui-kit";

export const NavbarApp = () => {

  const [showNavText, setShowNavText] = useState(false);


  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutApp = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <MDBNavbar expand="lg" fixed='top' dark bgColor="primary">
      <MDBContainer fluid>
        <MDBNavbarBrand tag={Link} to='/home'>
        <img src="/favicon.svg" alt="" width="30" height="24"/>
        Taekwondo App
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Abrir o cerrar menu"
          onClick={() => setShowNavText(!showNavText)}
        >
        <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavText}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink tag={Link} to='home'>Home</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink tag={Link} to='students'>Students</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink tag={Link} to='professors'>Professors</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink tag={Link} to='jugdes'>Jugdes</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink tag={Link} to='personal'>Personal</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <MDBBtn color='primary' onClick={logoutApp}><TbLogout size={20}/></MDBBtn>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};
