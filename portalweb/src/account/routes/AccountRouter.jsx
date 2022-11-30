import React from 'react'
import { AccountPage } from '../pages/AccountPage'

export const AccountRouter = () => {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<AccountPage />} />
          <Route path="/me" element={<AccountPage />} />
        </Routes>
      </div>
    </>
  )
}
