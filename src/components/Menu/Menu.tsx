import { ArrowLeftIcon } from 'lucide-react';
import { TMenuGroup } from './Menu.d';
import styles from './Menu.module.css';
import clsx from 'clsx';
import MenuGroup from './components/MenuGroup/MenuGroup';
import { ComponentType } from 'react';
import { MenuItemBaseProps } from './components/MenuItemBase/MenuItemBase';

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
    return (
      <div
      className={clsx(
          styles.wrapper,
          // isCollapsed && styles.collapsed,
      )}
  >
      <div
          className={styles.pageLogo}
          // onClick={() => setIsCollapsed(prev => !prev)}
      >
          <ArrowLeftIcon />
          {siteName}
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