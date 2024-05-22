export const processBody = (element: HTMLElement | null) => {
    const address = element?.querySelector('address');
    const city = address?.querySelector('b')?.innerHTML;

    const title = element?.querySelector('.presTitle')?.textContent;
    const price = element?.querySelector('.presPrice')?.textContent

    const description = element?.querySelector('.presDesc')?.outerHTML || '';
    const techData = element?.querySelector('.techData')?.outerHTML || '';

    const images = [
        ...element
            ?.querySelector('#LGA')
            ?.querySelectorAll('a') || [],
    ]
        .map(a => a.getAttribute('href'))
        .filter(Boolean) as string[];

    return {
        baseData: [
            {
                label: "Tytuł",
                value: title,
            },
            {
                label: "Cena",
                value: price,
            },
            {
                label: "Miasto",
                value: city,
            },
        ],
        description: description,
        additionalInfo: techData,
        images: images,
    };
};
