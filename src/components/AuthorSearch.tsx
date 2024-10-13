import { Loader2, X } from "lucide-react"; // Ícone para remover autor e ícone de loading
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
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true); // Iniciar o carregamento
      const delayDebounceFn = setTimeout(() => {
        fetchAuthors(inputValue).then((authors) => {
          // Filtrar autores já selecionados
          const filteredAuthors = authors.filter((author) => !selectedAuthors.some((a) => a.id === author.id));
          setOptions(filteredAuthors);
          setIsLoading(false); // Finalizar o carregamento
        });
      }, 300);

      return () => {
        clearTimeout(delayDebounceFn);
        setIsLoading(false); // Finalizar o carregamento se a busca for cancelada
      };
    } else {
      setOptions([]);
      setOpen(false);
      setIsLoading(false); // Certifique-se de que o carregamento está desativado
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
        <div className="relative w-full">
          <Input
            className="w-full rounded-r-none"
            placeholder="Digite o nome do autor"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setOpen(true);
            }}
          />
          {isLoading && <Loader2 className="absolute right-2 top-2 animate-spin" size={20} />}
        </div>
        <Button
          type="button"
          className="rounded-l-none"
          disabled={
            !inputValue ||
            options.find((author) => author.name === inputValue) !== undefined ||
            selectedAuthors.some((author) => author.name === inputValue) ||
            isLoading
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
