const fetchOpenAPIData = async () => {
    const data = await fetch(
        "https://api.thegreenwebfoundation.org/api-docs/?format=openapi",
    ).then((res) => res.json());
    return data;
};

export default fetchOpenAPIData;
