import {
    useCallback,
    useLayoutEffect,
    useState,
} from 'react';

const useWindowSize = () => {
    const [ windowSize, setWindowSize ] = useState({
        height: document.body.clientHeight,
        width: document.body.clientWidth,
    });

    const handleResize = useCallback(
        () => {
            setWindowSize({
                height: document.body.clientHeight,
                width: document.body.clientWidth,
            });
        }, [],
    );

    useLayoutEffect(
        () => {
            window.addEventListener('resize', handleResize);
            handleResize();

            return () => window.removeEventListener('resize', handleResize);
        }, [ handleResize ],
    );

    return windowSize;
};

export default useWindowSize;
