import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteAuthor, fetchAuthors } from "../services/api";
import { Author } from "../types";

export function Authors() {
  const [authors, setAuthors] = useState<Author[] | null>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAuthors().then((authors) => setAuthors(authors));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, []);

  const handleDelete = async (authorId: string) => {
    try {
      await deleteAuthor(authorId);
      setAuthors((prevAuthors) => prevAuthors?.filter((author) => author.id !== authorId) || null);
    } catch (error) {
      console.error("Failed to delete author:", error);
    }
  };

  if (!authors) {
    return;
  }

  return (
    <div className="flex gap-4 flex-col">
      <h1 className="font-semibold text-xl">Autores cadastrados</h1>

      <div className="flex justify-center gap-4">
        {authors.length > 0 ? (
          authors.map((author) => (
            <div key={author.id} className="w-1/5 grid gap-2">
              <img src="https://placehold.co/1000x1000/png" alt="placeholder" />
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">{author.name}</h1>
                <div className="grid gap-2">
                  <p className="cursor-pointer" onClick={() => handleDelete(author.id)}>
                    <Trash size={20} />
                  </p>
                  <a href={`/authors/${author.id}`}>
                    <Edit size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Nenhum autor cadastrado</p>
        )}
      </div>
    </div>
  );
}
