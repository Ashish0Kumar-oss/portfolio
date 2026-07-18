import { useEffect, useState } from 'react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
  updated_at: string;
}

interface GitHubUser {
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
}

const FALLBACK_REPOS: GitHubRepo[] = [
  { id: 1, name: "My-First-app", description: "this is my first app", html_url: "https://github.com/Ashish0Kumar-oss/My-First-app", stargazers_count: 0, language: "Kotlin", forks_count: 0, updated_at: new Date().toISOString() },
  { id: 2, name: "Qr-Code-Generator", description: "this is qr code generator", html_url: "https://github.com/Ashish0Kumar-oss/Qr-Code-Generator", stargazers_count: 0, language: "TypeScript", forks_count: 0, updated_at: new Date().toISOString() },
  { id: 3, name: "Luma-Gst-Calculator", description: "this is gst calculator", html_url: "https://github.com/Ashish0Kumar-oss/Luma-Gst-Calculator", stargazers_count: 0, language: "TypeScript", forks_count: 0, updated_at: new Date().toISOString() },
  { id: 4, name: "Ai-Engineer-Portfolio", description: "this is my portfolio", html_url: "https://github.com/Ashish0Kumar-oss/Ai-Engineer-Portfolio", stargazers_count: 0, language: "TypeScript", forks_count: 0, updated_at: new Date().toISOString() },
  { id: 5, name: "Resume-Builder", description: "this is completely free resume builder web", html_url: "https://github.com/Ashish0Kumar-oss/Resume-Builder", stargazers_count: 0, language: "TypeScript", forks_count: 0, updated_at: new Date().toISOString() }
];

export function useGitHub(username: string) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userData = await userRes.json();
        setUser(userData);

        // Fetch repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposRes.json();
        setRepos(reposData);
      } catch (err) {
        console.warn('GitHub API failed, using fallback data.', err);
        setRepos(FALLBACK_REPOS);
        setError(null); // Clear error since we are using fallback data
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchGitHubData();
    }
  }, [username]);

  return { repos, user, loading, error };
}
