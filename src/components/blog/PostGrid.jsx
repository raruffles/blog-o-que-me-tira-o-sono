const formatDate = (pubDate) =>
  pubDate
    ? new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date(pubDate))
    : '';

export default function PostGrid({ posts }) {
  const mainPosts = posts;

  return (
    <div className="post-grid">
      <article className="featured-card featured-card-large" data-post-card data-search-text={`${mainPosts[0]?.title ?? ''} ${mainPosts[0]?.description ?? ''}`}>
        <a href={`/posts/${mainPosts[0]?.slug ?? ''}`} className="card-link">
          <div className="post-visual ratio-hero" aria-hidden="true">
            <img src={mainPosts[0]?.coverImage} alt="" loading="lazy" />
          </div>
          <div className="card-copy">
            <time className="card-date" dateTime={mainPosts[0]?.pubDate}>
              {formatDate(mainPosts[0]?.pubDate)}
            </time>
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
              <time className="card-date" dateTime={post.pubDate}>
                {formatDate(post.pubDate)}
              </time>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-description">{post.description}</p>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}