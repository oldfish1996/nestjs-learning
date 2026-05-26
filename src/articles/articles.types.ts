export type Article = {
  id: number;
  title: string;
  content: string;
};

export type CreateArticleBody = {
  title: string;
  content: string;
};