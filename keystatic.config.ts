import { config, collection, fields } from '@keystatic/core';

const generateSlug = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default config({
  storage: { kind: 'local' },
  collections: {
    categories: collection({
      label: 'Categorias',
      path: 'src/content/categories/*',
      slugField: 'slug',
      format: 'json',
      schema: {
        title: fields.text({
          label: 'Nome',
          validation: {
            isRequired: true,
            length: { max: 32 },
          },
        }),
        slug: fields.slug({
          name: {
            label: 'Nome',
          },
          slug: {
            label: 'Slug',
            generate: generateSlug,
          },
        }),
        description: fields.text({
          label: 'Descrição',
          multiline: true,
          validation: {
            length: { max: 160 },
          },
        }),
      },
    }),
    blog: collection({
      label: 'Postagens do Blog',
      path: 'src/content/blog/*',
      slugField: 'slug',
      format: 'json',
      schema: {
        title: fields.text({
          label: 'Título',
          validation: {
            isRequired: true,
            length: { max: 36 },
          },
        }),
        slug: fields.slug({
          name: {
            label: 'Título',
          },
          slug: {
            label: 'Slug',
            generate: generateSlug,
          },
        }),
        description: fields.text({
          label: 'Resumo / Descrição (Opcional)',
          description: 'Se deixar em branco, o site pegará o início do texto automaticamente.',
          multiline: true,
        }),
        pubDate: fields.date({
          label: 'Data de Publicação',
          defaultValue: { kind: 'today' },
        }),
        coverImage: fields.image({
          label: 'Imagem de Capa',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
          validation: {
            isRequired: false,
          },
        }),
        categories: fields.array(
          fields.relationship({
            label: 'Categoria',
            collection: 'categories',
          }),
          {
            label: 'Categorias',
          },
        ),
        content: fields.markdoc({
          label: 'Conteúdo',
          description: 'Escreva com títulos, negrito, listas, imagens e links.',
        }),
      },
    }),
  },
});
