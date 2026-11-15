// Homepage schema: the business itself plus only the FAQs shown on this page.
module.exports = {
  eleventyComputed: {
    schema: data => ({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebSite', '@id': 'https://candordigital.com.au/#website', name: 'Candor Digital', alternateName: ['Candor', 'candordigital.com.au'], url: 'https://candordigital.com.au/', publisher: { '@id': 'https://candordigital.com.au/#business' } },
        data.business,
        { '@type': 'FAQPage', mainEntity: data.homeFaqIdx.map(i => data.generalFaqs[i]).map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
      ]
    })
  }
};
