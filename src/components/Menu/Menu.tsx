import {
    ComponentType,
    useCallback,
    useContext,
} from "react";
import {
    MenuIcon,
    Store,
} from "lucide-react";
import { MenuItemBaseProps } from "./components/MenuItemBase/MenuItemBase";
import { NavLink } from "react-router-dom";
import { SiteContext } from "../SiteWrapper/SiteWrapper";
import { TMenuGroup } from "./Menu.d";
import MenuGroup from "./components/MenuGroup/MenuGroup";
import clsx from "clsx";
import styles from "./Menu.module.css";

type Props = {
    items: TMenuGroup[];
    siteName: string;
    urlTransformer?: (url?: string) => string;
    Item?: ComponentType<MenuItemBaseProps>;
};

const Menu = ({
    Item,
    items,
    siteName,
    urlTransformer,
}: Props) => {
    const {
        menuCollapsed,
        setContextValue,
    } = useContext(SiteContext);

    const toggleMenu = useCallback(
        () =>
            setContextValue((prev) => ({
                ...prev,
                menuCollapsed: !prev.menuCollapsed,
            })),
        [ setContextValue ],
    );

    return menuCollapsed ? (
        <div
            className={styles.collapsedMenuIcon}
            onClick={toggleMenu}
        >
            <MenuIcon style={{ cursor: "pointer" }} />
        </div>
    ) : (
        <>
            <div
                className={clsx(
                    styles.pageLogo,
                    menuCollapsed && styles.pageLogoCollapsed,
                )}
            >
                {!menuCollapsed && (
                    <>
                        <NavLink to="/">
                            <Store />
                        </NavLink>

                        <span className={styles.siteName}>{siteName}</span>
                    </>
                )}

                <MenuIcon
                    onClick={toggleMenu}
                    style={{ cursor: "pointer" }}
                />
            </div>

            <div className={clsx(styles.wrapper, menuCollapsed && styles.collapsed)}>
                {items?.map((category) => (
                    <MenuGroup
                        Item={Item}
                        category={category}
                        key={category.categoryName}
                        urlTransformer={urlTransformer}
                    />
                ))}
            </div>
        </>
    );
};

export default Menu;
