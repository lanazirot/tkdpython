import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfessorById, updateProfessor, deleteProfessor} from "../../slices/professors";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCardImage } from "mdb-react-ui-kit";
import { useFormik } from "formik";
import { professorUpdateSchema } from "../helpers/professorMock";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import "animate.css";

const modal = withReactContent(Swal);

export const ProfessorDetailPage = () => {
  //Create an empty object from professorSchema
  const { professorId } = useParams();
  const dispatch = useDispatch();
  const { loading, hasErrors, professor } = useSelector(
    (state) => state.professor
  );
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: professor,
    validationSchema: professorUpdateSchema,
    onSubmit: async (values) => {
      //Ask if the user is sure to update the professor
      const { isConfirmed } = await modal.fire({
        title: "¿Realmente quieres guardar los cambios?",
        text: "No te preocupes, podrás realizar cambios en otro momento",
        icon: "question",
        showCancelButton: true,
      });

      if (isConfirmed) {
        dispatch(updateProfessor(values));
        modal.fire({
          title: "Actualizado",
          text: "El profesor ha sido actualizado.",
          icon: "success",
        });
        navigate("/professors");
      }
    },
    enableReinitialize: true,
  });

  const eliminarCuenta = async () => {
    const { isConfirmed } = await modal.fire({
      title: "¿Realmente quieres eliminar la cuenta?",
      text: "Esta acción no se puede deshacer",
      icon: "question",
      showCancelButton: true,
    });

    if (isConfirmed) {
      dispatch(deleteProfessor(professorId));
      modal.fire({
        title: "Eliminado",
        text: "El profesor ha sido eliminado.",
        icon: "success",
      });
      navigate("/professors");
    }
  };

  useEffect(() => {
    dispatch(getProfessorById(professorId));
  }, [dispatch]);

  console.log(formik.errors);

  return (
    <>
      {hasErrors && <div>Unable to display professor.</div>}
      {professor && !loading && (
        <MDBContainer fluid className="animate__animated animate__fadeInDown">
          <MDBRow className="d-flex justify-content-center align-items-center mt-5">
            <MDBCol lg="9" className="my-5">
              <MDBCard alignment="center" className='mt-5 h-100 align-items-center'>
                <MDBCardImage className="image-cropper" src={professor.userModel.img_url} />
              </MDBCard>
              <MDBCard>
                <MDBCardBody className="px-4">
                  <hr className="mx-n3" />
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
                      {formik.errors.userModel?.name ? (
                        <div className="alert alert-danger mt-2">
                          Ingresa un nombre válido
                        </div>
                      ) : null}
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
                      {formik.errors.userModel?.email ? (
                        <div className="alert alert-danger mt-2">
                          Ingresa un correo válido
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
                          Ingresa un color válido
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

                  <MDBCol className="d-flex justify-content-around align-items-center">
                    <MDBBtn
                      className="my-4 btn-danger"
                      size="lg"
                      rounded
                      onClick={eliminarCuenta}
                    >
                      Eliminar cuenta
                    </MDBBtn>
                    <MDBBtn
                      className="my-4"
                      size="lg"
                      rounded
                      onClick={formik.handleSubmit}
                    >
                      Guardar cambios
                    </MDBBtn>
                  </MDBCol>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )}
    </>
  );
};
