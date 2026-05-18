import { c as createComponent } from './astro-component_CqlBJNLj.mjs';
import 'piccolore';
import { a5 as addAttribute, b3 as renderHead, b7 as renderTemplate } from './params-and-props_BFTGYDEv.mjs';
import { r as renderComponent } from './entrypoint_BkU4Rfg_.mjs';
import { P as PostGrid } from './PostGrid_F17B11l3.mjs';
import { a as getBlogPosts, p as paginatePosts, P as POSTS_PER_PAGE, f as favicon } from './favicon_lRGJ7iN7.mjs';

const $$n = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$n;
  const pageNum = Number(Astro2.params.n ?? "1");
  const allPosts = await getBlogPosts();
  const { items: posts, currentPage, totalPages } = paginatePosts(allPosts, pageNum, POSTS_PER_PAGE);
  return renderTemplate`<html lang="pt-BR"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Página ${currentPage} | O que me tira o sono</title><link rel="icon" type="image/png"${addAttribute(favicon.src, "href")}>${renderHead()}</head> <body> <main class="page-shell" style="max-width:900px;margin:48px auto;padding:0 20px;"> <h1>Arquivos — Página ${currentPage}</h1> ${renderComponent($$result, "PostGrid", PostGrid, { "posts": posts, "pagination": { currentPage, totalPages } })} </main> </body></html>`;
}, "C:/portfólio/Portfólio-site/Blog/blog-o-que-me-tira-o-sono/src/pages/page/[n].astro", void 0);

const $$file = "C:/portfólio/Portfólio-site/Blog/blog-o-que-me-tira-o-sono/src/pages/page/[n].astro";
const $$url = "/page/[n]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$n,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
