import React, { useEffect } from 'react'
import { MDBRow } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudents } from '../../slices/students'
import MoonLoader from 'react-spinners/MoonLoader'
import { Student } from './Student'
import { AddStudentCard } from './AddStudentCard'
import 'animate.css';

export const StudentsList = () => {
  const dispatch = useDispatch()
  const { loading, hasErrors, students } = useSelector(state => state.student)

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])

  return (
    <MDBRow className='animate__animated animate__fadeIn row-cols-1 row-cols-md-3 g-4 mt-5'>
      {loading && !students && <MoonLoader className='text-center' />}
      {hasErrors && <p>Unable to display students.</p>}
      <AddStudentCard/>
      {students.data &&
        students.data.map(student => (
          <Student key={student.id} item={student} />
        ))}
    </MDBRow>
  )
}
