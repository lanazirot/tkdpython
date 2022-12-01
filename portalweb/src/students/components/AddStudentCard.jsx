import React from 'react'
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import './styles.css'


export const AddStudentCard = () => {
    const navigate = useNavigate();

    const agregarStudent = () => {
        navigate('/students/add');
    }
  
    return (
      <MDBCol>
      <MDBCard className='h-100 card-hover' onClick={agregarStudent}>
        <MDBCardImage
          src='./assets/img/Add.svg'
          alt='...'
          position='top'
        />
        <MDBCardBody>
          <MDBCardTitle>Agregar un estudiante</MDBCardTitle>
          <MDBCardText>
            Haz click aqui para agregar un nuevo estudiante
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    )
}
