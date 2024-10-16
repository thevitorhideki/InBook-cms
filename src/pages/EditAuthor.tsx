import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { fetchAuthorById, updateAuthor } from "../services/api";

export function EditAuthor() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { authorId } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authorId) {
        await updateAuthor(authorId, name);

        alert("Autor alterado com sucesso!");
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao editar o autor.");
    } finally {
      setIsLoading(false);
      navigate("/authors");
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (authorId) {
        fetchAuthorById(authorId).then((author) => setName(author.name));
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [authorId]);

  return (
    <div className="max-w-lg mx-auto p-4 grid items-center content-center h-[90vh] w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid w-full items-center gap-1.5">
          <Label className="font-semibold">Nome do autor</Label>
          <Input
            type="text"
            value={name}
            placeholder="Digite o nome do autor"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 size={24} className="animate-spin" /> : "Salvar"}
        </Button>
      </form>
    </div>
  );
}
