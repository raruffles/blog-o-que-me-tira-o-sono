import { keystaticReader } from './keystatic.ts';

export const POSTS_PER_PAGE = 4;

const sortByDateDesc = (left, right) =>
  new Date(right.pubDate).getTime() - new Date(left.pubDate).getTime();

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

  return posts
    .map(({ slug, entry }) => {
      const categorySlugs = entry.categories ?? [];

      return {
        slug,
        ...entry,
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

  return `/?page=${page}`;
}

export function getCategoryHref(slug) {
  return `/?category=${slug}`;
}
