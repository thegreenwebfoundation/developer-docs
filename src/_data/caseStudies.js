const dev = process.env.NODE_ENV !== 'production'

const caseStudies = async () => {
    const { devData } = await import('../helpers/dev/caseStudies.js');
    // if (dev) {
    //     return devData;
    // }

    const co2js = await fetch('https://www.thegreenwebfoundation.org/wp-json/wp/v2/posts?per_page=100&categories=43,34').then(resp => resp.json()).then(data => data.filter(item => item.categories.includes(43) && item.categories.includes(34)))

    // This is temporary until we've got more case studies. Since they won't all live on our website, we need to figure out a way to get them all in one place.
    const gaw = [
        {
            featured_media: "https://browser-worker.fershad.workers.dev/?title=Making+this+website+respond+to+your+local+energy+grid&page=https://fershad.com/writing/making-this-website-grid-aware/",
            title: {
                rendered: "Making this website respond to your local energy grid"
            },
            excerpt: {
                rendered: "Fershad Irani covers the technical steps I've taken to make this website respond to a visitor's energy grid. It also touches on the design changes that happen as a result, and the performance and energy impacts of those changes."
            },
            link: "https://fershad.com/writing/making-this-website-grid-aware/"
        }
    ]

    return {co2js, gaw};
}

module.exports = caseStudies;
