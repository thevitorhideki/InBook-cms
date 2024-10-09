import { useEffect, useState } from "react";
import { createAuthor, fetchAuthors } from "../services/api";
import { Author } from "../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AuthorSearchProps {
  onAuthorSelect: (author: Author | null) => void;
  author?: Author | null;
}

export function AuthorSearch({ onAuthorSelect, author }: AuthorSearchProps) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Author[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (inputValue) {
      const delayDebounceFn = setTimeout(() => {
        fetchAuthors(inputValue).then((authors) => setOptions(authors));
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setOptions([]);
      setOpen(false);
    }
  }, [inputValue]);

  useEffect(() => {
    if (author) {
      setInputValue(author.name);
    }
  }, [author]);

  const handleSelect = (value: string) => {
    const selectedAuthor = options.find((author) => author.name === value);

    if (selectedAuthor) {
      setInputValue(selectedAuthor.name);
      onAuthorSelect(selectedAuthor);
    }
    setOpen(false);
  };

  const handleCreateNewAuthor = async () => {
    const authorId = await createAuthor(inputValue);

    const newAuthor = {
      id: authorId,
      name: inputValue,
    };

    onAuthorSelect(newAuthor);
    setOpen(false);
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label className="font-semibold">Autor</Label>
      <div className="flex">
        <Input
          className="w-full rounded-r-none"
          placeholder="Digite o nome do autor"
          value={inputValue}
          required
          onChange={(e) => {
            setInputValue(e.target.value);
            setOpen(true);
          }}
        />
        <Button
          type="button"
          className="rounded-l-none"
          disabled={options.find((author) => author.name === inputValue) || !open ? true : false}
          onClick={handleCreateNewAuthor}
        >
          Adicionar
        </Button>
      </div>
      {open && (
        <div className="w-full grid items-center gap-2 max-h-60 overflow-auto">
          {options.length > 0 ? (
            options.map((author) => (
              <p
                key={author.id}
                className="cursor-pointer py-2 px-4 bg-zinc-900 rounded-sm"
                onClick={() => handleSelect(author.name)}
              >
                {author.name}
              </p>
            ))
          ) : (
            <p className="text-center mb-3 py-4">Nenhum autor encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AuthorSearch;
