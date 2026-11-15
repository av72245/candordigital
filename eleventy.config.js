module.exports = function (eleventyConfig) {
  // Static assets live at the repo root and are copied as-is.
  eleventyConfig.addPassthroughCopy({ css: 'css', js: 'js', assets: 'assets', 'assets/favicon.ico': 'favicon.ico' });
  eleventyConfig.addWatchTarget('css/');
  eleventyConfig.addWatchTarget('js/');
  // Services in a fixed order (front matter `order`), not file date.
  eleventyConfig.addCollection('service', api =>
    api.getFilteredByTag('service').sort((a, b) => (a.data.order || 99) - (b.data.order || 99)));
  eleventyConfig.addFilter('dateIso', d => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter('dateNice', d => new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Melbourne' }));
  return {
    dir: { input: 'src', includes: '_includes', data: '_data', output: '_site' },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
