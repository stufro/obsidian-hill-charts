import { create, scaleLinear, axisBottom, range, line } from 'd3';

const DATA = [
  { percentage: 40, color: "red" },
  { percentage: 20, color: "cyan" },
  { percentage: 55, color: "green" },
]

function renderHillChart(el: HTMLElement) {
  const chartHeight = 250;
  const chartWidth = 700;
  const container = create("svg");
  container
    .attr("width", "700")
    .attr("height", "300")
    .attr("id", "hillChart");
  el.parentElement?.replaceChild(container.node(), el);

  const marginTop = 5;
  const xScale = scaleLinear().domain([0, 100]).range([0, chartWidth]);
  const yScale = scaleLinear().domain([0, 110]).range([chartHeight, 0]);

  renderBaseLine(container, xScale, chartHeight, marginTop);
  renderCurve(container, xScale, yScale);
  renderMiddleLine(container, xScale, yScale);
  renderFooterText(container, xScale, chartHeight);

  DATA.forEach(point => renderPoint(container, xScale, yScale, point.percentage, point.color));
}

function hillFn(point: number) {
  return 50 * Math.sin((Math.PI / 50) * point - (1 / 2) * Math.PI) + 50;
}

function renderBaseLine(container: Selection, xScale: any, chartHeight: number, marginTop: number) {
  const bottomLine = axisBottom(xScale).ticks(0).tickSize(0);
  container
    .append('g')
    .attr('class', 'hill-chart-bottom-line')
    .attr('transform', `translate(0, ${chartHeight + marginTop})`)
    .call(bottomLine);
}

function renderCurve(container: Selection, xScale: any, yScale: any) {
  const mainLineCurvePoints = range(0, 100, 0.1).map((i) => ({
    x: i,
    y: 50 * Math.sin((Math.PI / 50) * i - (1 / 2) * Math.PI) + 50,
  }));

  const curve = line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  container
    .append('path')
    .attr('class', 'chart-hill-main-curve')
    .datum(mainLineCurvePoints)
    .attr('d', curve)
    .style('fill', "transparent")
    .style('stroke', "white");
}

function renderMiddleLine(container: Selection, xScale: any, yScale: any) {
  container
    .append('line')
    .attr('class', 'hill-chart-middle-line')
    .attr('y1', yScale(0))
    .attr('y2', yScale(100))
    .attr('x2', xScale(50))
    .attr('x1', xScale(50))
    .style('stroke', "lightgrey")
    .style('stroke-dasharray', "5,5");
}

function renderPoint(container: Selection, xScale: any, yScale: any, percentage: number, color: string) {
  container.append("circle")
    .attr("cx", xScale(percentage))
    .attr("cy", yScale(hillFn(percentage)))
    .attr("r", 10)
    .style("fill", color)
    .style("opacity", "0.7");
}

function renderFooterText(container: Selection, xScale: any, chartHeight: number) {
  container
    .append('text')
    .attr('class', 'hill-chart-text')
    .text('Figuring things out')
    .style('font-size', "1rem")
    .style('fill', "lightgrey")
    .attr('x', xScale(20))
    .attr('y', chartHeight + 30);
  container
    .append('text')
    .attr('class', 'hill-chart-text')
    .text('Making it happen')
    .style('font-size', "1rem")
    .style('fill', "lightgrey")
    .attr('x', xScale(60))
    .attr('y', chartHeight + 30);
}

export { renderHillChart };