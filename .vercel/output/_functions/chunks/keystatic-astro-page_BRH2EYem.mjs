import { c as createComponent } from './astro-component_CqlBJNLj.mjs';
import 'piccolore';
import { b7 as renderTemplate } from './params-and-props_BFTGYDEv.mjs';
import { r as renderComponent } from './entrypoint_CHUKqlNf.mjs';

const prerender = false;
const $$KeystaticAstroPage = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Keystatic", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/portfólio/Portfólio-site/Blog/blog-o-que-me-tira-o-sono/node_modules/@keystatic/astro/internal/keystatic-page.js", "client:component-export": "Keystatic" })}`;
}, "C:/portfólio/Portfólio-site/Blog/blog-o-que-me-tira-o-sono/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", void 0);

const $$file = "C:/portfólio/Portfólio-site/Blog/blog-o-que-me-tira-o-sono/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$KeystaticAstroPage,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
