'use client';
import { Button } from "./ui/button";

export default function CopyButton({ value }: { value: string }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {}
  }
  return (
    <Button variant="ghost" size="sm" onClick={copy}>
      Copy
    </Button>
  );
}