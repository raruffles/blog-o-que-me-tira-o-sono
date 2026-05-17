import { c as createComponent } from './astro-component_CqlBJNLj.mjs';
import 'piccolore';
import { a5 as addAttribute, b3 as renderHead, b7 as renderTemplate } from './params-and-props_BFTGYDEv.mjs';
import { r as renderComponent } from './entrypoint_CHUKqlNf.mjs';
import { P as PostGrid } from './PostGrid_Crr3z5hD.mjs';
import { a as getBlogPosts, p as paginatePosts, f as favicon, P as POSTS_PER_PAGE } from './favicon_CJ7dLDxZ.mjs';

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const slug = Astro2.params.slug;
  const page = Number(Astro2.url.searchParams.get("page") ?? "1");
  const allPosts = await getBlogPosts();
  const filtered = allPosts.filter((p) => p.categories?.some((c) => c.slug === slug));
  const { items: posts, currentPage, totalPages } = paginatePosts(filtered, page, POSTS_PER_PAGE);
  const category = (await (await import('./favicon_CJ7dLDxZ.mjs').then(n => n.b)).getBlogCategories()).find((c) => c.slug === slug) || { title: slug };
  return renderTemplate`<html lang="pt-BR"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${category.title} | Categorias | O que me tira o sono</title><link rel="icon" type="image/png"${addAttribute(favicon.src, "href")}>${renderHead()}</head> <body> <main class="page-shell" style="max-width:900px;margin:48px auto;padding:0 20px;"> <h1>${category.title}</h1> ${renderComponent($$result, "PostGrid", PostGrid, { "posts": posts, "pagination": { currentPage, totalPages }, "baseHref": `/categorias/${slug}` })} </main> </body></html>`;
}, "C:/portfólio/Portfólio-site/Blog/blog-o-que-me-tira-o-sono/src/pages/categorias/[slug].astro", void 0);

const $$file = "C:/portfólio/Portfólio-site/Blog/blog-o-que-me-tira-o-sono/src/pages/categorias/[slug].astro";
const $$url = "/categorias/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
