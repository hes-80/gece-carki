import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gece Carki",
    short_name: "Gece Carki",
    description: "Dogum haritasi ve gunluk gokyuzu",
    start_url: "/",
    display: "standalone",
    background_color: "#050607",
    theme_color: "#fb923c",
    lang: "tr",
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/signs/aslan.jpg", sizes: "192x192", type: "image/jpeg" },
      { src: "/signs/aslan.jpg", sizes: "512x512", type: "image/jpeg" },
    ],
  };
}