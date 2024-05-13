import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ComponentType } from 'react';
import { TMenuGroup } from '../../Menu.d';
import MenuItemBase, { MenuItemBaseProps } from '../MenuItemBase/MenuItemBase';
import styles from './MenuGroup.module.css';

type Props = {
    category: TMenuGroup;
    urlTransformer?: (url?: string) => string;
    Item?: ComponentType<MenuItemBaseProps>;
};

const MenuGroup = ({
    Item = MenuItemBase,
    category,
}: Props) => {

    return (
        <Collapsible key={category.categoryName}>
            <CollapsibleTrigger className={styles.trigger}>
                {category.categoryName}
            </CollapsibleTrigger>

            <CollapsibleContent className={styles.content}>
                {category.items.map(menuItem => (
                    <Item
                        item={menuItem}
                        key={menuItem.url}
                    />
                ))}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default MenuGroup;
