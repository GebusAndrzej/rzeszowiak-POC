import Menu from '@/components/Menu/Menu';
import { parseMenuHTML } from './utils/helpers';
import { useMemo } from 'react';

type Props = {
    originalElement?: string;
};

const MenuWrapper = ({ originalElement = '' }: Props) => {
    const parsedMenu = useMemo(
        () => {
            if (!originalElement.length) return [];
            const parsedMenuElement = parseMenuHTML(originalElement);

            console.log(parsedMenuElement);

            return parsedMenuElement;
        },
        [ originalElement ],
    );

    return (
        <div>
            <Menu
                items={parsedMenu}
                siteName='Tarnowiak'
            />
        </div>
    );
};

export default MenuWrapper;
