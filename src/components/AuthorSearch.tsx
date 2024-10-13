import { X } from "lucide-react"; // Ícone para remover autor
import { useEffect, useState } from "react";
import { createAuthor, fetchAuthors } from "../services/api";
import { Author } from "../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AuthorSearchProps {
  onAuthorsSelect: (authors: Author[]) => void;
  authors?: Author[];
}

export function AuthorSearch({ onAuthorsSelect, authors = [] }: AuthorSearchProps) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Author[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>(authors);

  useEffect(() => {
    if (inputValue) {
      const delayDebounceFn = setTimeout(() => {
        fetchAuthors(inputValue).then((authors) => {
          // Filtrar autores já selecionados
          const filteredAuthors = authors.filter((author) => !selectedAuthors.some((a) => a.id === author.id));
          setOptions(filteredAuthors);
        });
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setOptions([]);
      setOpen(false);
    }
  }, [inputValue, selectedAuthors]);

  const handleSelect = (author: Author) => {
    const updatedAuthors = [...selectedAuthors, author];
    setSelectedAuthors(updatedAuthors);
    onAuthorsSelect(updatedAuthors);
    setInputValue("");
    setOptions([]);
    setOpen(false);
  };

  const handleCreateNewAuthor = async () => {
    const authorId = await createAuthor(inputValue);

    const newAuthor: Author = {
      id: authorId,
      name: inputValue,
    };

    const updatedAuthors = [...selectedAuthors, newAuthor];
    setSelectedAuthors(updatedAuthors);
    onAuthorsSelect(updatedAuthors);
    setInputValue("");
    setOptions([]);
    setOpen(false);
  };

  const handleRemoveAuthor = (authorId: string) => {
    const updatedAuthors = selectedAuthors.filter((author) => author.id !== authorId);
    setSelectedAuthors(updatedAuthors);
    onAuthorsSelect(updatedAuthors);
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label className="font-semibold">Autores</Label>
      <div className="flex">
        <Input
          className="w-full rounded-r-none"
          placeholder="Digite o nome do autor"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setOpen(true);
          }}
        />
        <Button
          type="button"
          className="rounded-l-none"
          disabled={
            !inputValue ||
            options.find((author) => author.name === inputValue) !== undefined ||
            selectedAuthors.some((author) => author.name === inputValue)
          }
          onClick={handleCreateNewAuthor}
        >
          Adicionar
        </Button>
      </div>
      {selectedAuthors.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedAuthors.map((author) => (
            <div key={author.id} className="flex items-center bg-zinc-800 text-white px-2 py-1 rounded">
              <span>{author.name}</span>
              <button type="button" className="ml-1" onClick={() => handleRemoveAuthor(author.id)}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      {open && options.length > 0 && (
        <div className="w-full grid items-center gap-2 max-h-60 overflow-auto mt-2">
          {options.map((author) => (
            <p
              key={author.id}
              className="cursor-pointer py-2 px-4 bg-zinc-900 rounded-sm"
              onClick={() => handleSelect(author)}
            >
              {author.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthorSearch;
