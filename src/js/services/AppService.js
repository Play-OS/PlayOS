// import MobileDetect from 'mobile-detect';

export default class AppService {
    /**
     * Checks if the current device (User agent) is supported by the app.
     *
     * @param {Array<string>} supportedList
     * @returns {boolean}
     * @memberof AppService
     */
    static isDeviceSupported(supportedList) {
        return true;
        if (!supportedList) return true;

        const mobileDetect = new MobileDetect(navigator.userAgent);
        let deviceKey = 'desktop';
        const isMobile = !!mobileDetect.mobile();

        if (isMobile) {
            const isTablet = !!mobileDetect.tablet();

            if (isTablet) {
                deviceKey = 'tablet';
            } else {
                deviceKey = 'mobile';
            }
        }

        return supportedList.includes(deviceKey);
    }
}
