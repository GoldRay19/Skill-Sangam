export const matchScore = (skills = [], required = []) =>
  required.length
    ? Math.round(
        (required.filter((r) =>
          skills.some((s) => s.toLowerCase() === r.toLowerCase()),
        ).length /
          required.length) *
          100,
      )
    : 0;
