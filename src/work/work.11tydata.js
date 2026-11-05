const isHub = data => data.page.fileSlug === 'work';
module.exports = {
  layout: 'case-study.njk',
  tags: ['case'],
  permalink: data => isHub(data) ? '/work/' : `/work/${data.page.fileSlug}/`,
  eleventyComputed: {
    breadcrumbs: data => isHub(data) ? [{ name: 'Work', url: '/work/' }]
      : [{ name: 'Work', url: '/work/' }, { name: data.client, url: data.page.url }]
  }
};
