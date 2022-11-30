import React from 'react'
import {  useNavigate } from "react-router-dom";

export const Error404Page = () => {

  const navigate = useNavigate();

  const handleError404 = () => {
    navigate('/');
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                </p>
                <div className='mb-5'>
                    <img style={{width: '20em'}} src="assets/img/error404.gif" alt="error404" />
                </div>
                <button onClick={handleError404} className="btn btn-primary">Go Home</button>
            </div>
        </div>
  )
}
