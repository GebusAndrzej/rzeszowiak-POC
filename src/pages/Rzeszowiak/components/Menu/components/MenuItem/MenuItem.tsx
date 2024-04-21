import {
    NavLink,
    useSearchParams,
} from 'react-router-dom';
import { constructCategoryUrl } from '@/pages/Rzeszowiak/helpers/rzeszowiakHelpers';
import { useMemo } from 'react';
import clsx from 'clsx';
import styles from './MenuItem.module.css';
import { TMenuItem } from '@/components/Menu/Menu.d';

type Props = {
    item: TMenuItem;
    urlTransformer?: (url?: string) => string;
};

const MenuItem = ({
    item,
}: Props) => {
    const [ params ] = useSearchParams();

    const currentSubpageParam = useMemo(
        () => params.get('r') || '',
        [ params ],
    );

    const isGroup = !!item.children?.length;
    const localURL = useMemo(() => constructCategoryUrl(item.url || ''), [ item.url ]);

    const constructedUrlParam = useMemo(
        () => localURL.split('r=')[1],
        [ localURL ],
    );

    const isThisSubpageActive = useMemo(
        () => constructedUrlParam
            ? constructedUrlParam?.includes(currentSubpageParam)
            : true,
        [
            constructedUrlParam,
            currentSubpageParam,
        ],
    );

    return isGroup
        ? (<>
            <NavLink
                className={({ isActive }) => clsx(
                    styles.menuItem,
                    isActive && styles.active,
                )}
                to={localURL}
            >
                <span className={styles.text}>
                    {item.text}
                </span>

                {!!item.count && (
                    <span className={styles.count}>
                        ({item.count})
                    </span>
                )}
            </NavLink>

            <div className={styles.childrenContainer}>
                {item.children?.map(item => (
                    <MenuItem
                        item={item}
                        key={item.url}
                    />
                ))}
            </div>
        </>)
        : (
            <NavLink
                className={({ isActive }) => clsx(
                    styles.menuItem,
                    isActive && isThisSubpageActive && styles.active,
                )}
                key={item.text}
                to={localURL}
            >
                <div className={styles.menuLabelContainer}>
                    <span className={styles.text}>
                        {item.text}
                    </span>

                    {!!item.count && (
                        <span className={styles.count}>
                            ({item.count})
                        </span>
                    )}
                </div>
            </NavLink>
        );
};

export default MenuItem;
