import { MobileMenu } from '../../components/layouts/mobileMenu/MobileMenu'
import Sidebar from '../../components/layouts/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import useDeviceMediaQuery from '../../hooks/useDeviceMediaQuery'

export const UserPage = () => {
  const { isMobile } = useDeviceMediaQuery();

  const wrapperClass = isMobile ? 'user-layout--mobile' : 'user-layout';
  return (
    <div className={wrapperClass}>
        { !isMobile && <Sidebar /> }
        <Outlet />
        { isMobile  && <MobileMenu /> }
    </div>
  )
}
