const isHub = data => data.page.fileSlug === 'blog';
module.exports = {
  layout: 'post.njk',
  tags: ['post'],
  post: true,
  bodyClass: 'page-inner page-post',
  permalink: data => isHub(data) ? '/blog/' : `/blog/${data.page.fileSlug}/`,
  eleventyComputed: {
    post: data => !isHub(data),
    breadcrumbs: data => isHub(data) ? [{ name: 'Blog', url: '/blog/' }]
      : [{ name: 'Blog', url: '/blog/' }, { name: data.crumb || data.heading, url: data.page.url }]
  }
};
