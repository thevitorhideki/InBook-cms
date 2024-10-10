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
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold text-xl">Autores cadastrados</h1>

      {authors.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Deletar</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Editar</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td className="border border-gray-300 px-4 py-2">{author.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <p className="cursor-pointer flex justify-center" onClick={() => handleDelete(author.id)}>
                    <Trash size={20} />
                  </p>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <a href={`/authors/${author.id}`} className="flex justify-center">
                    <Edit size={20} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">Nenhum autor cadastrado</p>
      )}
    </div>
  );
}
