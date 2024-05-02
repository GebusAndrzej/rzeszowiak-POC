import {
  MenuIcon,
  Store,
} from "lucide-react";
import { TMenuGroup } from "./Menu.d";
import styles from "./Menu.module.css";
import clsx from "clsx";
import MenuGroup from "./components/MenuGroup/MenuGroup";
import { ComponentType, useCallback, useContext } from "react";
import { MenuItemBaseProps } from "./components/MenuItemBase/MenuItemBase";
import { NavLink } from "react-router-dom";
import { SiteContext } from "../SiteWrapper/SiteWrapper";

type Props = {
  items: TMenuGroup[];
  siteName: string;
  urlTransformer?: (url?: string) => string;
  Item?: ComponentType<MenuItemBaseProps>;
};

const Menu = ({ items, siteName, urlTransformer, Item }: Props) => {
  const { menuCollapsed, setContextValue } = useContext(SiteContext);

  const toggleMenu = useCallback(
    () =>
      setContextValue((prev) => ({
        ...prev,
        menuCollapsed: !prev.menuCollapsed,
      })),
    [setContextValue]
  );

  return menuCollapsed ? (
    <div className={styles.collapsedMenuIcon} onClick={toggleMenu}>
      <MenuIcon style={{ cursor: "pointer" }} />
    </div>
  ) : (
    <>
      <div
        className={clsx(
          styles.pageLogo,
          menuCollapsed && styles.pageLogoCollapsed
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

        <MenuIcon style={{ cursor: "pointer" }} onClick={toggleMenu} />
      </div>
      <div className={clsx(styles.wrapper, menuCollapsed && styles.collapsed)}>
        {items?.map((category) => (
          <MenuGroup
            category={category}
            key={category.categoryName}
            urlTransformer={urlTransformer}
            Item={Item}
          />
        ))}
      </div>
    </>
  );
};

export default Menu;
