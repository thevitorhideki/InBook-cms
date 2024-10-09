import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteBook, fetchBooks } from "../services/api";
import { BookCollection } from "../types";

export function Books() {
  const [books, setBooks] = useState<BookCollection[] | null>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBooks().then((books) => setBooks(books));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, []);

  const handleDelete = async (bookId: string) => {
    try {
      await deleteBook(bookId);
      setBooks((prevBooks) => prevBooks?.filter((book) => book.id !== bookId) || null);
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  if (!books) {
    return;
  }

  return (
    <div className="flex gap-4 flex-col">
      <h1 className="font-semibold text-xl">Resumos cadastrados</h1>

      <div className="flex justify-center gap-4">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="w-1/5 grid gap-2">
              <img src="https://placehold.co/1000x1000/png" alt="placeholder" />
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-semibold text-lg">{book.title}</h1>
                  <p>{book.author.name}</p>
                </div>
                <div className="grid gap-2">
                  <p className="cursor-pointer" onClick={() => handleDelete(book.id)}>
                    <Trash size={20} />
                  </p>
                  <a href={`/books/${book.id}`}>
                    <Edit size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Nenhum livro cadastrado</p>
        )}
      </div>
    </div>
  );
}
