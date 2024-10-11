const getGithubData = async () => {
    const { Octokit } = await import('@octokit/core');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const issues = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: 'thegreenwebfoundation',
        repo: 'co2.js',
        labels: 'roadmap',
        state: 'open',
    });

    return issues.data;
}

module.exports = getGithubData;