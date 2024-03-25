import { useMemo } from "react";
import { parseMenuHTML } from "./utils/helpers";
import MenuGroup from "./components/MenuGroup/MenuGroup";

type Props = {
    originalElement?: string;
}

const Menu = ({
    originalElement = ''
}: Props) => {

    const parsedMenu = useMemo(
        () => {
            if (!originalElement.length) return;
            const parsedMenu = parseMenuHTML(originalElement);
          
            return parsedMenu
        },
        [originalElement]
    )

  return (
    <div className="flex flex-col flex-1 sticky">
      <div>
        rzeszowiak
      </div>

      {parsedMenu?.map(category => (
        <MenuGroup 
          category={category} 
          key={category.categoryName}
        />
      ))}
    </div>
  )
}

export default Menu

