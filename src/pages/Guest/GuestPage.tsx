import React from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'

export const GuestPage = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}