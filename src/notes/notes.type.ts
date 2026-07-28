export type Note = {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
};

export type CreateNoteBody = {
  userId: number;
  title: string;
  content: string;
};
