import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import "./styles.css";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = () => {
    const lastPath = localStorage.getItem("lastPath") || "/";
    login("Prueba");
    navigate(lastPath, {
      replace: true,
    });
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom d-flex align-items-center justify-content-center text-center">
      <MDBRow className="row d-flex justify-content-center flex-column align-content-center">
        <MDBCol col="10" md="6" className="pb-5">
          <img
            src="/assets/img/TKD.png"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <MDBInput
            placeholder="example@tkd.com"
            wrapperClass="mb-4"
            label="Email address"
            required
            id="formControlLg"
            type="email"
            size="lg"
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formControlLg"
            required
            type="password"
            size="lg"
          />

          <div className="text-center text-md-start mt-4 pt-2 d-grid gap-2">
            <MDBBtn className="mb-0 px-5" size="lg" rounded>
              Login
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>

      <div className="footer fixed-bottom d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2022. All rights reserved. World Taekwondo Federation
        </div>

        <div>
          <MDBBtn
            tag="a"
            color="none"
            className="mx-3"
            style={{ color: "white" }}
            href="https://facebook.com/lanaxzirot"
          >
            <MDBIcon fab icon="facebook-f" size="md" />
          </MDBBtn>
          <MDBBtn
            tag="a"
            color="none"
            className="mx-3"
            style={{ color: "white" }}
            href="https://twitter.com/lanazirot"
          >
            <MDBIcon fab icon="twitter" size="md" />
          </MDBBtn>
          <MDBBtn
            tag="a"
            color="none"
            className="mx-3"
            style={{ color: "white" }}
            href="http://www.worldtaekwondo.org/"
          >
            <MDBIcon icon="globe" size="md" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
};
