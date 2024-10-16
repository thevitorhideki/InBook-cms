import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FileUploadProps {
  onFileSelect: (file: string) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const content = e.target?.result as string;
        onFileSelect(content);
      };
      reader.readAsText(file);
    } else {
      alert("Você precisa enviar o resumo");
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label className="font-semibold">Resumo</Label>
      <Input type="file" onChange={handleFileUpload} accept=".md" required />
    </div>
  );
}
