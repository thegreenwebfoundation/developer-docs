const caseStudies = async () => {
    const co2js = fetch(
        "https://www.thegreenwebfoundation.org/wp-json/wp/v2/posts?per_page=100&categories=43,34",
    ).then((resp) => resp.json()).then((data) =>
        data.filter((item) =>
            item.categories.includes(43) && item.categories.includes(34)
        )
    );
    return co2js;
};

export default caseStudies;
