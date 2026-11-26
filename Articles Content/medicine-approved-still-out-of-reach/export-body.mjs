import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, "../..");
const article = path.join(root, "articles/medicine-approved-still-out-of-reach.html");
const out = path.join(dir, "_body-insert.html");
let html = fs.readFileSync(article, "utf8");
const tag = '<div class="article-body">';
const start = html.indexOf(tag) + tag.length;
const auth = html.indexOf('<aside class="article-author-card">', start);
const body = html.slice(start, auth).trim() + "\n";
fs.writeFileSync(out, body, "utf8");
console.log("exported", body.length);