import { c as createComponent } from './astro-component_CqlBJNLj.mjs';
import 'piccolore';
import { a5 as addAttribute, b3 as renderHead, b7 as renderTemplate } from './params-and-props_BFTGYDEv.mjs';
import 'clsx';
import { g as getBlogCategories, f as favicon } from './favicon_lRGJ7iN7.mjs';

const $$Categorias = createComponent(async ($$result, $$props, $$slots) => {
  const categories = await getBlogCategories();
  return renderTemplate`<html lang="pt-BR"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Categorias | O que me tira o sono</title><link rel="icon" type="image/png"${addAttribute(favicon.src, "href")}>${renderHead()}</head> <body> <main style="max-width:900px;margin:48px auto;padding:0 20px;"> <h1>Categorias</h1> <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;margin-top:20px;"> ${categories.map((cat) => renderTemplate`<a${addAttribute(cat.slug, "key")}${addAttribute(`/categorias/${cat.slug}`, "href")} style="display:block;padding:18px;border-radius:8px;border:1px solid rgba(0,0,0,0.06);text-decoration:none;color:#111;background:#fff;box-shadow:0 1px 0 rgba(0,0,0,0.02);"> <h3 style="margin:0 0 6px 0;font-size:16px">${cat.title}</h3> <p style="margin:0;color:#5f6268;font-size:13px">${cat.description ?? "Ver posts desta categoria"}</p> </a>`)} </div> </main> </body></html>`;
}, "C:/portfólio/Portfólio-site/Blog/blog-o-que-me-tira-o-sono/src/pages/categorias.astro", void 0);

const $$file = "C:/portfólio/Portfólio-site/Blog/blog-o-que-me-tira-o-sono/src/pages/categorias.astro";
const $$url = "/categorias";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Categorias,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
