import fs from "fs";
import OpenAI from "openai";
import path from "path";

const openai = new OpenAI();

export async function tts(fileName: string, text: string) {
  const contentDirectory = path.join(process.cwd(), "/public/audio");
  const speechFile = path.join(contentDirectory, `${fileName}.mp3`);
  const mp3 = await openai.audio.speech.create({
    model: "tts-1-hd",
    voice: "alloy",
    input: text,
  });

  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}
