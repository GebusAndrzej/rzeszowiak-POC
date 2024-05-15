import {
    TMenuGroup,
    TMenuItem,
} from "@/components/Menu/Menu.d";
import { createElementsFromHTML } from "@/lib/helpers/HTMLhelpers";

const getAnchorData = (element: HTMLAnchorElement): TMenuItem => {
    const children = element.childNodes;
    const url = element.getAttribute('href')?.substring(1);
    const text = (children[0]?.textContent || '').trim();
    const count = children[1]?.textContent || '';

    return {
        count,
        text,
        url,
    };
};

const checkIsGroup = (list: ChildNode | null) => list && list.nodeName === "A";

const parseGroup = (list: HTMLLIElement): TMenuGroup => {
    const isGroup = checkIsGroup(list.firstChild);

    const elements = isGroup
        ? list.querySelector('ul')?.children || []
        : list.children;

    const groups = [];

    for (let i = 0; i < elements?.length; i++) {
        if (elements[i].children.length > 1 && checkIsGroup(elements[i].firstChild)) {
            const a = parseGroup(elements[i] as HTMLLIElement);

            groups.push({
                children: a.items,
                count: '',
                text: a.categoryName,
            });
        } else {
            const data = getAnchorData(elements[i].firstChild as HTMLAnchorElement);
            groups.push(data);
        }
    }

    const name = isGroup
        ? getAnchorData(list.firstChild as HTMLAnchorElement).text
        : '';

    const returnData = {
        categoryName: name,
        items: groups,
    };

    return returnData;
};

export const parseMenuHTML = (html: string): TMenuGroup[] => {
    const wrapperDiv = createElementsFromHTML(html);

    const mainGroups: HTMLLIElement[] = [];

    for (let i = 0; i < wrapperDiv.length; i++) {
        if (wrapperDiv[i].nodeName == '#text') continue;

        if (wrapperDiv[i].nodeName == 'LI') {
            mainGroups.push(wrapperDiv[i] as HTMLLIElement);
        }
    }

    return mainGroups.map(parseGroup);
};
