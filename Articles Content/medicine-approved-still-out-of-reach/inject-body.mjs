import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, "../..");
const article = path.join(root, "articles/medicine-approved-still-out-of-reach.html");
const body = path.join(dir, process.env.BODY_FILE || "_body-insert.html");
let html = fs.readFileSync(article, "utf8");
const ins = fs.readFileSync(body, "utf8");
const tag = '<div class="article-body">';
const start = html.indexOf(tag) + tag.length;
const auth = html.indexOf('<aside class="article-author-card">', start);
if (start < tag.length || auth < 0) throw new Error("markers missing");
html = html.slice(0, start) + "\n" + ins + "\n        " + html.slice(auth);
fs.writeFileSync(article, html, "utf8");
console.log("injected", article.length);