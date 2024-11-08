const dev = process.env.NODE_ENV !== 'production'

const getGithubData = async () => {
    const { devData } = await import('../helpers/dev/githubData.js');
    if (dev) {
        return devData;
    }
    
    const { Octokit } = await import('@octokit/core');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const issues = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: 'thegreenwebfoundation',
        repo: 'co2.js',
        labels: 'roadmap,designing',
        state: 'open',
    });

    // Check for any issues that have a label of "funding-required" and add that to the data
    issues.data.forEach(issue => {
        if (issue.labels.find(label => label.name === "funding-required")) {
            issue.fundingRequired = true;
        }
    });
    
    return issues.data;
}

module.exports = getGithubData;