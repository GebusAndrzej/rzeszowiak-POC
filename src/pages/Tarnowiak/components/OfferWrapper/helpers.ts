export const processBody = (element: HTMLElement | null) => {
    const title = element?.querySelector('h1')?.textContent;

    const contents = [ ...element?.querySelectorAll('.oglfields') || [] ];

    const description = element?.querySelector('h2');

    console.log(title,contents,description)

    return {

    };
};
