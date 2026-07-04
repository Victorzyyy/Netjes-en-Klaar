import type { MetadataRoute } from "next";

import { businessInfo } from "@/data/site-content";

const routes = [
  "",
  "/contact",
  "/privacy",
  "/werken-bij",
  "/diensten/kantoorschoonmaak",
  "/diensten/vakantiepark-schoonmaak",
  "/diensten/evenementenreiniging",
  "/diensten/bouwschoonmaak",
  "/diensten/industriele-schoonmaak",
  "/diensten/dieptereiniging",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${businessInfo.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/contact" ? 0.9 : 0.8,
  }));
}
