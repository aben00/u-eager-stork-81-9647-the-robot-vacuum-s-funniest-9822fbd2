// The Robot Vacuum's Funniest Excuse
// Writes one original line — the excuse a robot vacuum gives for missing a spot —
// to /output/entry.txt and self-checks the gate (1-120 chars, single line).
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const ENTRY =
  "I left that crumb as a snack for later. I am a vacuum, not a monster.";

const OUT = "/output/entry.txt";

function checkGate(text: string): number {
  // Gate: 1-120 characters, one line, not only whitespace.
  const chars = [...text].length;
  if (chars < 1 || chars > 120) {
    throw new Error(`entry is ${chars} chars, must be 1-120`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  return chars;
}

function main(): void {
  const chars = checkGate(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT, ENTRY, "utf8");
  const written = readFileSync(OUT, "utf8");
  if (written !== ENTRY) {
    throw new Error("round-trip check failed: file differs from entry");
  }
  const sha = createHash("sha256").update(written, "utf8").digest("hex");
  console.log(`entry (${chars} chars): ${ENTRY}`);
  console.log(`output sha256: ${sha}`);
}

main();
