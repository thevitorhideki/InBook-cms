import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FileUploadProps {
  onFileSelect: (file: FileList | null) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file) {
      onFileSelect(file);
    } else {
      alert("Você precisa enviar o resumo");
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label className="font-semibold">Resumo</Label>
      <Input type="file" onChange={handleFileChange} required />
    </div>
  );
}
