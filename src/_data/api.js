const dev = process.env.NODE_ENV !== 'production'

const fetchOpenAPIData = async () => {
    const { devData } = await import('../helpers/dev/api.js');
    if (dev) {
        return devData;
    }

    const data = await fetch('https://api.thegreenwebfoundation.org/api-docs/?format=openapi').then((res) => res.json());
    return data;
}

module.exports = fetchOpenAPIData;