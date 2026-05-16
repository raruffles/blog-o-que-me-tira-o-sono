const toneClass = {
  forest: 'tone-forest',
  sky: 'tone-sky',
  paper: 'tone-paper',
  amber: 'tone-amber',
};

export default function PostArticle({ post }) {
  return (
    <>
      <section className="post-hero">
        <div className="post-intro">
          <span className="post-kicker">Crônica</span>
          <h1>{post.title}</h1>
          <p className="reading-time">{post.readingTime}</p>
        </div>

        <div className={`post-visual ${toneClass[post.coverTone ?? 'forest']}`} aria-hidden="true"></div>
      </section>

      <article className="post-body">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
    </>
  );
}