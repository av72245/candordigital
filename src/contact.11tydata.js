// Contact carries the full FAQ: audit questions first, then the general list.
const audit = [
  { q: "What's included in the free 30-minute audit?", a: "We review your social profiles, website, any ad accounts and your recent numbers, then tell you plainly what's working, what isn't and whether paid marketing is worth it for you right now. You get a short written summary either way." },
  { q: 'Is the audit really free?', a: "Yes. There's no obligation and no sales script. If we're not the right fit, we'll tell you, and often point you to someone who is." },
  { q: 'Do I need to prepare anything?', a: "Not really. Links to your website and social profiles are enough. If you've run ads before, access to those numbers helps." }
];
module.exports = {
  faqHeading: 'Everything people ask before getting in touch',
  eleventyComputed: {
    faqs: data => audit.concat(data.generalFaqs.filter(f => !/free 30-minute audit/i.test(f.q)))
  }
};
