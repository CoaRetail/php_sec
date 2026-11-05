const PATHS: Record<string, string> = {
  "s": "<path d=\"M24 5L40 11V23C40 33 33 41 24 44C15 41 8 33 8 23V11Z\"/><path d=\"M17 24l5 5 10-11\"/>",
  "u": "<path d=\"M38 16A15 15 0 0 0 10 20\"/><path d=\"M38 6v10H28\"/><path d=\"M10 32a15 15 0 0 0 28 4\"/><path d=\"M10 42V32h10\"/>",
  "i": "<path d=\"M24 6L44 40H4Z\"/><path d=\"M24 19v11M24 35v.5\"/>",
  "p1": "<circle cx=\"24\" cy=\"16\" r=\"7\"/><path d=\"M10 40c0-8 6-13 14-13s14 5 14 13M8 8l32 32\"/>",
  "p2": "<circle cx=\"24\" cy=\"24\" r=\"16\"/><path d=\"M24 14v11l7 4\"/>",
  "p3": "<path d=\"M24 6L44 40H4Z\"/><path d=\"M24 19v11M24 35v.5\"/>",
  "p4": "<rect x=\"6\" y=\"10\" width=\"14\" height=\"14\" rx=\"2\"/><rect x=\"28\" y=\"24\" width=\"14\" height=\"14\" rx=\"2\"/><path d=\"M20 17h6a4 4 0 0 1 4 4v3\" stroke-dasharray=\"3 5\"/>",
  "d": "<rect x=\"12\" y=\"7\" width=\"24\" height=\"34\" rx=\"4\"/><path d=\"M18 18h12M18 26h12M18 34h6\"/>",
  "m": "<circle cx=\"21\" cy=\"21\" r=\"10\"/><path d=\"M29 29l10 10\"/>",
  "c": "<path d=\"M12 38V28M24 38V18M36 38V10\"/>",
  "k": "<path d=\"M12 25l9 9 16-18\"/>"
};

export default function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: PATHS[name] }} />
  );
}
