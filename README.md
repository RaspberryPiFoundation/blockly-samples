Candidates for repository deletion are typically abandoned, redundant, or empty codebases that create clutter and increase security risks. Identifying and removing these repositories helps keep your organization's workspace clean, secure, and easy to navigate.

Common Criteria for Deletion

When auditing your GitHub, GitLab, or Bitbucket organization, look for repositories that meet one or more of the following conditions:
• Zero Activity: The repository has had no commits, pull requests, or issues for 12 to 24 months.
• Empty or Boilerplate Code: The repository contains only an initial README.md, a .gitignore file, or unmodified framework templates.
• Redundant Forks: A forked repository has zero unique commits ahead of the upstream source and is no longer needed for active contributions.
• Deprecated Projects: The codebase belongs to a retired service, completed one-off script, or failed proof of concept (PoC).
• Duplicate Repositories: The code was migrated to a new repository or monorepo, leaving the old version behind as dead weight.
• Security Risks: Unmaintained repositories often hold outdated dependencies with known vulnerabilities or accidentally exposed secrets.

Best Practices Before Deleting

Because deleting a repository permanently removes its code, commit history, issues, and pull requests, follow a safe cleanup process:
• Archive First: Set the repository to read-only (archived) for 30 to 90 days before permanent deletion. This acts as a "scream test" to see if any team or automated pipeline still relies on it.
• Verify Dependencies: Check CI/CD pipelines, package registries, and internal documentation to ensure no active builds pull from the repository.
• Export Backups: Download a local clone or archive bundle (git bundle) for compliance or historical reference if needed.
• Notify Code Owners: Reach out to the original creators or team leads to confirm the project is truly dead before permanently deleting it.
If you'd like to narrow this down or automate your cleanup, let me know:
• Which Git platform you are using (GitHub, GitLab, Bitbucket, etc.)
• Whether you want a script or CLI command to automatically find stale or empty repositories
• If you are cleaning up a personal account or an organization
I can provide the exact queries or scripts to generate your deletion list.
