import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorSearch from "../components/AuthorSearch";
import { FileUpload } from "../components/FileUpload";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { createBook } from "../services/api";
import { uploadFiles } from "../services/storage";
import { Author } from "../types";
import { generateSlug } from "../utils/SlugGenerator";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [file, setFile] = useState<FileList | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || authors.length === 0 || !file) {
      alert("Preencha todos os campos e envie o resumo.");
      return;
    }

    try {
      const slug = generateSlug(title);

      // Cadastro do resumo
      await uploadFiles(file, slug);

      // Cadastro do livro
      await createBook({ title, authorIds: authors.map((author) => author.id) });

      alert("Livro cadastrado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar o livro.");
    } finally {
      navigate("/books");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 grid items-center content-center flex-1 w-full">
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
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </div>
  );
}
