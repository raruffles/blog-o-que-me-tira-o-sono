import { getPageHref } from '../../lib/blog.ts';

const formatDate = (pubDate) =>
  pubDate
    ? new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date(pubDate))
    : '';

export default function PostGrid({ posts, pagination }) {
  const mainPosts = posts;

  const renderCategories = (categoryItems) =>
    categoryItems?.length ? (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        {categoryItems.map((category) => (
          <span
            key={category.slug}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 10px',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: '999px',
              fontSize: '12px',
              lineHeight: 1,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: '#000000',
              background: '#ffffff',
            }}
          >
            {category.title}
          </span>
        ))}
      </div>
    ) : null;

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) {
      return null;
    }

    const pageNumbers = Array.from({ length: pagination.totalPages }, (_, index) => index + 1);

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
          href={getPageHref(pagination.currentPage - 1)}
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
            href={getPageHref(pageNumber)}
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
          href={getPageHref(pagination.currentPage + 1)}
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
      <article className="featured-card featured-card-large" data-post-card data-search-text={`${mainPosts[0]?.title ?? ''} ${mainPosts[0]?.description ?? ''}`}>
        <a href={`/posts/${mainPosts[0]?.slug ?? ''}`} className="card-link">
          <div className="post-visual ratio-hero" aria-hidden="true">
            <img src={mainPosts[0]?.coverImage} alt="" loading="lazy" />
          </div>
          <div className="card-copy">
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#5f6268', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {mainPosts[0]?.categories?.[0]?.title ?? ''}
              </span>
              <time className="card-date" dateTime={mainPosts[0]?.pubDate} style={{ color: '#5f6268' }}>
                {formatDate(mainPosts[0]?.pubDate)}
              </time>
            </div>
            <h1 className="post-title">{mainPosts[0]?.title}</h1>
            <p className="post-description">{mainPosts[0]?.description}</p>
          </div>
        </a>
      </article>

      {mainPosts.slice(1).map((post, index) => (
        <article className="featured-card" key={post.slug} data-post-card data-search-text={`${post.title ?? ''} ${post.description ?? ''}`}>
          <a href={`/posts/${post.slug}`} className="card-link">
            <div className={`post-visual ${['ratio-tall', 'ratio-short', 'ratio-wide'][index % 3] || 'ratio-tall'}`} aria-hidden="true">
              <img src={post.coverImage} alt="" loading="lazy" />
            </div>
            <div className="card-copy">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#5f6268', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {post.categories?.[0]?.title ?? ''}
                </span>
                <time className="card-date" dateTime={post.pubDate} style={{ color: '#5f6268' }}>
                  {formatDate(post.pubDate)}
                </time>
              </div>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-description">{post.description}</p>
            </div>
          </a>
        </article>
      ))}
      </div>
      {renderPagination()}
    </>
  );
}