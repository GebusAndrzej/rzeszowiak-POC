import { NavLink } from 'react-router-dom';
import { TMenuItem } from '../../Menu.d';
import { useMemo } from 'react';
import clsx from 'clsx';
import styles from './MenuItem.module.css';

export type MenuItemBaseProps = {
    item: TMenuItem;
    urlTransformer?: (url?: string) => string;
};

const MenuItemBase = ({
    item,
    urlTransformer,
}: MenuItemBaseProps) => {
    const isGroup = !!item.children?.length;

    const localUrl = useMemo(
        () => urlTransformer
            ? urlTransformer(item.url)
            : item.url,
        [
            urlTransformer,
            item,
        ],
    );

    return isGroup
        ? (<>
            <NavLink
                className={({ isActive }) => clsx(
                    styles.menuItem,
                    isActive && styles.active,
                )}
                to={localUrl || '#'}
            >
                <span className={styles.text}>
                    {item.text}
                </span>

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
                <div className={styles.menuLabelContainer}>
                    <span className={styles.text}>
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
};

export default MenuItemBase;
