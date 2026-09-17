import { createServer } from "http";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.resolve(__dirname, "public");
const port = Number(process.env.PORT || 3000);

const mimeTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const siteUrl = "https://unsent-paw-site.vercel.app";
const routeMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Unsent Melodies — Pet Memories, Comfort & Calm",
    description: "Unsent Melodies — pet memories, comfort, and calm through music and gentle reflection.",
  },
  "/journal": {
    title: "The Journal | Unsent Melodies",
    description: "Gentle, practical notes about pet loss, dog behavior, and calmer evenings from Unsent Melodies.",
  },
  "/stories": {
    title: "Stories & Listening | Unsent Melodies",
    description: "Quiet stories and listening reflections for the bonds that shape a home.",
  },
  "/shop": {
    title: "The Shop | Unsent Melodies",
    description: "Thoughtful digital keepsakes and gentle tools for remembering, reflecting, and caring for pets.",
  },
  "/about": {
    title: "About Unsent Melodies",
    description: "Learn about Unsent Melodies, a quiet space for pet memories, music, comfort, and kind reflection.",
  },
  "/contact": {
    title: "Contact | Unsent Melodies",
    description: "Get in touch with Unsent Melodies about pet remembrance, listening, editorial content, and digital products.",
  },
  "/privacy": {
    title: "Privacy Policy | Unsent Melodies",
    description: "Read the privacy policy for Unsent Melodies.",
  },
  "/terms": {
    title: "Terms | Unsent Melodies",
    description: "Read the terms of use for Unsent Melodies.",
  },
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function personalizeHtml(html: string, pathname: string) {
  const metadata = routeMetadata[pathname] ?? (pathname.startsWith("/journal/")
    ? { title: "Journal Note | Unsent Melodies", description: "A gentle editorial note from Unsent Melodies about pet loss, care, behavior, and calmer living." }
    : pathname.startsWith("/stories/")
      ? { title: "Story & Listening | Unsent Melodies", description: "A quiet story and listening reflection from Unsent Melodies." }
      : routeMetadata["/"]);
  const canonicalPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const canonical = `${siteUrl}${canonicalPath}`;
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`);
}

function securityHeaders(contentType: string) {
  return {
    "Content-Type": contentType,
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "X-DNS-Prefetch-Control": "off",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  };
}

async function readSafeFile(requestPath: string) {
  const decodedPath = decodeURIComponent(requestPath.split("?")[0]);
  const normalizedPath = path.normalize(decodedPath).replace(/^([/\\])+/, "");
  const candidate = path.resolve(staticPath, normalizedPath);
  const relative = path.relative(staticPath, candidate);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  try {
    const stat = await fs.stat(candidate);
    return stat.isFile() ? candidate : null;
  } catch {
    return null;
  }
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || "/", "http://localhost");
    const decodedRequestPath = decodeURIComponent(requestUrl.pathname);
    if (decodedRequestPath.split("/").some((segment) => segment === "..")) {
      response.writeHead(404, securityHeaders("text/plain; charset=utf-8"));
      response.end("Not Found");
      return;
    }
    let filePath = await readSafeFile(requestUrl.pathname);
    const isAsset = Boolean(filePath && path.extname(filePath) !== ".html");
    if (!filePath) filePath = path.join(staticPath, "index.html");

    let body = await fs.readFile(filePath);
    if (!isAsset && path.basename(filePath) === "index.html") {
      body = Buffer.from(personalizeHtml(body.toString("utf-8"), decodedRequestPath));
    }
    const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    response.writeHead(200, {
      ...securityHeaders(contentType),
      "Cache-Control": isAsset ? "public, max-age=31536000, immutable" : "no-cache",
    });
    response.end(body);
  } catch {
    response.writeHead(500, securityHeaders("text/plain; charset=utf-8"));
    response.end("Internal Server Error");
  }
});

server.listen(port, () => {
  console.log(`Static server running on http://localhost:${port}/`);
});
