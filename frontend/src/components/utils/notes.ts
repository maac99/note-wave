export interface Note {
    id: string;
    title: string;
    content: any;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type PartialListNote = Pick<Note, "id" | "title" | "isArchived">;