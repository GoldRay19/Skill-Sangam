function normalizeGithubUsername(value) {
  const input = value.trim().replace(/^@/, "");
  if (!input) return "";

  try {
    const url = new URL(input.match(/^https?:\/\//i) ? input : `https://${input}`);
    if (url.hostname.toLowerCase().replace(/^www\./, "") === "github.com") {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }
  } catch {
    // Treat non-URL input as a username below.
  }

  return input.split("/").filter(Boolean)[0] || "";
}

export async function fetchGithubSkills(username) {
  const normalizedUsername = normalizeGithubUsername(username);
  if (!normalizedUsername) throw new Error("Enter a valid GitHub username.");
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(normalizedUsername)}/repos?per_page=100`,
  );
  if (response.status === 404)
    throw new Error(`GitHub user "${normalizedUsername}" was not found.`);
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
