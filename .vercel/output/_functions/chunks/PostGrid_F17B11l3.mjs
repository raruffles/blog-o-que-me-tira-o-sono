import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { c as getPageHref } from './favicon_lRGJ7iN7.mjs';

function PostGrid({ posts, pagination, baseHref }) {
  const mainPosts = posts;
  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) {
      return null;
    }
    const pageNumbers = Array.from({ length: pagination.totalPages }, (_, index) => index + 1);
    const hrefFor = (p) => {
      if (baseHref) {
        if (p <= 1) return `${baseHref}`;
        return `${baseHref.replace(/\/$/, "")}/page/${p}`;
      }
      return getPageHref(p);
    };
    return /* @__PURE__ */ jsxs(
      "nav",
      {
        "aria-label": "Paginação",
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "28px",
          flexWrap: "wrap"
        },
        children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: hrefFor(pagination.currentPage - 1),
              "aria-disabled": pagination.currentPage === 1,
              style: {
                padding: "8px 14px",
                border: "1px solid rgba(0, 0, 0, 0.14)",
                color: "#000000",
                pointerEvents: pagination.currentPage === 1 ? "none" : "auto",
                opacity: pagination.currentPage === 1 ? 0.35 : 1
              },
              children: "Anterior"
            }
          ),
          pageNumbers.map((pageNumber) => /* @__PURE__ */ jsx(
            "a",
            {
              href: hrefFor(pageNumber),
              "aria-current": pageNumber === pagination.currentPage ? "page" : void 0,
              style: {
                padding: "8px 12px",
                border: "1px solid rgba(0, 0, 0, 0.14)",
                minWidth: "42px",
                textAlign: "center",
                color: pageNumber === pagination.currentPage ? "#ffffff" : "#000000",
                background: pageNumber === pagination.currentPage ? "#000000" : "#ffffff"
              },
              children: pageNumber
            },
            pageNumber
          )),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: hrefFor(pagination.currentPage + 1),
              "aria-disabled": pagination.currentPage === pagination.totalPages,
              style: {
                padding: "8px 14px",
                border: "1px solid rgba(0, 0, 0, 0.14)",
                color: "#000000",
                pointerEvents: pagination.currentPage === pagination.totalPages ? "none" : "auto",
                opacity: pagination.currentPage === pagination.totalPages ? 0.35 : 1
              },
              children: "Próxima"
            }
          )
        ]
      }
    );
  };
  if (!mainPosts.length) {
    return /* @__PURE__ */ jsx("div", { style: { padding: "24px 0", color: "#5f6268" }, children: "Nenhum post disponível." });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "post-grid", children: [
      /* @__PURE__ */ jsxs("article", { className: "featured-card", "data-post-card": true, "data-search-text": `${mainPosts[0]?.title ?? ""} ${mainPosts[0]?.description ?? ""}`, children: [
        mainPosts[0]?.coverImage ? /* @__PURE__ */ jsx("a", { href: `/posts/${mainPosts[0]?.slug ?? ""}`, className: "card-link", children: /* @__PURE__ */ jsx("div", { className: "post-visual", "aria-hidden": "true", children: /* @__PURE__ */ jsx("img", { src: mainPosts[0].coverImage, alt: "", loading: "lazy" }) }) }) : null,
        /* @__PURE__ */ jsx("div", { className: "card-copy", children: /* @__PURE__ */ jsxs("a", { href: `/posts/${mainPosts[0]?.slug ?? ""}`, className: "card-link", children: [
          /* @__PURE__ */ jsx("h1", { className: "post-title", children: mainPosts[0]?.title }),
          /* @__PURE__ */ jsx("p", { className: "post-description", children: mainPosts[0]?.description })
        ] }) })
      ] }),
      mainPosts.slice(1).map((post, index) => /* @__PURE__ */ jsxs("article", { className: "featured-card", "data-post-card": true, "data-search-text": `${post.title ?? ""} ${post.description ?? ""}`, children: [
        post.coverImage ? /* @__PURE__ */ jsx("a", { href: `/posts/${post.slug}`, className: "card-link", children: /* @__PURE__ */ jsx("div", { className: "post-visual", "aria-hidden": "true", children: /* @__PURE__ */ jsx("img", { src: post.coverImage, alt: "", loading: "lazy" }) }) }) : null,
        /* @__PURE__ */ jsx("div", { className: "card-copy", children: /* @__PURE__ */ jsxs("a", { href: `/posts/${post.slug}`, className: "card-link", children: [
          /* @__PURE__ */ jsx("h2", { className: "post-title", children: post.title }),
          /* @__PURE__ */ jsx("p", { className: "post-description", children: post.description })
        ] }) })
      ] }, post.slug))
    ] }),
    renderPagination()
  ] });
}

export { PostGrid as P };
