import { Navigate, Route, Routes } from 'react-router-dom';

import { JugdesPage } from '../../judges/pages/JugdesPage';
import { ProfessorsPage } from '../../professors/pages/ProfessorsPage';
import { PersonalPage } from '../../personal/pages/PersonalPage';
import { StudentsPage } from '../../students/pages/StudentsPage';
import { HomePage } from '../pages/HomePage';

import { NavbarApp } from '../../ui';



export const HomeRoutes = () => {
  return (
    <>
        <NavbarApp />
        <div className="container">
            <Routes>
                <Route path="home" element={<HomePage />} />

                <Route path="jugdes" element={<JugdesPage />} />
                {/* Search jugde by ID  */}
                <Route path="jugdes/:jugdeId" element={<JugdesPage />} />


                <Route path="professors" element={<ProfessorsPage />} />
                {/* Search professor by ID  */}
                <Route path="professors/:professorId" element={<ProfessorsPage />} />


                <Route path="personal" element={<PersonalPage />} />
                {/* Search personal by ID  */}
                <Route path="personal/:personalId" element={<PersonalPage />} />


                <Route path="students" element={<StudentsPage />} />
                {/* Search student by ID  */}
                <Route path="students/:studentId" element={<StudentsPage />} />
                

                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </div>
    </>
  )
}