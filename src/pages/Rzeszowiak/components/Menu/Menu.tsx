import { useMemo } from "react";
import { parseMenuHTML } from "./utils/helpers";
import { NavLink } from "react-router-dom";

type Props = {
    originalElement?: string;
}

const Menu = ({
    originalElement = ''
}: Props) => {

    const parse = useMemo(
        () => {
            if (!originalElement.length) return;

            const parsedMenu = parseMenuHTML(originalElement);
          
            console.log(parsedMenu)

            return parsedMenu
        },
        [originalElement]
    )

  return (
    <div>
        Menu
        {parse?.map(category => (
          <div key={category.categoryName}>
              {category.categoryName}
              
              {category.items.map(menuItem => (
                <div key={menuItem.text}>
                  <NavLink to={menuItem.url}>
                    {menuItem.text}
                  </NavLink>
                </div>
              ))}
          </div>
        ))}
        ---
        {/* {originalElement} */}
        <div
          dangerouslySetInnerHTML={{__html: originalElement}}
        />
    </div>
  )
}

export default Menu

