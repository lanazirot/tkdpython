import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { QRCodeSVG } from 'qrcode.react'
import { TbPrinter } from 'react-icons/tb'
import axiosInstance from '../../axios'
import { saveAs } from 'file-saver'
import Swal from 'sweetalert2'
import { updateState } from '../../slices'
import { ROL_MAP } from '../../constants'


import './styles.css'
export const AccountPage = () => {
  //Get current user from store
  const { user } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.loading)

  const dispatch = useDispatch()
  const handleGenerateMyCardPDF = () => {
    //Download from server
    axiosInstance
      .get('/profile/generateMyCardPDF', {
        responseType: 'blob'
      })
      .then(res => {
        const blob = new Blob([res.data], { type: 'application/pdf' })
        saveAs(blob, `${user.name}-TKD-Card.pdf`)
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al generar la tarjeta'
        })
      })
  }
  return (
    <MDBRow className='animate__animated animate__fadeIn row-cols-1 row-cols-md-2 g-5 mt-5 justify-content-center'>
      <MDBCol className='d-flex flex-column'>
        <MDBCard alignment='center' className='mt-5 h-100 align-items-center'>
          <MDBCardImage
            className="mt-5 image-cropper"
            src={user.img_url || 'assets/img/Profile.svg'}
            position='top'
            onClick={() => {
              //Swal to upload image
              Swal.fire({
                title: 'Subir imagen',
                input: 'file',
                inputAttributes: {
                  accept: 'image/*',
                  'aria-label': 'Subir imagen'
                },
                showCancelButton: true,
                confirmButtonText: 'Subir',
                showLoaderOnConfirm: true,
                preConfirm: file => {
                  try {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      //Upload image to server
                      axiosInstance
                        .put('/profile/uploadImage', {
                          img_url: reader.result
                        })
                        .then(res => {
                          dispatch(updateState({
                            ...user,
                            img_url: res.data.img_url
                          }))
                          if(loading){
                            Swal.showLoading()
                          }
                          Swal.fire({
                            icon: 'success',
                            title: 'Imagen subida correctamente',
                            showConfirmButton: false,
                            timer: 1500
                          })
                        })
                      }
                  } catch (err) {
                    Swal.showValidationMessage(
                      `Request failed: ${err}`
                    )
                  }
                }
              })
            }}
          />
          <MDBCardBody>
            <MDBCardTitle>{user.name}</MDBCardTitle>
            <MDBCardText>Correo electrónico {user.email}</MDBCardText>
            <MDBCardText>Rol dentro del dojang {ROL_MAP[user.role]}</MDBCardText>
            <MDBCardText>
              <QRCodeSVG value={user.uuid} />
            </MDBCardText>
            <div className='d-flex flex-column p-2'>
              <MDBBtn
                className='btn-info mb-4'
                onClick={handleGenerateMyCardPDF}
              >
                Imprime mi tarjeta de Taekwondo <TbPrinter size={20} />
              </MDBBtn>
              {/* <MDBBtn className='btn-danger'>
                Dar de baja mi cuenta <TbTrash size={20} />
              </MDBBtn> */}
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  )
}
