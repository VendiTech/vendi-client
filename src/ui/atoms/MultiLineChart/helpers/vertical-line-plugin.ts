import { Plugin } from 'chart.js';
import { colors } from '@/assets/styles/variables';

export const verticalLinePlugin: Plugin<'line'> = {
  id: 'verticalLine',
  beforeDraw: ({ ctx, tooltip, scales }) => {
    if (!tooltip || tooltip.opacity === 0) return;

    const x = tooltip.caretX;

    const topY = scales.y.top;
    const bottomY = scales.y.bottom;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x, bottomY);
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors.slate200;
    ctx.stroke();
    ctx.restore();
  },
};
