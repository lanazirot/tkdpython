import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import "./styles.css";
import { useEffect, useState } from "react";
import { clearMessage, login } from "../../slices";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  //Create a state for the form
  const [formLogin, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleLogin = () => {
    const { email, password } = formLogin;
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/home");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <MDBContainer
      fluid
      className="p-3 my-5 h-custom d-flex align-items-center justify-content-center text-center"
    >
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
            id="email"
            onChange={(e) =>
              setForm({ ...formLogin, email: e.target.value })
            }
            type="email"
            size="lg"
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="password"
            onChange={(e) =>
              setForm({ ...formLogin, password: e.target.value })
            }
            required
            type="password"
            size="lg"
          />

          <div className="text-center text-md-start mt-4 pt-2 d-grid gap-2">
            <MDBBtn
              className="mb-0 px-5 mr-5"
              size="lg"
              rounded
              disabled={loading}
              onClick={handleLogin}
            >
              Login
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
            </MDBBtn>
          </div>
        </MDBCol>
        {message && (
          <MDBCol col="4" md="6" className="pt-5">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </MDBCol>
        )}
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
