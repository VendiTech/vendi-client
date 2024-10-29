import { DoughnutController, Plugin } from 'chart.js';

export const lineBackgroundPlugin = (
  backgroundColor: string,
): Plugin<'doughnut'> => ({
  id: 'lineBackground',
  beforeDraw: (chart) => {
    const { ctx, width, height, options } = chart;

    const { innerRadius } = chart.getDatasetMeta(chart.data.datasets.length - 1)
      .controller as DoughnutController;
    const { outerRadius } = chart.getDatasetMeta(0)
      .controller as DoughnutController;

    const radiusLength = outerRadius - innerRadius;

    const outerRadiusWithSpacing = outerRadius + (options.spacing ?? 0) / 2;

    const x = width / 2;
    const y = height / 2;

    ctx.beginPath();
    ctx.arc(x, y, outerRadiusWithSpacing - radiusLength / 2, 0, 2 * Math.PI);
    ctx.lineWidth = radiusLength;
    ctx.strokeStyle = backgroundColor;
    ctx.stroke();
  },
});
