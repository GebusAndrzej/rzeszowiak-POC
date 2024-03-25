import { NavLink } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { TMenuGroup as TMenuGroup } from "../../utils/helpers";
import MenuItem from "../MenuItem/MenuItem";

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
                <MenuItem item={menuItem} key={menuItem.url} />
            ))}
        </CollapsibleContent>
    </Collapsible>
  )
}

export default MenuGroup