import { ArrowLeftIcon } from 'lucide-react';
import { parseMenuHTML } from './utils/helpers';
import {
    useCallback,
    useMemo,
    useState,
} from 'react';
import MenuGroup from './components/MenuGroup/MenuGroup';
import clsx from 'clsx';
import styles from './Menu.module.css';
import Menu from '@/components/Menu/Menu';
import { constructCategoryUrl } from '../../helpers/rzeszowiakHelpers';
import { useSearchParams } from 'react-router-dom';
import MenuItem from './components/MenuItem/MenuItem';
import MenuItemBase from '@/components/Menu/components/MenuItemBase/MenuItemBase';

type Props = {
    originalElement?: string;
};

const MenuWrapper = ({ originalElement = '' }: Props) => {
    const [ params ] = useSearchParams();
    
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
            items={parsedMenu}
            siteName='Rzeszowiak'
            urlTransformer={constructCategoryUrl}
            Item={MenuItem}
        />
        // <div
        //     className={clsx(
        //         styles.wrapper,
        //         isCollapsed && styles.collapsed,
        //     )}
        // >
        //     <div
        //         className={styles.pageLogo}
        //         onClick={() => setIsCollapsed(prev => !prev)}
        //     >
        //         <ArrowLeftIcon />
        //         rzeszowiak
        //     </div>

        //     {parsedMenu?.map(category => (
        //         <MenuGroup
        //             category={category}
        //             key={category.categoryName}
        //         />
        //     ))}
        // </div>
    );
};

export default MenuWrapper;

