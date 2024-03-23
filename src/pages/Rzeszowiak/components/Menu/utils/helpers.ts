import { createElementsFromHTML } from "@/lib/helpers/HTMLhelpers"

export type MenuGroup = {
    categoryName: string | null;
    items: MenuItem[];
}

type MenuItem = {
    url: string | undefined;
    text: any;
    count: string | null;
    children?: MenuItem[];
}

export const parseMenuHTML = (html: string) => {
    const firstDivSelector = /<div\s+class="menu-left-middle">/gm
    const menuElements = html
        .replace(firstDivSelector, '')
        .split('<br>')

    menuElements.pop()

    return menuElements.map(menuElement => {
        const [category, _, list] = createElementsFromHTML(menuElement)

        const menuItem = {
            categoryName: category.textContent,
            items: parseList(list as HTMLUListElement),
        }

        return menuItem;
    })
}

const parseList = (list: HTMLUListElement) => {
    const groups = [];
    
    for(let i = 0; i < list.children.length; i++) {
        const listItem = list.children[i];
        const firstChild = listItem.firstChild as HTMLElement;

        if (firstChild.tagName == 'A') {
            // INFO: If its jus anchor tag, parse data and add to array
            const data = getAnchorData(firstChild as HTMLAnchorElement)

            groups.push(data)
            
        } else {
            // INFO: if it's array, items belong to previous element - add them ad its children
            const children = parseList(firstChild.nextSibling as HTMLUListElement);

            const previousElement = groups[i-1];

            if (previousElement) {
                groups[i-1].children = children
            }
        }
    }

    return groups;
}

const getAnchorData = (element: HTMLAnchorElement): MenuItem => {
    const children = element.childNodes;
    const url = element.getAttribute('href')?.substring(1)
    
    const text = (children[2].textContent || '')
        .replace('+', '')
        .trim()

    const count = children[3].textContent

    return {
        url: url,
        text: text,
        count: count,
    }
}