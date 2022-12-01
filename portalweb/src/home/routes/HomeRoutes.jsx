import { Navigate, Route, Routes } from 'react-router-dom';

import { JugdesPage } from '../../judges/pages/JugdesPage';
import { PersonalPage } from '../../personal/pages/PersonalPage';
import { StudentsPage } from '../../students/pages/StudentsPage';
import { HomePage } from '../pages/HomePage';
import { AccountPage } from '../../account/pages/AccountPage';
import { AccountRouter } from '../../account/routes/AccountRouter';
import { ProfessorsRouter } from '../../professors/routes/ProfessorsRouter';
import { NavbarApp } from '../../ui';
import { Error404Page } from '../../ui/components/Error404Page';
import { AdminRoute } from '../../router/AdminRoute';
import { StudentRouter } from '../../students/routes/StudentRouter';
export const AppRoutes = () => {
  return (
    <>
        <NavbarApp />
        <div className="container">
            <Routes>
                <Route path="home" element={<HomePage />} />
                <Route path="jugdes" element={<JugdesPage />} />
                <Route path="professors/*" element={
                    <AdminRoute>
                        <ProfessorsRouter />
                    </AdminRoute>
                } />
                <Route path="account/*" element={<AccountRouter />} />
                <Route path="personal" element={<PersonalPage />} />
                <Route path="students/*" element={
                    <AdminRoute>
                        <StudentRouter />
                    </AdminRoute>
                } />
                <Route path="account" element={<AccountPage />} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<Error404Page/>} />
            </Routes>
        </div>
    </>
  )
}