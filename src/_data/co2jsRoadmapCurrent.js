
const getGithubData = async () => {
    const { Octokit } = await import('@octokit/core');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const issues = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: 'thegreenwebfoundation',
        repo: 'co2.js',
        labels: 'roadmap,release-planned',
        state: 'open',
    });

    console.log(issues.data[0]);
    
    return issues.data;
}

module.exports = getGithubData;