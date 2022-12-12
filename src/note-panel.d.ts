interface INotePanelData {
    objectId: string;
    title: string;
    tag: string;
    markdown: string;
    createdAt: string;
    updatedAt: string;
}

interface INoteList {
    total: number;
    page: number;
    size: number;
    data: INotePanelData[];
}


interface ITag {
    objectId: string;
    value: string;
    createdAt: string;
    updatedAt: string;
}

interface ITagList {
    total: number;
    page: number;
    size: number;
    data: ITag[];
}
