import { constructCategoryUrl } from '../../helpers/rzeszowiakHelpers';
import { parseMenuHTML } from './utils/helpers';
import { useMemo } from 'react';
import Menu from '@/components/Menu/Menu';
import MenuItem from './components/MenuItem/MenuItem';

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
        <Menu
            Item={MenuItem}
            items={parsedMenu}
            siteName="Rzeszowiak"
            urlTransformer={constructCategoryUrl}
        />
    );
};

export default MenuWrapper;

