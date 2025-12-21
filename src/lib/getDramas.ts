import fs from "fs";
import path from "path";

type Drama = {
  slug: string;
  title: string;
  year: number;
  status: string;
  vibes: string[];
};

export function getDramas(): Drama[] {
  const dir = path.join(process.cwd(), "src/content/dramas");
  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (f) =>
        f.isFile() &&
        f.name.endsWith(".mdx") &&
        !f.name.startsWith("_")
    );

  const dramas: Drama[] = [];

  for (const file of files) {
    const slug = path.basename(file.name, ".mdx");
    const content = fs.readFileSync(path.join(dir, file.name), "utf8");

    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) continue;

    const frontmatter = match[1];
    const lines = frontmatter.split("\n");

    let title = "";
    let year = 0;
    let status = "";
    let vibes: string[] = [];
    let inVibes = false;

    for (const line of lines) {
      if (inVibes) {
        const v = line.match(/^\s*-\s*(.+)$/);
        if (v) {
          vibes.push(v[1].trim());
          continue;
        }
        inVibes = false;
      }

      if (line.startsWith("title:")) {
        title = line.replace("title:", "").trim();
      } else if (line.startsWith("year:")) {
        year = Number(line.replace("year:", "").trim());
      } else if (line.startsWith("status:")) {
        status = line.replace("status:", "").trim();
      } else if (line.startsWith("vibes:")) {
        inVibes = true;
        vibes = [];
      }
    }

    dramas.push({ slug, title, year, status, vibes });
  }

  dramas.sort((a, b) => b.year - a.year);
  return dramas;
}

