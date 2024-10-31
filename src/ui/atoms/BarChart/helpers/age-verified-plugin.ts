import { Plugin } from 'chart.js';
import { colors } from '@/assets/styles/variables';

export const ageVerifiedPlugin = (
  startBar: number,
  endBar: number,
  highestBarIndex: number
): Plugin<'bar'> => ({
  id: 'ageVerified',
  afterDraw: (chart) => {
    const { ctx, chartArea } = chart;
    const { left, right } = chartArea;

    const barWidthWithGap = (right - left) / (chart.data.labels?.length ?? 1);

    ctx.save();
    ctx.strokeStyle = colors.slate500;
    ctx.lineWidth = 1;
    
    const lineY = chart.getDatasetMeta(0).data[highestBarIndex].y - 5
    let lineStart = 0
    let lineEnd = 0
    
    for (let i = startBar; i <= endBar; i++) {
      const x = left + (i + 0.5) * barWidthWithGap; // Center of the bar

      if (i === startBar) {
        lineStart = x - 18
        
        ctx.beginPath();
        ctx.moveTo(lineStart, lineY + 5);
        ctx.lineTo(lineStart, lineY);
        ctx.stroke();

        ctx.lineTo(x + barWidthWithGap / 2, lineY);
        ctx.stroke();
      }
      if (i === endBar) {
        lineEnd = x + 18
        
        ctx.beginPath();
        ctx.moveTo(x - barWidthWithGap / 2, lineY);
        ctx.lineTo(lineEnd, lineY);
        ctx.lineTo(lineEnd, lineY + 5);
        ctx.stroke();
      }
      
      if (i !== startBar && i !== endBar) {
        ctx.beginPath();
        ctx.moveTo(x - barWidthWithGap / 2, lineY);
        ctx.lineTo(x + barWidthWithGap / 2, lineY);
        ctx.stroke();
      }
    }

    const lineCenter = (lineStart + lineEnd) / 2
    
    ctx.beginPath()
    ctx.moveTo(lineCenter, lineY)
    ctx.lineTo(lineCenter, lineY - 5)
    ctx.stroke()

    ctx.fillStyle = colors.slate500;
    ctx.font = '12px';
    ctx.textAlign = 'center';
    ctx.fillText('Age verified', lineCenter , lineY - 10);

    ctx.restore();
  },
});
