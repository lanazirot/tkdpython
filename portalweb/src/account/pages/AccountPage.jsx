import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import {useSelector} from 'react-redux';
import {QRCodeSVG} from 'qrcode.react';
import { TbPrinter, TbTrash } from "react-icons/tb";

export const AccountPage = () => {

  //Get current user from store
  const {user} = useSelector(state => state.auth);


  return (
    <MDBRow className='animate__animated animate__fadeIn row-cols-1 row-cols-md-2 g-5 mt-5 justify-content-center'>
    <MDBCol className='d-flex flex-column'>
    <MDBCard alignment='center' className='mt-5 h-100 align-items-center'>
        <MDBCardImage style={{width: '15em'}} src={user.img_url || 'img/Profile.svg'} position="top" className='mt-5'/>
      <MDBCardBody>
        <MDBCardTitle>{user.name}</MDBCardTitle>
        <MDBCardText>
          Correo electrónico {user.email}
        </MDBCardText>
        <MDBCardText>
          Rol dentro del dojang {user.role}
        </MDBCardText>
        <MDBCardText>
          <QRCodeSVG value={user.uuid} />
        </MDBCardText>
        <div className='d-flex flex-column p-2'>
          <MDBBtn className='btn-info mb-4'>Imprime mi tarjeta de Taekwondo <TbPrinter size={20} />  </MDBBtn>
          <MDBBtn className='btn-danger' >Dar de baja mi cuenta <TbTrash size={20} /> </MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
    </MDBCol>
    </MDBRow>
  )
}
