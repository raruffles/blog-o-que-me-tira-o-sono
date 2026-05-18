import fs from 'node:fs/promises';
import path from 'node:path';
import { projectRoot } from './project-root.ts';

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

async function readBlogContent(slug) {
  const contentPath = path.join(projectRoot, 'src', 'content', 'blog', `${slug}.mdoc`);

  try {
    return await fs.readFile(contentPath, 'utf8');
  } catch {
    return '';
  }
}

async function readJsonCollectionEntries(collectionPath) {
  try {
    const filenames = await fs.readdir(collectionPath);
    const jsonFiles = filenames.filter((filename) => filename.endsWith('.json'));

    return Promise.all(
      jsonFiles.map(async (filename) => {
        const fullPath = path.join(collectionPath, filename);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const entry = JSON.parse(fileContents);
        const slug = entry.slug ?? path.basename(filename, '.json');

        return {
          slug,
          entry,
        };
      }),
    );
  } catch {
    return [];
  }
}

export async function getBlogCategories() {
  const categoriesPath = path.join(projectRoot, 'src', 'content', 'categories');
  const categories = await readJsonCollectionEntries(categoriesPath);

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
  const postsPath = path.join(projectRoot, 'src', 'content', 'blog');
  const posts = await readJsonCollectionEntries(postsPath);

  // Only include posts marked as published in the site list
  const publishedPosts = posts.filter(({ entry }) => Boolean(entry.published));

  return Promise.all(
    publishedPosts.map(async ({ slug, entry }) => {
      const content = await readBlogContent(slug);
      const rawCategories = entry.categories ?? [];
      const categorySlugs = Array.isArray(rawCategories)
        ? rawCategories
        : rawCategories
        ? [rawCategories]
        : [];
      const title = entry.title ?? '';
      const description = (entry.description ?? '').trim() || summarizeContent(content, '');
      const author = entry.author ?? 'P.H.';

      return {
        slug,
        ...entry,
        content,
        author,
        title,
        description,
        categories: categorySlugs
          .map((categorySlug) => categoryBySlug.get(categorySlug))
          .filter(Boolean),
      };
    }),
  ).then((resolvedPosts) => resolvedPosts.sort(sortByDateDesc));
}

export async function getBlogPostSlugs() {
  const posts = await getBlogPosts();

  return posts.map((post) => post.slug);
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
