import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Truckin Thunder Accessories",
    short_name: "Truckin Thunder",
    start_url: "/",
    display: "browser",
    background_color: "#0E1114",
    theme_color: "#0E1114",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
