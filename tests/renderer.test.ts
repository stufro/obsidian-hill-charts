import { renderBaseLine } from "../src/renderer";
import { scaleLinear } from 'd3';

describe('renderBaseLine', () => {
  const chartWidth = 700;
  const chartHeight = 250;
  const marginTop = 5;
  const xScale = scaleLinear().domain([0, 100]).range([0, chartWidth]);

  test('sets the overall height (height + margin)', async () => {
    expect(renderBaseLine(xScale, chartHeight, marginTop)?.outerHTML).toContain('transform="translate(0, 255)"');
  });

  test('sets the width in the d attribute', async () => {
    expect(renderBaseLine(xScale, chartHeight, marginTop)?.outerHTML).toContain('d="M0.5,0.5H700.5"');
  });
});
