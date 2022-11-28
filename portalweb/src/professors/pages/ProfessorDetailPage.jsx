import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import MoonLoader from "react-spinners/MoonLoader";
import { getProfessorById } from '../../slices/professors';

export const ProfessorDetailPage = () => {
    //Get ID from the URL
    const { professorId } = useParams();

    const dispatch = useDispatch();

    const { loading, hasErrors, professor } = useSelector(
      (state) => state.professor
    );

    useEffect(() => {
      dispatch(getProfessorById(professorId));
    }, [dispatch]);
    
  return (
   <>
      {loading && !professor && <MoonLoader />}
      {hasErrors && <div>Unable to display professor.</div>}
      {professor && (
        <div>
          <h1>{professor.id}</h1>
        </div>
      )}
   </>
  )
}
