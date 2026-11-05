module.exports = {
  layout: 'case-study.njk',
  tags: ['case'],
  permalink: data => `/work/${data.page.fileSlug}/`,
  eleventyComputed: {
    breadcrumbs: data => [{ name: 'Work', url: '/#work' }, { name: data.client, url: data.page.url }]
  }
};
