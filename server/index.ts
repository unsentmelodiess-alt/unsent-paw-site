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

    const body = await fs.readFile(filePath);
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
