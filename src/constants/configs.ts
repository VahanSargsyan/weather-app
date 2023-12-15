export const CHART_OPTIONS = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: true,
  },
  stacked: false,
  aspectRatio: 1.5,
  maintainAspectRatio: true,
  layout: {
    padding: {
      top: 32,
    },
  },
};
