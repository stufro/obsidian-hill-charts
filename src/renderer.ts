import { create, scaleLinear, axisBottom, range, line, ScaleLinear } from 'd3';
import { HillChartSettings, ChartPoint, ChartCoordinates } from './types';

const DEFAULT_POINT_SIZE = 10;

function renderHillChart(data: Array<ChartPoint>, settings: HillChartSettings) {
  const chartHeight = settings.chartHeight;
  const chartWidth = settings.chartWidth;
  const container = create("svg");
  container
    .attr("width", chartWidth)
    .attr("height", `${chartHeight + 40}`)
    .attr("id", "hillChart");

  const marginTop = 5;
  const xScale = scaleLinear().domain([0, 100]).range([0, chartWidth]);
  const yScale = scaleLinear().domain([0, 110]).range([chartHeight, 0]);

  container.append(() => renderBaseLine(xScale, chartHeight, marginTop));
  container.append(() => renderCurve(xScale, yScale));
  container.append(() => renderMiddleLine(xScale, yScale));
  container.append(() => renderLeftFooterText(xScale, chartHeight));
  container.append(() => renderRightFooterText(xScale, chartHeight));
  data?.forEach(point => {
    container.append(() => renderPoint(xScale, yScale, point));
    container.append(() => renderPointLabel(xScale, yScale, point));
  })

  return container.node();
}

function hillFn(point: number) {
  return 50 * Math.sin((Math.PI / 50) * point - (1 / 2) * Math.PI) + 50;
}

function renderBaseLine(xScale: ScaleLinear<number, number, never>, chartHeight: number, marginTop: number) {
  const bottomLine = axisBottom(xScale).ticks(0).tickSize(0);

  return create<SVGGElement>('svg:g')
    .attr('class', 'hill-chart-bottom-line')
    .attr('transform', `translate(0, ${chartHeight + marginTop})`)
    .call(bottomLine)
    .node();
}

function renderCurve(xScale: ScaleLinear<number, number, never>, yScale: ScaleLinear<number, number, never>) {
  const mainLineCurvePoints = range(0, 100, 0.1).map((i) => ({
    x: i,
    y: hillFn(i),
  } as ChartCoordinates));

  const curve = line<ChartCoordinates>()
    .x((d: ChartCoordinates) => xScale(d.x))
    .y((d: ChartCoordinates) => yScale(d.y));

  return create('svg:path')
    .attr('class', 'chart-hill-main-curve')
    .datum(mainLineCurvePoints)
    .attr('d', curve)
    .style('fill', "transparent")
    .style('stroke', "var(--text-normal)")
    .node();
}

function renderMiddleLine(xScale: ScaleLinear<number, number, never>, yScale: ScaleLinear<number, number, never>) {
  return create('svg:line')
    .attr('class', 'hill-chart-middle-line')
    .attr('y1', yScale(0))
    .attr('y2', yScale(100))
    .attr('x1', xScale(50))
    .attr('x2', xScale(50))
    .style('stroke', "var(--background-modifier-border)")
    .style('stroke-dasharray', "5,5")
    .style('stroke-width', "2")
    .node();
}

function renderPoint(xScale: ScaleLinear<number, number, never>, yScale: ScaleLinear<number, number, never>, point: ChartPoint) {
  return create("svg:circle")
    .attr("cx", xScale(point.position))
    .attr("cy", yScale(hillFn(point.position)))
    .attr("r", `${point.size}`)
    .style("fill", `${point.color}`)
    .style("opacity", `${point.opacity}`)
    .node();
}

function renderPointLabel(xScale: ScaleLinear<number, number, never>, yScale: ScaleLinear<number, number, never>, point: ChartPoint) {
  return create("svg:text")
    .text(point.text || "")
    .attr("x", adjustedXPosition(xScale(point.position), point.position, point.size || DEFAULT_POINT_SIZE))
    .attr("y", yScale(hillFn(point.position)) + 5)
    .style("text-anchor", () => textOutOfBounds(point.position) ? 'end' : 'start')
    .style("fill", "var(--text-normal)")
    .node();
}

function adjustedXPosition(coordinate: number, position: number, pointSize: number) {
  const margin = pointSize + 5;
  const adjustment = textOutOfBounds(position) ? -1 * margin : margin;
  return coordinate + adjustment
}

function textOutOfBounds(pointPosition: number) {
  return pointPosition > 80
}

function renderLeftFooterText(xScale: ScaleLinear<number, number, never>, chartHeight: number) {
  return create('svg:text')
    .attr('class', 'hill-chart-text')
    .text('Figuring things out')
    .style('font-size', "var(--font-small)")
    .style('font-weight', 'var(--font-light)')
    .style('fill', 'var(--text-normal)')
    .attr('x', xScale(20))
    .attr('y', chartHeight + 30)
    .node();
}

function renderRightFooterText(xScale: ScaleLinear<number, number, never>, chartHeight: number) {
  return create('svg:text')
    .append('text')
    .attr('class', 'hill-chart-text')
    .text('Making it happen')
    .style('font-size', "var(--font-small)")
    .style('font-weight', 'var(--font-light)')
    .style('fill', 'var(--text-normal)')
    .attr('x', xScale(60))
    .attr('y', chartHeight + 30)
    .node();
}

export { renderHillChart, renderBaseLine, renderMiddleLine, renderPoint, renderPointLabel, adjustedXPosition };