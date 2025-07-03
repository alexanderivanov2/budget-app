import { MobileMenu } from '../../components/mobileMenu/MobileMenu'
import Sidebar from '../../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import useDeviceMediaQuery from '../../hooks/useDeviceMediaQuery'

export const UserPage = () => {
  const { isMobile, isTablet } = useDeviceMediaQuery();
  return (
    <div>
      { isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop' }
        { !isMobile && <Sidebar /> }
        <Outlet />
        { isMobile  && <MobileMenu /> }
    </div>
  )
}
