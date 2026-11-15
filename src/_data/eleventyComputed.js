// Builds JSON-LD for every page from its front matter.
// Home overrides this in index.11tydata.js with its full business + FAQ graph.
module.exports = {
  schema: data => {
    const url = data.site.url + data.page.url;
    const graph = [];
    const crumbs = [{ name: 'Home', url: data.site.url + '/' }].concat(
      (data.breadcrumbs || []).map(c => ({ name: c.name, url: data.site.url + c.url }))
    );
    if (crumbs.length > 1) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url }))
      });
    }
    if (data.service) {
      graph.push({
        '@type': 'Service',
        name: data.service,
        serviceType: data.service,
        url,
        description: data.description,
        provider: { '@id': data.site.url + '/#business' },
        areaServed: [{ '@type': 'City', name: 'Melbourne' }, { '@type': 'State', name: 'Victoria' }, { '@type': 'Country', name: 'Australia' }]
      });
    }
    if (data.post) {
      graph.push({
        '@type': 'BlogPosting',
        headline: data.heading ? data.heading.replace(/<[^>]+>/g, '') : data.title,
        description: data.description,
        url,
        datePublished: data.date ? new Date(data.date).toISOString().slice(0, 10) : undefined,
        dateModified: (data.updated ? new Date(data.updated) : data.date ? new Date(data.date) : new Date()).toISOString().slice(0, 10),
        author: { '@type': 'Person', name: 'Akash Verma', url: data.site.url + '/about/' },
        publisher: { '@id': data.site.url + '/#business' },
        image: data.site.url + '/assets/og-candor.jpg',
        mainEntityOfPage: url,
        inLanguage: 'en-AU'
      });
    }
    if (data.faqs && data.faqs.length) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: data.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
      });
    }
    if (!graph.length) graph.push({ '@type': 'WebPage', name: data.title, url, description: data.description });
    return { '@context': 'https://schema.org', '@graph': graph };
  }
};
