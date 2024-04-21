import React, { Dispatch, SetStateAction, useState } from "react";
import { ReactNode } from "react"
import styles from './SiteWrapper.module.css'
import clsx from "clsx";

type ContextValues = {
    menuCollapsed: boolean;
}

type ContextType = {
    setContextValue: Dispatch<SetStateAction<ContextValues>>
} & ContextValues;

export const SiteContext = React.createContext<ContextType>({
    menuCollapsed: false,
    setContextValue: () => false,
});

type Props = {
    children: ReactNode,
    menuElement: ReactNode,
}

const SiteWrapper = ({
    children,
    menuElement,
}: Props) => {
    const [state, setState] = useState<ContextValues>({
        menuCollapsed: false,
    })
    
  return (
    <SiteContext.Provider value={{
        ...state,
        setContextValue: setState,
    }}>
        <div className={clsx(
            styles.wrapper,
            state.menuCollapsed && styles.menuCollapsed
        )}>
            <div className={styles.menu}>
                {menuElement}
            </div>

            <div className={styles.page}>
                {children}
            </div>
        </div>
    </SiteContext.Provider>
  )
}

export default SiteWrapper