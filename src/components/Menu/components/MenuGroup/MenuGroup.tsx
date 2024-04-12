import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { TMenuGroup, TMenuItem } from '../../Menu.d';
import MenuItemBase from '../MenuItemBase/MenuItemBase';
import styles from './MenuGroup.module.css'
import { ComponentType } from 'react';

type Props = {
    category: TMenuGroup;
    urlTransformer?: (url?: string) => string
    // Item?: ComponentType<{
    //     item: TMenuItem;
    //     urlTransformer?: (url?: string) => string;
    //   }>
    Item?: ComponentType<{
        item: TMenuItem
    }>;
};

const MenuGroup = ({ 
    category,
    urlTransformer,
    Item = MenuItemBase,
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
                    // Item
                    //     ? (
                    //         <Item
                    //             item={menuItem}
                    //             key={menuItem.url}
                    //         />
                    //     )
                    //     : (
                    //         <MenuItemBase
                    //             item={menuItem}
                    //             key={menuItem.url}
                    //             urlTransformer={urlTransformer}
                    //         />
                    //     )
                ))}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default MenuGroup;
