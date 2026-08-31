"use client";

import { useEffect, useRef, useState } from "react";

export function LiveSky({ lat, lon, city }: { lat: number; lon: number; city: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [clock, setClock] = useState("");
  const href =
    "https://stellarium-web.org/?lat=" + lat + "&lng=" + lon + "&fov=60";

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + 0.25,
      p: Math.random() * 6.28,
    }));
    let id = 0;
    const draw = (t: number) => {
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, c.width, c.height);
      for (const s of stars) {
        const a = 0.4 + 0.6 * Math.abs(Math.sin(t / 800 + s.p));
        ctx.fillStyle = "rgba(253,230,138," + a + ")";
        ctx.beginPath();
        ctx.arc(s.x * c.width, s.y * c.height, s.r, 0, 6.28);
        ctx.fill();
      }
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    const tick = () => setClock(new Date().toLocaleTimeString("tr-TR"));
    tick();
    const tm = window.setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(id);
      window.clearInterval(tm);
    };
  }, []);

  return (
    <div className="live-sky">
      <p className="live-sky-k">gokyuzu · {city}</p>
      <canvas ref={ref} width={240} height={72} className="live-sky-cv" />
      <p className="live-sky-t">{clock}</p>
      <a className="live-sky-a" href={href} target="_blank" rel="noreferrer">
        Stellarium ile ac
      </a>
    </div>
  );
}