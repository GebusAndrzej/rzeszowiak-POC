import { createElementsFromHTML } from '@/lib/helpers/HTMLhelpers';

export type TMenuGroup = {
    categoryName: string | null;
    items: TMenuItem[];
};

export type TMenuItem = {
    url?: string | undefined;
    text: any;
    count: string | null;
    children?: TMenuItem[];
};

const getAnchorData = (element: HTMLAnchorElement): TMenuItem => {
    const children = element.childNodes;
    const url = element.getAttribute('href')?.substring(1);

    const text = (children[2].textContent || '')
        .replace('+', '')
        .trim();

    const count = children[3].textContent;

    return {
        count,
        text,
        url,
    };
};

const parseList = (list: HTMLUListElement) => {
    const groups = [];

    for (let i = 0; i < list.children.length; i++) {
        const listItem = list.children[i];
        const firstChild = listItem.firstChild as HTMLElement;

        if (firstChild.tagName == 'A') {
            // INFO: If its jus anchor tag, parse data and add to array
            const data = getAnchorData(firstChild as HTMLAnchorElement);

            groups.push(data);

        } else {
            // INFO: if it's array, items belong to previous element - add them ad its children
            const children = parseList(firstChild.nextSibling as HTMLUListElement);

            const previousElement = groups[i - 1];

            if (previousElement) {
                groups[i - 1].children = children;
            }
        }
    }

    return groups;
};

export const parseMenuHTML = (html: string): TMenuGroup[] => {
    const firstDivSelector = /<div\s+class="menu-left-middle">/gm;
    const menuElements = html
        .replace(firstDivSelector, '')
        .split('<br>');

    menuElements.pop();

    return menuElements.map(menuElement => {
        const [
            category,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _,
            list,
        ] = createElementsFromHTML(menuElement);

        const menuItem = {
            categoryName: category.textContent,
            items: parseList(list as HTMLUListElement),
        };

        return menuItem;
    });
};
