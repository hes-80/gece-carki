import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const key = process.env.AGENTROUTER_KEY;
  if (!key) return new Response("no key", { status: 501 });

  const { text } = await req.json();
  const input = String(text || "").slice(0, 800);
  if (!input) return new Response("empty", { status: 400 });

  const res = await fetch("https://agentrouter.org/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "tts-1",
      voice: "shimmer",
      input,
      response_format: "mp3",
      speed: 0.95,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return new Response(err.slice(0, 200), { status: 502 });
  }

  return new Response(res.body, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}
