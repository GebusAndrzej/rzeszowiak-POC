export type TMenuGroup = {
    categoryName: string | null;
    items: TMenuItem[];
};

export type TMenuItem = {
    url?: string;
    text: any;
    count: string | null;
    children?: TMenuItem[];
};
