import { parseMenuHTML } from './utils/helpers';
import { useMemo, useState } from 'react';
import MenuGroup from './components/MenuGroup/MenuGroup';
import styles from './Menu.module.css'
import { ArrowLeftIcon } from 'lucide-react';
import clsx from 'clsx';

type Props = {
    originalElement?: string;
};

const Menu = ({ originalElement = '' }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const parsedMenu = useMemo(
        () => {
            if (!originalElement.length) return;
            const parsedMenuElement = parseMenuHTML(originalElement);

            return parsedMenuElement;
        },
        [ originalElement ],
    );

    return (
        <div className={clsx(
            styles.wrapper,
            isCollapsed && styles.collapsed
        )}>
            <div className={styles.pageLogo}
                onClick={() => setIsCollapsed(prev => !prev)}
            >
                <ArrowLeftIcon/>
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

