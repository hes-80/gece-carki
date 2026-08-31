"use client";

export function LiveSky({ lat, lon, city }: { lat: number; lon: number; city: string }) {
  const src =
    "https://stellarium-web.org/?lat=" +
    lat +
    "&lng=" +
    lon +
    "&fov=60";

  return (
    <div className="live-sky">
      <p className="live-sky-k">canli gokyuzu · {city}</p>
      <iframe
        title="Stellarium"
        src={src}
        className="live-sky-frame"
        allow="fullscreen"
      />
      <a className="live-sky-a" href={src} target="_blank" rel="noreferrer">
        buyut
      </a>
    </div>
  );
}