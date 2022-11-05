interface INotePanelData {
    objectId: string;
    title: string;
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