import { NavLink, useSearchParams } from 'react-router-dom';
import { TMenuItem } from '../../utils/helpers';
import { constructCategoryUrl } from '@/pages/Rzeszowiak/helpers/rzeszowiakHelpers';
import { useMemo } from 'react';
import styles from './MenuItem.module.css'
import clsx from 'clsx';

type Props = {
    item: TMenuItem;
    depth?: number;
};

const MenuItem = ({ 
    item,
    depth = 0,
}: Props) => {
    const [params] = useSearchParams()

    const currentSubpageParam = useMemo(
        () => params.get('r') || '',
        [params]
    )
    
    const isGroup = !!item.children?.length;
    const localURL = useMemo(() => constructCategoryUrl(item.url || ''), [ item.url ]);
    
    const constructedUrlParam = useMemo(
        () => localURL.split('r=')[1],
        [localURL]
    )

    const isThisSubpageActive = useMemo(
        () => constructedUrlParam
            ? constructedUrlParam?.includes(currentSubpageParam)
            : true,
        [constructedUrlParam, currentSubpageParam]
    )

    return isGroup
        ? (<>
            <NavLink 
                to={localURL}
                className={({ isActive }) => clsx(
                    styles.menuItem,
                    isActive && styles.active
                )}
            >
                {item.text}
                ({item.count})
            </NavLink>

            <div className={styles.childrenContainer}>
                {item.children?.map(item => (
                    <MenuItem 
                        item={item} 
                        key={item.url} 
                        depth={depth + 1}
                    />
                ))}
            </div>
        </>)
        : (
            <NavLink
                className={({ isActive }) => clsx(
                    styles.menuItem,
                    isActive && isThisSubpageActive && styles.active
                )}
                key={item.text}
                to={localURL}
            >
                <div className={styles.menuLabel}>
                    {item.text}

                    <span className={styles.count}>
                        ({item.count})
                    </span>
                </div>
            </NavLink>
        );
};

export default MenuItem;
