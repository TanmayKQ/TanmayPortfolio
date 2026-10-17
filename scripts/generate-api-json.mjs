import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  PROFILE_ME,
  PROFILE_PROJECTS,
  PROFILE_EXPERIENCE,
  PROFILE_CONTACT,
} from "../src/data/profile.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const apiDir = join(__dirname, "..", "public", "api");

mkdirSync(apiDir, { recursive: true });

writeFileSync(
  join(apiDir, "me.json"),
  JSON.stringify(PROFILE_ME, null, 2) + "\n",
  "utf8"
);
console.log("✓ Generated public/api/me.json");

writeFileSync(
  join(apiDir, "projects.json"),
  JSON.stringify(PROFILE_PROJECTS, null, 2) + "\n",
  "utf8"
);
console.log("✓ Generated public/api/projects.json");

writeFileSync(
  join(apiDir, "experience.json"),
  JSON.stringify(PROFILE_EXPERIENCE, null, 2) + "\n",
  "utf8"
);
console.log("✓ Generated public/api/experience.json");

writeFileSync(
  join(apiDir, "contact.json"),
  JSON.stringify(PROFILE_CONTACT, null, 2) + "\n",
  "utf8"
);
console.log("✓ Generated public/api/contact.json");
