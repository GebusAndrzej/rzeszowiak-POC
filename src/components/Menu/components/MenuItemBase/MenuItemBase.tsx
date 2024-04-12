import { NavLink } from 'react-router-dom'
import { TMenuItem } from '../../Menu.d'
import styles from './MenuItem.module.css'
import clsx from 'clsx'
import { useMemo } from 'react'

export type MenuItemBaseProps = {
    item: TMenuItem;
    urlTransformer?: (url?: string) => string;
}

const MenuItemBase = ({
    item, 
    urlTransformer,
}: MenuItemBaseProps) => {
    const isGroup = !!item.children?.length;

    const localUrl = useMemo(
        () => urlTransformer
                ? urlTransformer(item.url)
                : item.url,
        [urlTransformer, item]
    )

    return isGroup
        ? (<>
            <NavLink
                className={({ isActive }) => clsx(
                    styles.menuItem,
                    isActive && styles.active,
                )}
                to={localUrl || '#'}
            >
                {item.text}

                {!!item.count && (
                    <span className={styles.count}>
                        ({item.count})
                    </span>
                )}
            </NavLink>

            <div className={styles.childrenContainer}>
                {item.children?.map(item => (
                    <MenuItemBase
                        item={item}
                        key={item.url}
                        urlTransformer={urlTransformer}
                    />
                ))}
            </div>
        </>)
        : (
            <NavLink
                className={({ isActive }) => clsx(
                    styles.menuItem,
                    isActive && styles.active,
                )}
                key={item.text}
                to={localUrl || '#'}
            >
                <div className={styles.menuLabel}>
                    <span>
                        {item.text}
                    </span>

                    {!!item.count && (
                        <span className={styles.count}>
                            ({item.count})
                        </span>
                    )}
                </div>
            </NavLink>
        );
}

export default MenuItemBase