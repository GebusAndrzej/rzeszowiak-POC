import { parseMenuHTML } from './utils/helpers';
import { useMemo } from 'react';
import Menu from '@/components/Menu/Menu';

type Props = {
    originalElement?: string;
};

const MenuWrapper = ({ originalElement = '' }: Props) => {
    const parsedMenu = useMemo(
        () => {
            if (!originalElement.length) return [];
            const parsedMenuElement = parseMenuHTML(originalElement);

            return parsedMenuElement;
        },
        [ originalElement ],
    );

    return (
        <div>
            <Menu
                items={parsedMenu}
                siteName="Brzozowiak"
            />
        </div>
    );
};

export default MenuWrapper;
