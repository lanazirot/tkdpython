import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { getProfessorById } from "../../slices/professors";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFile,
} from "mdb-react-ui-kit";
import { useFormik } from "formik";
import { professorSchema } from "../helpers/professorMock";

export const ProfessorDetailPage = () => {
  //Create an empty object from professorSchema
  const { professorId } = useParams();
  const dispatch = useDispatch();
  const { loading, hasErrors, professor } = useSelector(
    (state) => state.professor
  );

  const formik = useFormik({
    initialValues: professor
      ? professor
      : professorSchema.getDefaultFromShape(),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    dispatch(getProfessorById(professorId));
  }, [dispatch]);

  return (
    <>
      {loading && <MoonLoader />}
      {hasErrors && <div>Unable to display professor.</div>}
      {professor && !loading && (
        <form>
          <MDBContainer fluid>
            <MDBRow className="d-flex justify-content-center align-items-center">
              <MDBCol lg="9" className="my-5">
                <MDBCard>
                  <MDBCardBody className="px-4">
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-1">Nombre del profesor</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Nombre"
                          size="lg"
                          id="userModel.name"
                          name="userModel.name"
                          type="text"
                          required
                          value={formik.values.userModel.name}
                          onChange={formik.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>

                    <hr className="mx-n3" />

                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Correo electrónico</h6>
                      </MDBCol>

                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="example@example.com"
                          size="lg"
                          id="userModel.email"
                          name="userModel.email"
                          type="email"
                          value={formik.values.userModel.email}
                          onChange={formik.handleChange}
                        />
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
                          type="number"
                          value={formik.values.age}
                          onChange={formik.handleChange}
                        />
                      </MDBCol>
                    </MDBRow>

                    <hr className="mx-n3" />

                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Registrado en</h6>
                      </MDBCol>

                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Fecha"
                          size="lg"
                          id="userModel.registered_on"
                          name="userModel.registered_on"
                          type="datetime"
                          value={formik.values.userModel.registered_on}
                          onChange={formik.handleChange}
                          readonly
                        />
                      </MDBCol>
                    </MDBRow>

                    <hr className="mx-n3" />

                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Ultima actualización</h6>
                      </MDBCol>

                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Fecha"
                          size="lg"
                          id="userModel.updated_at"
                          name="userModel.updated_at"
                          type="datetime"
                          value={formik.values.userModel.updated_at}
                          onChange={formik.handleChange}
                          readonly
                        />
                      </MDBCol>
                    </MDBRow>

                    <hr className="mx-n3" />

                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Cambiar fotografía</h6>
                      </MDBCol>

                      <MDBCol md="9" className="pe-5">
                        <MDBFile size="lg" id="fotografiaNueva" />
                        <div className="small text-muted mt-2">
                          Sube una fotografía de menos de 5mb de peso
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <hr className="mx-n3" />

                    <MDBCol className="d-flex justify-content-center align-items-center">
                      <MDBBtn className="my-4" size="lg" rounded>
                        Guardar cambios
                      </MDBBtn>
                    </MDBCol>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </form>
      )}
    </>
  );
};
