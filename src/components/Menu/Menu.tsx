import { ArrowLeftIcon } from 'lucide-react';
import { TMenuGroup, TMenuItem } from './Menu.d';
import styles from './Menu.module.css';
import clsx from 'clsx';
import MenuGroup from './components/MenuGroup/MenuGroup';
import { ComponentType } from 'react';

type Props = {
    items: TMenuGroup[];
    siteName: string;
    urlTransformer?: (url?: string) => string;
    // Item?: ComponentType<{
    //   item: TMenuItem;
    //   urlTransformer?: (url?: string) => string;
    // }>
    Item?: ComponentType<{
        item: TMenuItem
    }>;
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