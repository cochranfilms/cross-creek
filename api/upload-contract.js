import { Octokit } from '@octokit/rest';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, content, contractData } = req.body;

    // Validate required fields
    if (!filename || !content || !contractData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get GitHub token from environment variables
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return res.status(500).json({ error: 'GitHub token not configured' });
    }

    // Initialize Octokit (GitHub API client)
    const octokit = new Octokit({
      auth: githubToken,
    });

    // GitHub repository details
    const owner = process.env.GITHUB_OWNER || 'cochranfilms';
    const repo = process.env.GITHUB_REPO || 'cross-creek';
    const path = `contracts/${filename}`;

    // Commit message
    const message = `Add signed contract: ${contractData.clientName} - ${contractData.contractId}`;

    // Upload file to GitHub
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content,
      branch: 'main',
    });

    // Return success response
    return res.status(200).json({
      success: true,
      filename: filename,
      downloadUrl: response.data.content.download_url,
      sha: response.data.content.sha,
      message: 'Contract uploaded successfully'
    });

  } catch (error) {
    console.error('GitHub upload error:', error);
    
    // Handle specific GitHub API errors
    if (error.status === 401) {
      return res.status(401).json({ error: 'GitHub authentication failed' });
    } else if (error.status === 403) {
      return res.status(403).json({ error: 'GitHub access denied' });
    } else if (error.status === 422) {
      return res.status(422).json({ error: 'File already exists or invalid content' });
    }

    return res.status(500).json({ 
      error: 'Failed to upload contract',
      details: error.message 
    });
  }
}
