import { Route, Routes } from 'react-router-dom'

import { LoginPage } from '../auth'
import { RegisterPage } from '../auth/pages/RegisterPage'
import { AppRoutes } from '../home/routes/HomeRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path='login/*'
          element={
            <PublicRoute>
              <Routes>
                <Route path='/*' re element={<LoginPage />} />
              </Routes>
            </PublicRoute>
          }
        />
        <Route
          path='/*'
          element={
            <PrivateRoute>
              <AppRoutes />
            </PrivateRoute>
          }
        />
        <Route path='register/*' element={
          <PublicRoute>
            <Routes>
              <Route path='/*' element={<RegisterPage />} />
            </Routes>
          </PublicRoute>
        } />
      </Routes>
    </>
  )
}
