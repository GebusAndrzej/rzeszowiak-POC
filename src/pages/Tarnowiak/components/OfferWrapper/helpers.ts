import { SITE_URL } from "../../commom";

const parseBaseInfo = (data: Element[] = []) => {
    return data.map(attribute => {
        const key = attribute.querySelector('.fields_name')?.textContent || 'unknown';
        const value = attribute.querySelector('.fields_value')?.textContent;

        return {
            label: key,
            value,
        };
    });
}

export const processBody = (element: HTMLElement | null) => {
    const title = element?.querySelector('h1')?.textContent;

    const contents = [ ...element?.querySelectorAll('.oglfields') || [] ];

    const description = element?.querySelector('h2');

    const images = [
        ...element
            ?.querySelector('.images')
            ?.querySelectorAll('a') || []
        ].map(a => a.getAttribute('href'))
        .map(url => `${SITE_URL}${url}`)

    console.log(contents.map(a => a.outerHTML))

    return {
        description: description?.outerHTML || '',
        images: images,
        baseData: [
            {
                label: "Tytuł",
                value: title,
            },
            ...parseBaseInfo(contents)
        ]
    };
};
