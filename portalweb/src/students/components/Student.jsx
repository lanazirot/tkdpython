import React from 'react'
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import './styles.css'

export const Student = ({item, ...props}) => {
  const navigate = useNavigate();
  //Handle event to navigate and edit professor
  const handleEdit = () => {
    //Navigate to StudentDetailPage and pass item as parameter
    navigate(`/students/${item.id}`);
  }

  return (
    <MDBCol>
    <MDBCard className='h-100 card-hover' onClick={handleEdit}>
      <MDBCardImage
        src={item.userModel.img_url}
        alt='...'
        position='top'
      />
      <MDBCardBody>
        <MDBCardTitle>{item.userModel.name}</MDBCardTitle>
        <MDBCardText>
          Estudiante cinta {item.belt_color} de edad {item.age}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
  )
}
