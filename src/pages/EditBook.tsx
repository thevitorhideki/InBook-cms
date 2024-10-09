import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthorSearch from "../components/AuthorSearch";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { fetchBookById, updateBook } from "../services/api";
import { Author, BookDetails, UpdateBook } from "../types";

export function EditBook() {
  const [book, setBook] = useState<BookDetails | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState<Author | null>(null);
  const navigate = useNavigate();

  const { bookId } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookId) return;

    const newBook: UpdateBook = {
      title: book?.title,
      authorId: author?.id,
    };

    console.log(author);

    try {
      await updateBook(bookId, newBook);

      alert("Livro alterado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao editar o livro.");
    } finally {
      navigate("/books");
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (bookId) {
        fetchBookById(bookId).then((book) => {
          setBook(book);
          setTitle(book.title);
          setAuthor({ id: book.author.authorId, name: book.author.name });
        });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [bookId]);

  if (!book) return;

  return (
    <div className="max-w-lg mx-auto p-4 grid items-center content-center flex-1 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid w-full items-center gap-1.5">
          <Label className="font-semibold">Título do Livro</Label>
          <Input
            type="text"
            value={title}
            placeholder="Digite o título da obra"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <AuthorSearch onAuthorSelect={setAuthor} author={author} />
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </div>
  );
}
