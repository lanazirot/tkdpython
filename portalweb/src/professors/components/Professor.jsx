import React from 'react'
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdb-react-ui-kit';
import './styles.css'

export const Professor = ({item}) => {

  //Handle event to navigate and edit professor
  const handleEdit = () => {
    console.log(item);
  }

  return (
    <MDBCol>
    <MDBCard className='h-100 card-hover' onClick={handleEdit}>
      <MDBCardImage
        src='https://mdbootstrap.com/img/new/standard/city/041.webp'
        alt='...'
        position='top'
      />
      <MDBCardBody>
        <MDBCardTitle>{item.userModel.name}</MDBCardTitle>
        <MDBCardText>
          Profesor cinta {item.belt_color} de edad {item.age}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
  )
}
