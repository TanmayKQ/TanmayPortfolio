import { MetadataRoute } from "next";
import { VERIFIED_LINKS } from "@/data/projects";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${VERIFIED_LINKS.portfolio}/sitemap.xml`,
  };
}
