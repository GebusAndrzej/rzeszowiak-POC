import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { TMenuItem } from '../../utils/helpers';
import { constructCategoryUrl } from '@/pages/Rzeszowiak/helpers/rzeszowiakHelpers';
import { useMemo } from 'react';

type Props = {
    item: TMenuItem;
};

const MenuItem = ({ item }: Props) => {
    const isGroup = !!item.children?.length;
    const localURL = useMemo(() => constructCategoryUrl(item.url || ''), [ item.url ]);

    return isGroup
        ? (
            <>
                <NavLink to={localURL}>
                    GROUP: {item.text}
                </NavLink>

                <div className='bg-slate-200'>
                    {item.children?.map(item => (
                        <MenuItem item={item} key={item.url} />
                    ))}
                </div>
            </>
        )
        : (
            <NavLink
                className={({ isActive }) => isActive
                    ? 'bg-green-500 font-bold'
                    : 'bg-red-500 font-thin'
                }
                key={item.text}
                to={localURL}
            >
                <div className="flex flex-col pl-1">
                    <Button
                        size="sm"
                        variant="ghost"
                    >
                        {item.text}
                        {item.count}
                    </Button>
                </div>
            </NavLink>
        );
};

export default MenuItem;
