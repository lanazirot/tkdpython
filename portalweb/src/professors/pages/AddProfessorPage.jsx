import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import { useFormik } from "formik";
import { professorSchema } from "../helpers/professorMock";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "animate.css";
import { UserList } from "../../account/components/UserList";
import { addProfessor } from "../../slices/professors";
import Spinner from "react-bootstrap/Spinner";

export const AddProfessorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProfessor, loading, hasErrors } = useSelector(
    (state) => state.professor
  );

  const formik = useFormik({
    initialValues: professorSchema.getDefaultFromShape(),
    validationSchema: professorSchema,
    onSubmit: async (values) => {
      values.userModel = selectedProfessor;
      dispatch(addProfessor(values));
      console.log(hasErrors);
      if (!hasErrors) {
        Swal.fire({
          title: "Profesor agregado exitosamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            navigate("/professors");
          },
        });
      } else {
        Swal.fire({
          title: "Error al agregar profesor",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            navigate("/professors");
          },
        });
      }
    },
    enableReinitialize: true,
  });

  return (
    <>
      <MDBContainer fluid className="animate__animated animate__fadeInDown">
        <MDBRow className="d-flex justify-content-center align-items-center mt-5">
          <MDBCol lg="9" className="my-5">
            <UserList />
            <MDBCard>
              <MDBCardBody className="px-4">
                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Profesor seleccionado</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="Profesor"
                      size="lg"
                      id="userModel"
                      name="userModel"
                      type="text"
                      value={
                        selectedProfessor
                          ? `${selectedProfessor.name} - ${selectedProfessor.email}`
                          : ""
                      }
                      readOnly
                    />
                    {selectedProfessor == null ? (
                      <div className="alert alert-danger mt-2">
                        Debe seleccionar un profesor
                      </div>
                    ) : null}
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />
                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Cinta</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="Cinta"
                      size="lg"
                      id="belt_color"
                      name="belt_color"
                      type="text"
                      value={formik.values.belt_color}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.belt_color ? (
                      <div className="alert alert-danger mt-2">
                        Ingresa un color de cinta válido
                      </div>
                    ) : null}
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Edad</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="Edad"
                      size="lg"
                      id="age"
                      name="age"
                      min={18}
                      max={120}
                      type="number"
                      value={formik.values.age}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.age ? (
                      <div className="alert alert-danger mt-2">
                        Ingresa una edad válida
                      </div>
                    ) : null}
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBCol className="d-flex justify-content-around align-items-center">
                  <MDBBtn
                    className="my-4"
                    size="lg"
                    rounded
                    disabled={loading}
                    onClick={formik.handleSubmit}
                  >
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      style={{
                        display: loading ? "inline-block" : "none",
                        marginRight: "5px",
                      }}
                      aria-hidden="true"
                    />
                    Guardar cambios
                  </MDBBtn>
                </MDBCol>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};
