import { useState, useEffect } from 'react';
import { MOBILE_MEDIA_QUERY, TABLET_MEDIA_QUERY } from '../constants/DEVICES';

const initialDevices = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
};

const checkDevicesMediaQuery = () => {
    const windowWidth = window.innerWidth;
    const devicesResult = { ...initialDevices };
    if (windowWidth <= MOBILE_MEDIA_QUERY.max && windowWidth >= MOBILE_MEDIA_QUERY.min) {
        devicesResult.isMobile = true;
    } else if (windowWidth <= TABLET_MEDIA_QUERY.max && windowWidth >= TABLET_MEDIA_QUERY.min) {
        devicesResult.isTablet = true;
    } else {
        devicesResult.isDesktop = true;
    }

    return devicesResult;
};

const useDeviceMediaQuery = () => {
    const [devices, setDevices] = useState(checkDevicesMediaQuery);

    useEffect(() => {
        const handleWindowResize = () => {
            const devicesResult = checkDevicesMediaQuery();

            setDevices({ ...devicesResult });
        };
        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return devices;
};

export default useDeviceMediaQuery;
