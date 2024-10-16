import { Loader2 } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { textToSpeech } from "../services/api";
import "../styles/markdown.css";
import { Button } from "./ui/button";

interface MarkdownPreviewProps {
  file: string;
}

export function MarkdownPreview({ file }: MarkdownPreviewProps) {
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  function extractSynopsis(markdown: string): string {
    const lines = markdown.split("\n");
    let synopsis = "";
    let insideSynopsis = false;

    for (const line of lines) {
      // Se encontrar o título principal, comece a coletar a sinopse
      if (line.startsWith("# ")) {
        insideSynopsis = true;
        continue;
      }
      // Se encontrar o primeiro subtítulo (Capítulo 1), pare de coletar
      if (line.startsWith("## ")) {
        break;
      }
      // Coleta as linhas entre o título principal e o primeiro subtítulo
      if (insideSynopsis) {
        synopsis += line + "\n";
      }
    }

    return synopsis.trim(); // Remove espaços em branco extras
  }

  const handleGenerateAudio = async () => {
    setIsLoading(true);
    try {
      const url = await textToSpeech(sinopse);

      setAudioSrc(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sinopse = extractSynopsis(file);

  return (
    <div className="grid gap-4 w-1/2">
      <h1 className="text-2xl font-semibold">Sinopse:</h1>
      <div className="markdown-preview bg-zinc-900 p-5 rounded-xl overflow-auto max-h-[90vh]">
        <ReactMarkdown>{sinopse}</ReactMarkdown>
      </div>
      {audioSrc ? (
        <audio controls>
          <source src={audioSrc} />
          Seu navegador não suporta áudios
        </audio>
      ) : (
        <Button disabled={isLoading} onClick={handleGenerateAudio}>
          {isLoading ? <Loader2 size={24} className="animate-spin" /> : "Gerar áudio"}
        </Button>
      )}
    </div>
  );
}
