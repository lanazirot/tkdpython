import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "animate.css";
import { UserList } from "../../account/components/UserList";
import { addStudent } from "../../slices/students";
import Spinner from "react-bootstrap/Spinner";
import { studentSchema } from "../helpers/studentMock";

export const AddStudentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProfessor, loading, hasErrors } = useSelector((state) => state.professor);

  const formik = useFormik({
    initialValues: studentSchema.getDefaultFromShape(),
    validationSchema: studentSchema,
    onSubmit: async (values) => {
      values.professorModel = selectedProfessor;
      console.log(values);
      /*dispatch(addStudent(values));
      if (!hasErrors) {
        Swal.fire({
          title: "Estudiante agregado exitosamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            navigate("/students");
          },
        });
      } else {
        Swal.fire({
          title: "Error al agregar estudiante",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            navigate("/students");
          },
        });
      }*/
    },
    enableReinitialize: true,
  });

   console.log(formik.errors);

  return (
    <>
      <MDBContainer fluid className="animate__animated animate__fadeInDown">
        <MDBRow className="d-flex justify-content-center align-items-center mt-5">
          <MDBCol lg="9" className="my-5">
            <UserList query="P" text="Buscar un profesor para el estudiante"  />
            <br />
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
                    <h6 className="mb-0">Codigo de estudiante</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="Codigo del estudiante"
                      size="lg"
                      id="uuid"
                      name="uuid"
                      type="text"
                      value={formik.values.uuid}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.uuid ? (
                      <div className="alert alert-danger mt-2">
                        Ingresa un UUID valido del estudiante
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
                        Ingresa un color de cinta v??lido
                      </div>
                    ) : null}
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />
                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Peso</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      label="Peso en KGs"
                      size="lg"
                      id="weight"
                      name="weight"
                      type="number"
                      min={0}
                      max={200}
                      value={formik.values.weight}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.weight ? (
                      <div className="alert alert-danger mt-2">
                        Ingresa un peso v??lido
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
                        Ingresa una edad v??lida
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
