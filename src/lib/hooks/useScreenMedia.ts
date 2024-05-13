import { useMemo } from 'react';
import useWindowSize from './useWindowSize';

export enum SCREEN_SIZE {
    // 2040 - x - desktop big
    DESKTOP_BIG = 2040,
    // 1640 - 2040 -> desktop large
    DESKTOP_LARGE = 1640,
    // 1280 - 1640 -> desktop small
    DESKTOP_SMALL = 1280,
    // 1024 - 1280 -> desktop tiny
    DESKTOP_TINY = 1024,
    // 768 - 1024 -> tablet
    TABLET = 768,
    // 480 - 768 -> mobile large
    MOBILE_LARGE = 480,
    // 0 - 480 -> mobile small
    MOBILE_SMALL = 0,
}

const useScreenMedia = () => {
    const { width } = useWindowSize();

    const big = useMemo(
        () => width > SCREEN_SIZE.DESKTOP_TINY,
        [ width ],
    );

    const medium = useMemo(
        () => width > SCREEN_SIZE.TABLET && width <= SCREEN_SIZE.DESKTOP_TINY,
        [ width ],
    );

    const small = useMemo(
        () => width <= SCREEN_SIZE.TABLET,
        [ width ],
    );

    return {
        big,
        medium,
        small,
        width,
    };
};

export default useScreenMedia;
