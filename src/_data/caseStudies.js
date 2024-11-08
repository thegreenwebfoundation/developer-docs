const dev = process.env.NODE_ENV !== 'production'

const caseStudies = async () => {
    const { devData } = await import('../helpers/dev/caseStudies.js');
    if (dev) {
        return devData;
    }

    const co2js = fetch('https://www.thegreenwebfoundation.org/wp-json/wp/v2/posts?per_page=100&categories=43,34').then(resp => resp.json()).then(data => data.filter(item => item.categories.includes(43) && item.categories.includes(34)))
    return co2js;
}

module.exports = caseStudies;
