import axios from "axios";
import { Author, Book, BookCollection, BookDetails, UpdateBook } from "../types";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchAuthors = async (name?: string): Promise<Author[]> => {
  const response = await api.get<Author[]>("/authors", {
    params: { name },
  });

  return response.data;
};

export const fetchAuthorById = async (authorId: string): Promise<Author> => {
  const response = await api.get<Author>(`/authors/${authorId}`);

  return response.data;
};

export const createAuthor = async (name: string): Promise<string> => {
  const response = await api.post<{ authorId: string }>("/authors", {
    name,
  });

  return response.data.authorId;
};

export const updateAuthor = async (authorId: string, name: string): Promise<void> => {
  await api.put(`/authors/${authorId}`, { name: name });
};

export const deleteAuthor = async (id: string): Promise<void> => {
  await api.delete(`/authors/${id}`);
};

export const fetchBooks = async (): Promise<BookCollection[]> => {
  const response = await api.get<{ books: BookCollection[] }>("/books");

  return response.data.books;
};

export const fetchBookById = async (bookId: string): Promise<BookDetails> => {
  const response = await api.get<BookDetails>(`/books/${bookId}`);

  return response.data;
};

export const createBook = async (book: Book): Promise<void> => {
  await api.post(`/books`, book);
};

export const updateBook = async (bookId: string, book: UpdateBook): Promise<void> => {
  await api.put(`/books/${bookId}`, book);
};

export const deleteBook = async (bookId: string): Promise<void> => {
  await api.delete(`/books/${bookId}`);
};
