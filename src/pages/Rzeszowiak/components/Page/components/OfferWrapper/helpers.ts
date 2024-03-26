export const processBody = (body: HTMLElement) => {
    const mainContent = body.querySelector<HTMLDivElement>('#content-center');

    const contents = [ ...mainContent?.querySelectorAll('.ogloszeniebox-content') || [] ];

    const baseData = contents.splice(0, 5);
    const textContent = contents.splice(0, 1);
    const otherAnnouncements: Element[] = [];
    let photoElement: Element | undefined = undefined;

    contents.forEach((element, index) => {
        const other_ad = element.querySelector('.content_other');
        const photos = element.querySelector('#photos');

        if (other_ad) {
            otherAnnouncements.push(other_ad);
            delete contents[index];
        }

        if (photos) {
            photoElement = photos;
            delete contents[index];
        }
    });

    return {
        baseData: parseBaseData(baseData),
        description: textContent[0]?.outerHTML,
        photos: getImageLinks(photoElement),
        rest: contents.filter(Boolean),
    }
}

function getImageLinks(photosWrpper?: Element) {
    if (!photosWrpper) return [];

    const arr = photosWrpper.querySelectorAll('a');

    return [...arr].map(a => a.getAttribute('href'))
}

function parseBaseData(data: Element[]) {
    return data.map(attribute => {
        const key = attribute.querySelector('.label')?.textContent || 'unknown';
        const value = attribute.querySelector('.value')?.textContent;

        return {
            label: key,
            value,
        }
    })
}