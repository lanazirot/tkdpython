import React from "react";
import { Footer } from "../../ui/components/Footer";
import { MDBCol, MDBInput, MDBBtn, MDBCardImage, MDBContainer } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { userSchema } from "../../account/helpers/userMock";
import { clearMessage, login, register, setMessage } from "../../slices";


import "animate.css";
import "./login.css";
import "./styles.css";
import { useEffect } from "react";

export const RegisterPage = () => {

   const dispatch = useDispatch();
   const { message } = useSelector((state) => state.message);

   useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);


  const formikLogin = useFormik({
    initialValues: userSchema.getDefaultFromShape(),
    onSubmit: async (values) => {
      dispatch(register(values));
    },
    enableReinitialize: true,
    validationSchema: userSchema
  });

  return (
    <>
      <MDBContainer className="animate__animated animate__fadeIn d-flex flex-column align-items-center pb-5">
        <MDBCardImage
          className="img-fluid rounded-circle mb-5"
          src={formikLogin.values.img_url}
          onClick={() => {
            Swal.fire({
              title: "Elige tu foto de perfil",
              input: "file",
              inputAttributes: {
                accept: "image/*",
                "aria-label": "Sube tu foto de perfil",
              },
              showCancelButton: true,
              confirmButtonText: "Subir",
              cancelButtonText: "Cancelar",
              showLoaderOnConfirm: true,
              preConfirm: (file) => {
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    formikLogin.setFieldValue("img_url", reader.result);
                  };
                }
              },
              allowOutsideClick: () => !Swal.isLoading(),
            });
          }}
          style={{
            width: "15rem",
            height: "15rem",
            margin: "auto",
            marginTop: "2em",
            objectFit: "contain",
            borderRadius: "50%",
            border: "5px solid #000",
          }}
        />
        <div className="mb-4">Haz click en la imagen para cambiarla</div>
        <MDBCol col="5" md="7" lg="4" sm="12" xs="12">
          <MDBInput
            label="Nombre completo"
            size="lg"
            id="name"
            wrapperClass="mb-4"
            name="name"
            type="text"
            value={formikLogin.values.name}
            onChange={formikLogin.handleChange}
          />
          {formikLogin.errors.name  ? ( <div className="alert alert-danger">{formikLogin.errors.name} </div> ) : null}
          <MDBInput
            label="Correo electrónico"
            size="lg"
            id="email"
            wrapperClass="mb-4"
            name="email"
            type="email"
            placeholder="example@taekwondo.org"
            value={formikLogin.values.email}
            onChange={formikLogin.handleChange}
          />
          {formikLogin.errors.email  ? ( <div className="alert alert-danger">{formikLogin.errors.email} </div> ) : null}
          <MDBInput
            label="Contraseña"
            placeholder="De almenos 8 caracteres de longitud y caracteres especiales"
            size="lg"
            id="password"
            name="password"
            wrapperClass="mb-4"
            type="password"
            value={formikLogin.values.password}
            onChange={formikLogin.handleChange}
          />
          {formikLogin.errors.password  ? ( <div className="alert alert-danger">{formikLogin.errors.password} </div> ) : null}


          <div className="text-center text-md-start mt-4 pt-2 d-grid gap-2">
            <MDBBtn
              className="mb-0 px-5 mr-5"
              size="lg"
              rounded
              onClick={formikLogin.handleSubmit}
            >
              Registrarse
            </MDBBtn>
          </div>

          {message && (
          <MDBCol col="4" md="6" className="pt-5">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </MDBCol>
        )}
        </MDBCol>
      </MDBContainer>
      <Footer />
    </>
  );
};
