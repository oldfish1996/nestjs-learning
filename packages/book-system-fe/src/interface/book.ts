import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000", timeout: 10000 });
export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  cover: string;
}
export type BookValues = Omit<Book, "id">;

export const listBooks = async (keyword = "") =>
  (await api.get<Book[]>("/book/list", { params: { keyword } })).data;
export const getBook = async (id: number) =>
  (await api.get<Book>(`/book/${id}`)).data;
export const createBook = async (values: BookValues) =>
  (await api.post<Book>("/book/create", values)).data;
export const updateBook = async (book: Book) =>
  (await api.put<Book>("/book/update", book)).data;
export const deleteBook = async (id: number) =>
  api.delete(`/book/delete/${id}`);
export async function uploadCover(file: File) {
  const data = new FormData();
  data.append("file", file);
  return (await api.post<string>("/book/upload", data, { timeout: 60000 }))
    .data;
}
export function coverUrl(path: string) {
  return path ? new URL(path, "http://localhost:3000").href : undefined;
}
export function errorText(error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string") return message;
    if (Array.isArray(message)) return message.join("；");
    if (!error.response) return "无法连接服务器或请求超时，请稍后重试";
  }
  return error instanceof Error ? error.message : "操作失败，请稍后重试";
}
