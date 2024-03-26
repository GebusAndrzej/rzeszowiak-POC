import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { TMenuGroup as TMenuGroup } from '../../utils/helpers';
import MenuItem from '../MenuItem/MenuItem';

type Props = {
    category: TMenuGroup;
};

const MenuGroup = ({ category }: Props) => {

    return (
        <Collapsible
            className="flex flex-col"
            key={category.categoryName}
        >
            <CollapsibleTrigger>
                <Button
                    className="flex flex-column"
                    variant="outline"
                >
                    {category.categoryName}
                </Button>
            </CollapsibleTrigger>

            <CollapsibleContent>
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
