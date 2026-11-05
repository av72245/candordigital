module.exports = {
  layout: 'service.njk',
  tags: ['service'],
  permalink: data => data.page.fileSlug === 'services' ? '/services/' : `/services/${data.page.fileSlug}/`,
  eleventyComputed: {
    breadcrumbs: data => data.page.fileSlug === 'services' ? [{ name: 'Services', url: '/services/' }]
      : [{ name: 'Services', url: '/services/' }, { name: data.service, url: data.page.url }]
  }
};
