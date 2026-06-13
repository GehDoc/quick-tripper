import packageInfo from '../../package.json';

export const VERSION = packageInfo.version;

// Ensure we extract the repository URL, removing 'git+' prefix and '.git' suffix
const rawRepoUrl =
  typeof packageInfo.repository === 'string'
    ? packageInfo.repository
    : (packageInfo.repository as { url: string }).url;

export const REPO_URL = rawRepoUrl.replace('git+', '').replace('.git', '');
