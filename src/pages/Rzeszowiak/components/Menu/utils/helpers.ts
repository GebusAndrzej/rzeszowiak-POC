import { createElementsFromHTML } from "@/lib/helpers/HTMLhelpers"

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

        let groupData = {}

        if (firstChild.tagName == 'A') {
            Object.assign(
                groupData,
                getAnchorData(firstChild as HTMLAnchorElement)
            )
        } else {
            const children = parseList(firstChild.nextSibling as HTMLUListElement);

            Object.assign(
                groupData,
                children,
            )
            groups[i-1].children = children
        }

        groups.push(groupData)
    }

    return groups;
}

const getAnchorData = (element: HTMLAnchorElement) => {
    const children = element.childNodes;
    const url = element.getAttribute('href')
    
    const text = (children[2].textContent || '')
        .replaceAll('+', '')
        .trim()

    const count = children[3].textContent

    return {
        url: url,
        text: text,
        count: count,
    }
}
