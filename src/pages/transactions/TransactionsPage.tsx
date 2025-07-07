import React from 'react'
import { Outlet } from 'react-router-dom'

const TransactionsPage = () => {
  return (
    <div className='transactions'>
        TransactionsPage
        <Outlet />
    </div>
  )
}

export default TransactionsPage