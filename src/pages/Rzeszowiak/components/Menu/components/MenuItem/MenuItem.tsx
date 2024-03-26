import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { TMenuItem } from '../../utils/helpers';
import useConstructRzeszowiakUrl from '../../../Page/hooks/useConstructRzeszowiakUrl';

type Props = {
    item: TMenuItem;
};

const MenuItem = ({ item }: Props) => {
    console.log(item, item.children?.length);

    const isGroup = !!item.children?.length;

    const { createLocalUrl: urlFromArgument } = useConstructRzeszowiakUrl(item.url);

    return isGroup
        ? (
            <div>
            GROUP: {item.text}
            </div>
        )
        : (
            <NavLink
                className={({ isActive }) => isActive
                    ? 'bg-green-500 font-bold'
                    : 'bg-red-500 font-thin'
                }
                key={item.text}
                to={urlFromArgument}
            >
            asd
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
