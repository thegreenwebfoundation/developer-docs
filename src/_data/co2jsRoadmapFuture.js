const getGithubData = async () => {
    const { Octokit } = await import('@octokit/core');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const issues = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: 'thegreenwebfoundation',
        repo: 'co2.js',
        labels: 'roadmap',
        state: 'open',
    });

    // Remove any issues with the "release-planned" label
    issues.data = issues.data.filter(issue => !issue.labels.find(label => label.name === "release-planned"));

    // Check for any issues that have a label of "funding-required" and add that to the data
    issues.data.forEach(issue => {
        if (issue.labels.find(label => label.name === "funding-required")) {
            issue.fundingRequired = true;
        }
    });

    return issues.data;
}

module.exports = getGithubData;