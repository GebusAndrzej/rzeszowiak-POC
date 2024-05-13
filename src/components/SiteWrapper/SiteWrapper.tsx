import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from "react";
import clsx from "clsx";
import styles from './SiteWrapper.module.css';
import useScreenMedia from "@/lib/hooks/useScreenMedia";

type ContextValues = {
    menuCollapsed: boolean;
};

type ContextType = {
    setContextValue: Dispatch<SetStateAction<ContextValues>>;
} & ContextValues;

export const SiteContext = React.createContext<ContextType>({
    menuCollapsed: false,
    setContextValue: () => false,
});

type Props = {
    children: ReactNode;
    menuElement: ReactNode;
};

const SiteWrapper = ({
    children,
    menuElement,
}: Props) => {
    const screen = useScreenMedia();

    const [ state, setState ] = useState<ContextValues>({
        menuCollapsed: !!screen.small,
    });

    return (
        <SiteContext.Provider
            value={{
                ...state,
                setContextValue: setState,
            }}
        >
            <div
                className={clsx(
                    styles.wrapper,
                    state.menuCollapsed && styles.menuCollapsed,
                )}
            >
                <div className={styles.menu}>
                    {menuElement}
                </div>

                <div className={styles.page}>
                    {children}
                </div>
            </div>
        </SiteContext.Provider>
    );
};

export default SiteWrapper;
