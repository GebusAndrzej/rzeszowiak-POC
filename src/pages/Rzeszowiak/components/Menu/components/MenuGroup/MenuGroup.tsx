import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { TMenuGroup as TMenuGroup } from '../../utils/helpers';
import MenuItem from '../MenuItem/MenuItem';
import styles from './MenuGroup.module.css';

type Props = {
    category: TMenuGroup;
};

const MenuGroup = ({ category }: Props) => {

    return (
        <Collapsible key={category.categoryName}>
            <CollapsibleTrigger className={styles.trigger}>
                {category.categoryName}
            </CollapsibleTrigger>

            <CollapsibleContent className={styles.content}>
                {category.items.map(menuItem => (
                    <MenuItem
                        item={menuItem}
                        key={menuItem.url}
                    />
                ))}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default MenuGroup;
