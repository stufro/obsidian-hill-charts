import { create, scaleLinear, axisBottom, range, line } from 'd3';

type ChartPoint = {
  position: number;
  color: string;
  text?: string;
}

function renderHillChart(data: Array<ChartPoint>) {
  const chartHeight = 250;
  const chartWidth = 700;
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

  return container;
}

function hillFn(point: number) {
  return 50 * Math.sin((Math.PI / 50) * point - (1 / 2) * Math.PI) + 50;
}

function renderBaseLine(xScale: any, chartHeight: number, marginTop: number) {
  const bottomLine = axisBottom(xScale).ticks(0).tickSize(0);

  return create<SVGGElement>('svg:g')
    .attr('class', 'hill-chart-bottom-line')
    .attr('transform', `translate(0, ${chartHeight + marginTop})`)
    .call(bottomLine)
    .node();
}

function renderCurve(xScale: any, yScale: any) {
  const mainLineCurvePoints = range(0, 100, 0.1).map((i) => ({
    x: i,
    y: hillFn(i),
  }));

  const curve = line()
    .x((d: any) => xScale(d.x))
    .y((d: any) => yScale(d.y)) as any;

  return create('svg:path')
    .attr('class', 'chart-hill-main-curve')
    .datum(mainLineCurvePoints)
    .attr('d', curve)
    .style('fill', "transparent")
    .style('stroke', "white")
    .node();
}

function renderMiddleLine(xScale: any, yScale: any) {
  return create('svg:line')
    .attr('class', 'hill-chart-middle-line')
    .attr('y1', yScale(0))
    .attr('y2', yScale(100))
    .attr('x2', xScale(50))
    .attr('x1', xScale(50))
    .style('stroke', "lightgrey")
    .style('stroke-dasharray', "5,5")
    .node();
}

function renderPoint(xScale: any, yScale: any, point: ChartPoint) {
  return create("svg:circle")
    .attr("cx", xScale(point.position))
    .attr("cy", yScale(hillFn(point.position)))
    .attr("r", 10)
    .style("fill", point.color)
    .style("opacity", "0.7")
    .node();
}

function renderPointLabel(xScale: any, yScale: any, point: ChartPoint) {
  return create("svg:text")
    .text(point.text || "")
    .attr("x", adjustedXPosition(xScale(point.position), point.position))
    .attr("y", yScale(hillFn(point.position)) + 5)
    .style("fill", "lightgrey")
    .node();
}

function adjustedXPosition(coordinate: number, position: number) {
  const margin = 15;
  const adjustment = (position > 80) ? -2.75 * margin : margin;
  return coordinate + adjustment
}

function renderLeftFooterText(xScale: any, chartHeight: number) {
  return create('svg:text')
    .attr('class', 'hill-chart-text')
    .text('Figuring things out')
    .style('font-size', "1rem")
    .style('fill', "lightgrey")
    .attr('x', xScale(20))
    .attr('y', chartHeight + 30)
    .node();
}

function renderRightFooterText(xScale: any, chartHeight: number) {
  return create('svg:text')
    .append('text')
    .attr('class', 'hill-chart-text')
    .text('Making it happen')
    .style('font-size', "1rem")
    .style('fill', "lightgrey")
    .attr('x', xScale(60))
    .attr('y', chartHeight + 30)
    .node();
}

export { renderHillChart, adjustedXPosition, renderBaseLine };