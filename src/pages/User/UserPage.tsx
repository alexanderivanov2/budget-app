import { MobileMenu } from '../../components/mobileMenu/MobileMenu'
import Sidebar from '../../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export const UserPage = () => {
  return (
    <div>
        <Sidebar />
        <Outlet />
        <MobileMenu />
    </div>
  )
}
