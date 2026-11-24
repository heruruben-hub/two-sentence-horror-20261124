// Two-Sentence Horror — make.fun entry
// Writes one original two-sentence horror story to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const STORY =
  "Every night since the funeral, my daughter sets an extra plate at the table for her grandmother. " +
  "Tonight I asked her why, and she said, 'Because Grandma told me to stop setting one for you.'";

// Gate validation: the entry must be UTF-8 text of 1-400 characters,
// not only whitespace, and exactly two sentences.
function validate(text: string): void {
  if (text.length < 1 || text.length > 400) {
    throw new Error(`Story must be 1-400 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("Story must not be only whitespace");
  }
  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
  if (sentences.length !== 2) {
    throw new Error(`Story must be exactly two sentences, got ${sentences.length}`);
  }
}

validate(STORY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", STORY, "utf8");

// Read the file back and confirm it holds exactly what was intended.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== STORY) {
  throw new Error("Read-back mismatch: /output/entry.txt differs from the intended story");
}
console.log(`Wrote ${STORY.length} characters to /output/entry.txt (validated, read-back OK)`);
