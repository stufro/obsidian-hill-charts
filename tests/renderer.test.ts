/**
 * @jest-environment jsdom
 */

import { ChartPoint } from "src/types";
import { adjustedXPosition, renderBaseLine, renderMiddleLine, renderPoint, renderPointLabel } from "../src/renderer";
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

// describe('renderCurve',  () => {} );

describe('renderMiddleLine', () => {
  const chartWidth = 100;
  const chartHeight = 100;
  const xScale = scaleLinear().domain([0, 100]).range([0, chartWidth]);
  const yScale = scaleLinear().domain([0, 100]).range([chartHeight, 0]);

  test('sets the y coordinates to 0% -> 100% of the chart height', async () => {
    expect(renderMiddleLine(xScale, yScale)?.outerHTML).toContain('y1="100" y2="0"');
  });

  test('sets the x coordinates 50% of the chart width', async () => {
    expect(renderMiddleLine(xScale, yScale)?.outerHTML).toContain('x1="50" x2="50"');
  });
});

describe('renderPoint', () => {
  const chartWidth = 100;
  const chartHeight = 100;
  const xScale = scaleLinear().domain([0, 100]).range([0, chartWidth]);
  const yScale = scaleLinear().domain([0, 100]).range([chartHeight, 0]);
  const point: ChartPoint = { position: 40, color: "blue", size: 10 }

  test('sets the x coordinate at [position] percentage along the x axis', () => {
    expect(renderPoint(xScale, yScale, point)?.outerHTML).toContain('cx="40')
  })

  test('calculates the y coordinate based on the position creating the sine wave shape', () => {
    expect(renderPoint(xScale, yScale, point)?.outerHTML).toContain('cy="9.549150281252627"')
  })

  test('sets the radius', () => {
    expect(renderPoint(xScale, yScale, point)?.outerHTML).toContain('r="10"')
  })

  test('sets the opacity', () => {
    expect(renderPoint(xScale, yScale, point)?.outerHTML).toContain('opacity: 0.8')
  })
});

describe('renderPointLabel', () => {
  const chartWidth = 100;
  const chartHeight = 100;
  const xScale = scaleLinear().domain([0, 100]).range([0, chartWidth]);
  const yScale = scaleLinear().domain([0, 100]).range([chartHeight, 0]);
  const point: ChartPoint = { position: 40, color: "blue", size: 10 }

  test('sets the x coordinate next to the point', () => {
    expect(renderPointLabel(xScale, yScale, point)?.outerHTML).toContain('x="55"')
  })

  test('sets the y coordinate level with the point', () => {
    expect(renderPointLabel(xScale, yScale, point)?.outerHTML).toContain('y="14.549150281252627"')
  })
});

describe('adjustedXPosition', () => {
  const pointSize = 10;
  const coordinate = 500;

  test('returns the coordinate + 15 when the position is <= 80', () => {
    const position = 80;
    expect(adjustedXPosition(coordinate, position, pointSize)).toEqual(515);
  });

  test('returns the coordinate -15 when the position is > 80', () => {
    const position = 81;
    expect(adjustedXPosition(coordinate, position, pointSize)).toEqual(485);
  });
})