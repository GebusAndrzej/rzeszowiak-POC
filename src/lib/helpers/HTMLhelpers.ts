import DOMPurify from 'dompurify';

export function createElementFromHTML(htmlString: string) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

export function createElementsFromHTML(htmlString: string) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.childNodes;
}

export const domSanitize = (content: string, config: {
    ADD_URI_SAFE_ATTR?: string[];
    FORBID_TAGS?: string[];
}): string =>
    DOMPurify.sanitize(content, config);

export const parseHTMLResponse = (data = '') => {
    const sanitizedResponse = domSanitize(
        data,
        {
            ADD_URI_SAFE_ATTR: [
                'src',
                'href',
            ],
            FORBID_TAGS: [
                'style',
                'width',
                'height',
            ],
        },
    );

    const html = new DOMParser().parseFromString(sanitizedResponse, 'text/html');

    return html;
};
