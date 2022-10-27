const fetch = require('node-fetch').default;

const fetchOpenAPIData = async () => {
    const data = await fetch('https://api.thegreenwebfoundation.org/api-docs/?format=openapi').then((res) => res.json());
    return data;
}

module.exports = fetchOpenAPIData;