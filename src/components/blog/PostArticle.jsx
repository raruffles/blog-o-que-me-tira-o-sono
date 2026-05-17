import Markdoc from '@markdoc/markdoc';
import React from 'react';
import { getCategoryHref } from '../../lib/blog.ts';

const formatDate = (pubDate) =>
  pubDate
    ? new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date(pubDate))
    : '';

export default function PostArticle({ post }) {
  const categoryItems = post.categories ?? [];
  const contentNode = post.content?.node ?? post.content;

  const renderedContent = contentNode
    ? Markdoc.renderers.react(
        Markdoc.transform(
          typeof contentNode === 'string'
            ? Markdoc.parse(contentNode)
            : contentNode,
        ),
        React,
      )
    : null;

  return (
    <>
      <section className="post-hero">
        <div className="post-intro">
          {categoryItems.length ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
              {categoryItems.map((category) => (
                <a
                  key={category.slug}
                  href={getCategoryHref(category.slug)}
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
                    marginBottom: '4px',
                    textDecoration: 'none',
                  }}
                >
                  {category.title}
                </a>
              ))}
            </div>
          ) : null}

          <h1>{post.title}</h1>
          <time className="reading-time" dateTime={post.pubDate}>
            {formatDate(post.pubDate)}
          </time>
          <p className="post-summary">{post.description}</p>
        </div>

        {post.coverImage ? (
          <div className="post-visual ratio-hero" aria-hidden="true">
            <img src={post.coverImage} alt="" loading="lazy" />
          </div>
        ) : null}
      </section>

      <article className="post-body">{renderedContent}</article>
    </>
  );
}