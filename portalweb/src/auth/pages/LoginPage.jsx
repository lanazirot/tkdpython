import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import "./styles.css";
import { useState } from "react";
import { clearMessage, login } from "../../slices";
import { Footer } from "../../ui/components/Footer";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  //Create a state for the form
  const [formLogin, setForm] = useState({ email: "", password: "" });

  const handleLogin = () => {
    const { email, password } = formLogin;
    setLoading(true);
    dispatch(clearMessage());
    dispatch(login({ email, password }))
      .unwrap()
      .then((r) => {
        const url = localStorage.getItem("lastPath") || "/home";
        navigate(url);
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };


  return (
    <>
      <MDBContainer
        fluid
        className="animate__animated animate__fadeIn p-3 my-5 h-custom d-flex align-items-center justify-content-center text-center"
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
              onChange={(e) => setForm({ ...formLogin, email: e.target.value })}
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
              </MDBBtn>
            </div>

            <div className="text-center  mt-4 d-grid gap-2">
              <p>
                ¿No tienes una cuenta? <a href="/register">Registrarse</a>
              </p>
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
      </MDBContainer>
      <Footer />
    </>
  );
};
