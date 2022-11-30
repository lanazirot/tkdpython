import React, { useEffect } from 'react'
import { MDBRow } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfessors } from '../../slices/professors'
import MoonLoader from 'react-spinners/MoonLoader'
import { Professor } from './Professor'
import { AddProfesorCard } from './AddProfesorCard'
import 'animate.css';

export const ProfessorsList = () => {
  const dispatch = useDispatch()
  const { loading, hasErrors, professors } = useSelector(
    state => state.professor
  )

  useEffect(() => {
    dispatch(fetchProfessors())
  }, [dispatch])

  return (
    <MDBRow className='animate__animated animate__fadeIn row-cols-1 row-cols-md-3 g-4 mt-5'>
      {loading && !professors && <MoonLoader className='text-center' />}
      {hasErrors && <p>Unable to display professors.</p>}
      <AddProfesorCard/>
      {professors.data &&
        professors.data.map(professor => (
          <Professor key={professor.id} item={professor} />
        ))}
    </MDBRow>
  )
}
