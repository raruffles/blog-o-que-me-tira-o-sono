const toneClass = {
  forest: 'tone-forest',
  sky: 'tone-sky',
  paper: 'tone-paper',
  amber: 'tone-amber',
};

export default function PostGrid({ posts }) {
  const mainPosts = posts.slice(0, 4);

  return (
    <div className="post-grid">
      <article className="featured-card featured-card-large">
        <a href={`/posts/${mainPosts[0]?.slug ?? ''}`} className="card-link">
          <div className={`post-visual ${toneClass[mainPosts[0]?.coverTone ?? 'forest']}`} aria-hidden="true"></div>
          <div className="card-copy">
            <h1 className="post-title">{mainPosts[0]?.title}</h1>
            <p className="post-meta">{mainPosts[0]?.readingTime}</p>
          </div>
        </a>
      </article>

      {mainPosts.slice(1).map((post) => (
        <article className="featured-card" key={post.slug}>
          <a href={`/posts/${post.slug}`} className="card-link">
            <div className={`post-visual ${toneClass[post.coverTone ?? 'forest']}`} aria-hidden="true"></div>
            <div className="card-copy">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-meta">{post.readingTime}</p>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}