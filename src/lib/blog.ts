import { keystaticReader } from './keystatic.ts';

export const POSTS_PER_PAGE = 4;

const sortByDateDesc = (left, right) =>
  new Date(right.pubDate).getTime() - new Date(left.pubDate).getTime();

function extractTextFromMarkdoc(value) {
  const root = value?.node ?? value;

  if (typeof root === 'string') {
    return root;
  }

  const parts = [];

  const visit = (node) => {
    if (!node || typeof node !== 'object') {
      return;
    }

    if (node.type === 'text') {
      const text = node.attributes?.content ?? node.content ?? '';

      if (typeof text === 'string' && text.trim()) {
        parts.push(text);
      }
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(visit);
    }

    if (node.slots && typeof node.slots === 'object') {
      Object.values(node.slots).forEach(visit);
    }
  };

  visit(root);

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

function summarizeContent(content, fallback = '') {
  const text = extractTextFromMarkdoc(content);

  if (!text) {
    return fallback;
  }

  return text.length > 220 ? `${text.slice(0, 217).trimEnd()}...` : text;
}

export async function getBlogCategories() {
  const categories = await keystaticReader.collections.categories.all();

  return categories
    .map(({ slug, entry }) => ({
      slug,
      ...entry,
    }))
    .sort((left, right) => left.title.localeCompare(right.title, 'pt-BR'));
}

export async function getBlogPosts() {
  const categories = await getBlogCategories();
  const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));
  const posts = await keystaticReader.collections.blog.all();

  // Only include posts marked as published in the site list
  const publishedPosts = posts.filter(({ entry }) => Boolean(entry.published));

  return publishedPosts
    .map(({ slug, entry }) => {
      const rawCategories = entry.categories ?? [];
      const categorySlugs = Array.isArray(rawCategories)
        ? rawCategories
        : rawCategories
        ? [rawCategories]
        : [];
      const title = entry.title ?? '';
      const description = (entry.description ?? '').trim() || summarizeContent(entry.content, '');
      const author = entry.author ?? 'P.H.';

      return {
        slug,
        ...entry,
        author,
        title,
        description,
        categories: categorySlugs
          .map((categorySlug) => categoryBySlug.get(categorySlug))
          .filter(Boolean),
      };
    })
    .sort(sortByDateDesc);
}

export function paginatePosts(posts, page, perPage = POSTS_PER_PAGE) {
  const safePage = Number.isFinite(page) ? page : 1;
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const currentPage = Math.min(Math.max(safePage, 1), totalPages);
  const start = (currentPage - 1) * perPage;

  return {
    items: posts.slice(start, start + perPage),
    currentPage,
    totalPages,
  };
}

export function getPageHref(page) {
  if (page <= 1) {
    return '/';
  }

  return `/page/${page}`;
}

export function getCategoryHref(slug) {
  return `/categorias/${slug}`;
}
