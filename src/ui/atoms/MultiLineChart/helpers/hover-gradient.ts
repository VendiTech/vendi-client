import { Plugin } from 'chart.js';

export const hoverGradientPlugin: Plugin<'line'> = {
  id: 'hoverGradient',
  beforeDatasetDraw: (chart, { index }) => {
    const { ctx, tooltip, chartArea } = chart;
    const datasetMeta = chart.getDatasetMeta(index);

    const isDatasetHovered =
      tooltip &&
      tooltip.opacity &&
      tooltip.dataPoints &&
      tooltip.dataPoints.some((dataPoint) => dataPoint.datasetIndex === index);

    if (!datasetMeta.dataset?.options) return;

    if (isDatasetHovered) {
      const gradient = ctx.createLinearGradient(
        0,
        datasetMeta.iScale?.maxHeight ?? 0,
        0,
        chartArea.bottom,
      );

      const color = datasetMeta.dataset.options.borderColor;
      const startColor = color.length === 7 ? color + '33' : color;

      gradient.addColorStop(0, startColor);
      gradient.addColorStop(1, 'transparent');

      datasetMeta.dataset.options.backgroundColor = gradient;
    } else {
      datasetMeta.dataset.options.backgroundColor = 'transparent';
    }
  },
};
