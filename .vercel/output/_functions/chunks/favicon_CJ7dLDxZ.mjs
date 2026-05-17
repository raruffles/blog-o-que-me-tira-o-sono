import { createReader } from '@keystatic/core/reader';
import { fileURLToPath } from 'node:url';
import { k as keystaticConfig } from './keystatic.config_j4WWGL40.mjs';

const projectRoot = fileURLToPath(new URL("../../", import.meta.url));
const keystaticReader = createReader(projectRoot, keystaticConfig);

const POSTS_PER_PAGE = 4;
const sortByDateDesc = (left, right) => new Date(right.pubDate).getTime() - new Date(left.pubDate).getTime();
function extractTextFromMarkdoc(value) {
  const root = value?.node ?? value;
  if (typeof root === "string") {
    return root;
  }
  const parts = [];
  const visit = (node) => {
    if (!node || typeof node !== "object") {
      return;
    }
    if (node.type === "text") {
      const text = node.attributes?.content ?? node.content ?? "";
      if (typeof text === "string" && text.trim()) {
        parts.push(text);
      }
    }
    if (Array.isArray(node.children)) {
      node.children.forEach(visit);
    }
    if (node.slots && typeof node.slots === "object") {
      Object.values(node.slots).forEach(visit);
    }
  };
  visit(root);
  return parts.join(" ").replace(/\s+/g, " ").trim();
}
function summarizeContent(content, fallback = "") {
  const text = extractTextFromMarkdoc(content);
  if (!text) {
    return fallback;
  }
  return text.length > 220 ? `${text.slice(0, 217).trimEnd()}...` : text;
}
async function getBlogCategories() {
  const categories = await keystaticReader.collections.categories.all();
  return categories.map(({ slug, entry }) => ({
    slug,
    ...entry
  })).sort((left, right) => left.title.localeCompare(right.title, "pt-BR"));
}
async function getBlogPosts() {
  const categories = await getBlogCategories();
  const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));
  const posts = await keystaticReader.collections.blog.all();
  const publishedPosts = posts.filter(({ entry }) => Boolean(entry.published));
  return publishedPosts.map(({ slug, entry }) => {
    const rawCategories = entry.categories ?? [];
    const categorySlugs = Array.isArray(rawCategories) ? rawCategories : rawCategories ? [rawCategories] : [];
    const title = entry.title ?? "";
    const description = (entry.description ?? "").trim() || summarizeContent(entry.content, "");
    const author = entry.author ?? "P.H.";
    return {
      slug,
      ...entry,
      author,
      title,
      description,
      categories: categorySlugs.map((categorySlug) => categoryBySlug.get(categorySlug)).filter(Boolean)
    };
  }).sort(sortByDateDesc);
}
function paginatePosts(posts, page, perPage = POSTS_PER_PAGE) {
  const safePage = Number.isFinite(page) ? page : 1;
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const currentPage = Math.min(Math.max(safePage, 1), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    items: posts.slice(start, start + perPage),
    currentPage,
    totalPages
  };
}
function getPageHref(page) {
  if (page <= 1) {
    return "/";
  }
  return `/page/${page}`;
}
function getCategoryHref(slug) {
  return `/categorias/${slug}`;
}

const blog = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POSTS_PER_PAGE,
  getBlogCategories,
  getBlogPosts,
  getCategoryHref,
  getPageHref,
  paginatePosts
}, Symbol.toStringTag, { value: 'Module' }));

const favicon = new Proxy({"src":"/_astro/favicon.D6YtVN-l.png","width":58,"height":58,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/portfólio/Portfólio-site/Blog/blog-o-que-me-tira-o-sono/src/favicon.png";
							}
							
							return target[name];
						}
					});

export { POSTS_PER_PAGE as P, getBlogPosts as a, blog as b, getPageHref as c, favicon as f, getBlogCategories as g, paginatePosts as p };
