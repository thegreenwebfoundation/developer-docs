
const getCO2jsRoadmapIssues = async () => {
    const { Octokit } = await import('@octokit/core');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const issues = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: 'thegreenwebfoundation',
        repo: 'co2.js',
        labels: 'roadmap',
        state: 'open',
    });

    console.log(issues.data)
    return issues.data;
}

module.exports = getCO2jsRoadmapIssues;