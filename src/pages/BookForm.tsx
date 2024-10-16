import clsx from "clsx";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorSearch from "../components/AuthorSearch";
import { FileUpload } from "../components/FileUpload";
import { MarkdownPreview } from "../components/MarkdownPreview";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { createBook } from "../services/api";
import { Author } from "../types";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [file, setFile] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!title || authors.length === 0 || !file) {
      alert("Preencha todos os campos e envie o resumo.");
      return;
    }

    try {
      await createBook({ title, authorIds: authors.map((author) => author.id) });

      alert("Livro cadastrado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar o livro.");
    } finally {
      setIsLoading(false);
      navigate("/books");
    }
  };

  return (
    <div
      className={clsx("w-full h-[90vh]", {
        "flex gap-2 items-center justify-around": file,
        "grid items-center mx-auto h-[90vh] max-w-lg content-center": !file,
      })}
    >
      <div className={file ? "w-1/4" : "w-full"}>
        <h1 className="text-2xl font-bold mb-4">Cadastro de Livro</h1>
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
          <AuthorSearch onAuthorsSelect={setAuthors} authors={authors} />
          <FileUpload onFileSelect={setFile} />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 size={24} className="animate-spin" /> : "Salvar"}
          </Button>
        </form>
      </div>
      {file && <MarkdownPreview file={file} />}
    </div>
  );
}
