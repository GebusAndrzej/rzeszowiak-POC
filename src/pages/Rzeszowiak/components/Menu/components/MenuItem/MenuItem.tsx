import React, { useMemo } from 'react'
import { TMenuItem } from '../../utils/helpers'
import { NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import useConstructRzeszowiakUrl from '../../../Page/hooks/useConstructRzeszowiakUrl'

type Props = {
    item: TMenuItem
}

const MenuItem = ({item}: Props) => {
    console.log(item, item.children?.length)

  const isGroup = !!item.children?.length

  const {createLocalUrl: urlFromArgument} = useConstructRzeszowiakUrl(item.url)

  return isGroup
    ? (
        <div>
            GROUP: {item.text}
        </div>
    )
    : (
        <NavLink 
            to={urlFromArgument} 
            key={item.text}
            className={({ isActive }) => isActive 
                ? 'bg-green-500 font-bold' 
                : 'bg-red-500 font-thin'
            }
        >
            asd
            <div className="flex flex-col pl-1">
                <Button variant="ghost" size="sm">
                    {item.text}
                    {item.count}
                </Button>
            </div>
        </NavLink>
    )
}

export default MenuItem