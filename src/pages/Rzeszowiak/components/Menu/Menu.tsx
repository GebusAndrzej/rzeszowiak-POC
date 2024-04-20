import MenuGroup from '@/components/Menu/components/MenuGroup/MenuGroup';
import { parseMenuHTML } from './utils/helpers';
import { useMemo } from 'react';

type Props = {
    originalElement?: string;
};

const Menu = ({ originalElement = '' }: Props) => {

    const parsedMenu = useMemo(
        () => {
            if (!originalElement.length) return;
            const parsedMenuElement = parseMenuHTML(originalElement);

            return parsedMenuElement;
        },
        [ originalElement ],
    );

    return (
        <div className="flex flex-col flex-1 sticky">
            <div>
        rzeszowiak
            </div>

            {parsedMenu?.map(category => (
                <MenuGroup
                    category={category}
                    key={category.categoryName}
                />
            ))}
        </div>
    );
};

export default Menu;

