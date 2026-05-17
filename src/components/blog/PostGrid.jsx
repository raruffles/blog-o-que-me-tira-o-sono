import { getPageHref, getCategoryHref } from '../../lib/blog.ts';

const formatDate = (pubDate) =>
  pubDate
    ? new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date(pubDate))
    : '';

export default function PostGrid({ posts, pagination, baseHref }) {
  const mainPosts = posts;

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) {
      return null;
    }

    const pageNumbers = Array.from({ length: pagination.totalPages }, (_, index) => index + 1);

    const hrefFor = (p) => {
      if (baseHref) {
        if (p <= 1) return `${baseHref}`;
        return `${baseHref.replace(/\/$/, '')}/page/${p}`;
      }
      return getPageHref(p);
    };

    return (
      <nav
        aria-label="Paginação"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginTop: '28px',
          flexWrap: 'wrap',
        }}
      >
        <a
          href={hrefFor(pagination.currentPage - 1)}
          aria-disabled={pagination.currentPage === 1}
          style={{
            padding: '8px 14px',
            border: '1px solid rgba(0, 0, 0, 0.14)',
            color: '#000000',
            pointerEvents: pagination.currentPage === 1 ? 'none' : 'auto',
            opacity: pagination.currentPage === 1 ? 0.35 : 1,
          }}
        >
          Anterior
        </a>

        {pageNumbers.map((pageNumber) => (
          <a
            key={pageNumber}
            href={hrefFor(pageNumber)}
            aria-current={pageNumber === pagination.currentPage ? 'page' : undefined}
            style={{
              padding: '8px 12px',
              border: '1px solid rgba(0, 0, 0, 0.14)',
              minWidth: '42px',
              textAlign: 'center',
              color: pageNumber === pagination.currentPage ? '#ffffff' : '#000000',
              background: pageNumber === pagination.currentPage ? '#000000' : '#ffffff',
            }}
          >
            {pageNumber}
          </a>
        ))}

        <a
          href={hrefFor(pagination.currentPage + 1)}
          aria-disabled={pagination.currentPage === pagination.totalPages}
          style={{
            padding: '8px 14px',
            border: '1px solid rgba(0, 0, 0, 0.14)',
            color: '#000000',
            pointerEvents: pagination.currentPage === pagination.totalPages ? 'none' : 'auto',
            opacity: pagination.currentPage === pagination.totalPages ? 0.35 : 1,
          }}
        >
          Próxima
        </a>
      </nav>
    );
  };

  if (!mainPosts.length) {
    return (
      <div style={{ padding: '24px 0', color: '#5f6268' }}>
        Nenhum post disponível.
      </div>
    );
  }

  return (
    <>
      <div className="post-grid">
      <article className="featured-card" data-post-card data-search-text={`${mainPosts[0]?.title ?? ''} ${mainPosts[0]?.description ?? ''}`}>
        {mainPosts[0]?.coverImage ? (
          <a href={`/posts/${mainPosts[0]?.slug ?? ''}`} className="card-link">
            <div className="post-visual" aria-hidden="true">
              <img src={mainPosts[0].coverImage} alt="" loading="lazy" />
            </div>
          </a>
        ) : null}
        <div className="card-copy">
          {/* Removed author/date row — title follows directly */}
          <a href={`/posts/${mainPosts[0]?.slug ?? ''}`} className="card-link">
            <h1 className="post-title">{mainPosts[0]?.title}</h1>
            <p className="post-description">{mainPosts[0]?.description}</p>
          </a>
        </div>
      </article>

      {mainPosts.slice(1).map((post, index) => (
        <article className="featured-card" key={post.slug} data-post-card data-search-text={`${post.title ?? ''} ${post.description ?? ''}`}>
          {post.coverImage ? (
            <a href={`/posts/${post.slug}`} className="card-link">
              <div className="post-visual" aria-hidden="true">
                <img src={post.coverImage} alt="" loading="lazy" />
              </div>
            </a>
          ) : null}
          <div className="card-copy">
            <a href={`/posts/${post.slug}`} className="card-link">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-description">{post.description}</p>
            </a>
          </div>
        </article>
      ))}
      </div>
      {renderPagination()}
    </>
  );
}