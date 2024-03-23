import { NavLink } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { MenuGroup as TMenuGroup } from "../../utils/helpers";

type Props = {
    category: TMenuGroup;
}

const MenuGroup = ({category}: Props) => {    
  return (
    <Collapsible key={category.categoryName} className="flex flex-col">
        <CollapsibleTrigger>
            <Button variant="outline" className="flex flex-column">
                {category.categoryName}
            </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
            {category.items.map(menuItem => (
                <NavLink 
                    to={menuItem.url || ''} 
                    key={menuItem.text}
                    className={({ isActive }) =>
                        isActive ? 'bg-green-500 font-bold' : 'bg-red-500 font-thin'
                    }
                >
                    asd
                    <div className="flex flex-col pl-1">
                        <Button variant="ghost" size="sm">
                            {menuItem.text}
                            {menuItem.count}
                        </Button>
                    </div>
                </NavLink>
            ))}
        </CollapsibleContent>
    </Collapsible>
  )
}

export default MenuGroup