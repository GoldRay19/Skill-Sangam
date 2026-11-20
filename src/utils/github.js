export async function fetchGithubSkills(username) {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100`,
  );
  if (response.status === 404) throw new Error("GitHub user not found.");
  if (response.status === 403)
    throw new Error("GitHub rate limit reached. Try again later.");
  if (!response.ok) throw new Error("Could not fetch GitHub repositories.");
  const repos = await response.json();
  const counts = {};
  repos.forEach((repo) => {
    if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);
}
