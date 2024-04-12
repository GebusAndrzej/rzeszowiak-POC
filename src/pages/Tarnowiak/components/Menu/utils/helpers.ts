import { createElementFromHTML } from '@/lib/helpers/HTMLhelpers';

export type TMenuGroup = {
    categoryName: string | null;
    items: TMenuItem[];
};

export type TMenuItem = {
    url?: string | undefined;
    text: string;
    count: string | null;
    children?: TMenuItem[];
};

const getLinkData = (html: string): TMenuItem => {
    const element = createElementFromHTML(`<div>${html}</div>`) as HTMLDivElement;
    const anchor = element.querySelector('a');

    const count = element.querySelector('.subcategory_count')?.textContent || '';
    const url = anchor?.getAttribute('href')?.substring(1);
    const text = anchor?.textContent || '';

    return {
        count,
        text,
        url,
    };
};

const parseSubGroups = (items: string[]): TMenuItem[] => {
    const map: Record<string, TMenuItem[]> = {};
    let pointer = '';

    for (const item of items) {
        if (item.includes('"category_title')) {
            const mainCategoryDiv = item.match(/<div\b[^>]*[^>]*>([\s\S]*?)<\/div>/)?.[0] || '';
            const rest = item.replace(mainCategoryDiv, '');
            const element = createElementFromHTML(mainCategoryDiv)?.textContent;

            pointer = `${element}`;
            map[`${pointer}`] = [ getLinkData(rest) ];
        } else {
            if (Array.isArray(map[pointer]))
                map[`${pointer}`].push(getLinkData(item));
            else
                map[`${pointer}`] = [ getLinkData(item) ];
        }
    }

    const parsed = Object.entries(map).map(([ key, value ]) => ({
        children: value,
        count: '',
        text: key,
    }));

    return parsed;
};

const parseGroup = (html: string): TMenuGroup => {
    const mainCategoryDiv = html?.match(/<div\b[^>]*[^>]*>([\s\S]*?)<\/div>/)?.[0] || '';

    const splittedItems = html
        .replace(/\n/g, '')
        .replace(mainCategoryDiv, '')
        .split('<div style="clear:both"></div>')
        .filter((text: string) => text.length);

    const mainGroupName = createElementFromHTML(mainCategoryDiv)?.textContent;

    const content = createElementFromHTML(`<div>${splittedItems.join()}</div>`) as HTMLDivElement;
    const hasSubGroups = !!content.querySelectorAll('.category_title').length;

    const groups = [];

    if (hasSubGroups) {
        const parsed = parseSubGroups(splittedItems);
        groups.push(...parsed);
    } else {
        for (let i = 0; i < splittedItems.length; i++) {
            const el = getLinkData(splittedItems[i]);
            groups.push(el);
        }
    }

    const returnData = {
        categoryName: mainGroupName || '',
        items: groups,
    };

    return returnData;
};

export const parseMenuHTML = (html: string): TMenuGroup[] => {
    const wrapperDiv = createElementFromHTML(html) as HTMLDivElement;

    const groups = wrapperDiv.innerHTML
        .split('<div class="main_category_title')
        .map(text => `<div class="main_category_title${text}`)
        .filter((_, index) => index !== 0);

    const parsedGroups = groups.map(parseGroup);
    return parsedGroups;
};
