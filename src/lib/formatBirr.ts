export const formatBirr = (value: number | undefined) => {
  if (value === undefined) return "Not disclosed";
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B Birr`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M Birr`;
  return `${value.toLocaleString()} Birr`;
};
