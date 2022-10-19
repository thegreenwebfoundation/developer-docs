const fetch = require('node-fetch');

const fetchOpenAPIData = async () => {
    const data = await fetch('https://api.thegreenwebfoundation.org/api-docs/?format=openapi').then((res) => res.json());
    return data;
}

module.exports = fetchOpenAPIData;