const formatDate = (pubDate) =>
  pubDate
    ? new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date(pubDate))
    : '';

export default function PostArticle({ post }) {
  return (
    <>
      <section className="post-hero">
        <div className="post-intro">
          <h1>{post.title}</h1>
          <time className="reading-time" dateTime={post.pubDate}>
            {formatDate(post.pubDate)}
          </time>
          <p className="post-summary">{post.description}</p>
        </div>

        <div className="post-visual ratio-hero" aria-hidden="true">
          <img src={post.coverImage} alt="" loading="lazy" />
        </div>
      </section>

      <article className="post-body">
        {post.content.map((paragraph, index) => (
          <p key={`${post.slug ?? 'post'}-${index}`}>{paragraph}</p>
        ))}
      </article>
    </>
  );
}