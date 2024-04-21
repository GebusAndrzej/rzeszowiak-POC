import { ArrowLeftIcon, ChevronLeft, CircleChevronLeft, MenuIcon, Store } from 'lucide-react';
import { TMenuGroup } from './Menu.d';
import styles from './Menu.module.css';
import clsx from 'clsx';
import MenuGroup from './components/MenuGroup/MenuGroup';
import { ComponentType, useState } from 'react';
import { MenuItemBaseProps } from './components/MenuItemBase/MenuItemBase';
import { NavLink } from 'react-router-dom';

type Props = {
    items: TMenuGroup[];
    siteName: string;
    urlTransformer?: (url?: string) => string;
    Item?: ComponentType<MenuItemBaseProps>;
}

const Menu = ({
    items,
    siteName,
    urlTransformer,
    Item,
}: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return isCollapsed
        ? (
            <div className={styles.collapsedMenuIcon}>
                <MenuIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsCollapsed(prev => !prev)}
                />
            </div>
        )
        : (
            <div
                className={clsx(
                    styles.wrapper,
                    isCollapsed && styles.collapsed,
                )}
            >
                <div
                    className={clsx(
                        styles.pageLogo,
                        isCollapsed && styles.pageLogoCollapsed
                    )}
                >
                    {!isCollapsed && (
                        <>
                            <NavLink to="/">
                                <Store />
                            </NavLink>

                            <span className={styles.siteName}>
                                {siteName}
                            </span>
                        </>
                    )}

                    <MenuIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsCollapsed(prev => !prev)}
                    />
                </div>

                {items?.map(category => (
                    <MenuGroup
                        category={category}
                        key={category.categoryName}
                        urlTransformer={urlTransformer}
                        Item={Item}
                    />
                ))}
            </div>
        )
}

export default Menu