import React from 'react'
import {
    MDBBtn,
    MDBIcon,
  } from "mdb-react-ui-kit";
export const Footer = () => {
  return (
    <div className="footer mt-auto fixed-bottom d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
    <div className="text-white mb-3 mb-md-0">
      Copyright © 2022. All rights reserved. World Taekwondo Federation
    </div>

    <div>
      <MDBBtn
        tag="a"
        color="none"
        className="mx-3"
        style={{ color: "white" }}
        href="https://facebook.com/lanaxzirot"
      >
        <MDBIcon fab icon="facebook-f" size="md" />
      </MDBBtn>
      <MDBBtn
        tag="a"
        color="none"
        className="mx-3"
        style={{ color: "white" }}
        href="https://twitter.com/lanazirot"
      >
        <MDBIcon fab icon="twitter" size="md" />
      </MDBBtn>
      <MDBBtn
        tag="a"
        color="none"
        className="mx-3"
        style={{ color: "white" }}
        href="http://www.worldtaekwondo.org/"
      >
        <MDBIcon icon="globe" size="md" />
      </MDBBtn>
    </div>
  </div>
  )
}
