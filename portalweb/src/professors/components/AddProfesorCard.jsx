import React from 'react'
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import './styles.css'


export const AddProfesorCard = () => {
    const navigate = useNavigate();

    const agregarProfesor = () => {
        navigate('/professors/add');
    }
  
    return (
      <MDBCol>
      <MDBCard className='h-100 card-hover' onClick={agregarProfesor}>
        <MDBCardImage
          src='./assets/img/Add.svg'
          alt='...'
          position='top'
        />
        <MDBCardBody>
          <MDBCardTitle>Agregar un profesor</MDBCardTitle>
          <MDBCardText>
            Haz click aqui para agregar un nuevo profesor
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    )
}
