export type DetectionSignal = {
  label: string;
  detail: string;
  weight: number;
};

export type DetectionResult = {
  score: number;
  label: "Likely human-written" | "Mixed signals" | "Likely AI-assisted";
  signals: DetectionSignal[];
  wordCount: number;
};

const AI_PHRASES = [
  "delve into",
  "in today's world",
  "it is important to note",
  "plays a crucial role",
  "seamless integration",
  "leverage the power",
  "rich tapestry",
  "as an ai",
  "foster a culture",
];

export function detectAiSignals(text: string): DetectionResult {
  const clean = text.trim();
  const words = clean.match(/[\p{L}\p{N}’'-]+/gu) ?? [];
  const sentences =
    clean
      .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
      ?.map((s) => s.trim())
      .filter(Boolean) ?? [];
  const lower = clean.toLowerCase();
  const signals: DetectionSignal[] = [];

  if (words.length < 40) {
    signals.push({
      label: "Short sample",
      detail: "Use at least 40 words for a more meaningful signal profile.",
      weight: 0,
    });
  }

  const phraseHits = AI_PHRASES.filter((phrase) => lower.includes(phrase));
  if (phraseHits.length) {
    signals.push({
      label: "Template-like phrasing",
      detail: `Found ${phraseHits.length} common AI-style phrase${phraseHits.length === 1 ? "" : "s"}.`,
      weight: Math.min(18, phraseHits.length * 6),
    });
  }

  if (sentences.length >= 3) {
    const lengths = sentences.map((sentence) => sentence.match(/[\p{L}\p{N}’'-]+/gu)?.length ?? 0);
    const average = lengths.reduce((sum, value) => sum + value, 0) / lengths.length;
    const variance =
      lengths.reduce((sum, value) => sum + (value - average) ** 2, 0) / lengths.length;
    if (Math.sqrt(variance) < 4) {
      signals.push({
        label: "Uniform sentence rhythm",
        detail: "Sentence lengths are unusually consistent.",
        weight: 16,
      });
    }
  }

  const punctuation = (clean.match(/[,;:]/g) ?? []).length;
  if (words.length > 80 && punctuation / words.length > 0.045) {
    signals.push({
      label: "Polished punctuation",
      detail: "Frequent structured punctuation can indicate assisted editing.",
      weight: 10,
    });
  }

  const uniqueWords = new Set(words.map((word) => word.toLowerCase())).size;
  const repetition = words.length ? 1 - uniqueWords / words.length : 0;
  if (words.length > 50 && repetition < 0.32) {
    signals.push({
      label: "High vocabulary variety",
      detail: "The sample uses a broad vocabulary with little repetition.",
      weight: 8,
    });
  }

  const score = Math.max(
    0,
    Math.min(
      99,
      Math.round(
        signals.reduce((sum, signal) => sum + signal.weight, 0) + (words.length >= 40 ? 8 : 0),
      ),
    ),
  );
  const label =
    score >= 45 ? "Likely AI-assisted" : score >= 22 ? "Mixed signals" : "Likely human-written";

  return { score, label, signals, wordCount: words.length };
}
