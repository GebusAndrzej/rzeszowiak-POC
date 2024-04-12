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

            console.log(parsedMenuElement);

            return parsedMenuElement;
        },
        [ originalElement ],
    );

    return (
        <div>Menu</div>
    );
};

export default Menu;
