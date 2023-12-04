import { create, scaleLinear, axisBottom, range, line } from 'd3';

type ChartPoint = {
  percentage: number;
  color: string;
  text: string;
}

function renderHillChart(el: HTMLElement, data: Array<ChartPoint>) {
  const chartHeight = 250;
  const chartWidth = 700;
  const container = create("svg");
  container
    .attr("width", "700")
    .attr("height", "290")
    .attr("id", "hillChart");
  el.parentElement?.replaceChild(container.node(), el);

  const marginTop = 5;
  const xScale = scaleLinear().domain([0, 100]).range([0, chartWidth]);
  const yScale = scaleLinear().domain([0, 110]).range([chartHeight, 0]);

  renderBaseLine(container, xScale, chartHeight, marginTop);
  renderCurve(container, xScale, yScale);
  renderMiddleLine(container, xScale, yScale);
  renderFooterText(container, xScale, chartHeight);

  data?.forEach(point => renderPoint(container, xScale, yScale, point));
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

function renderPoint(container: Selection, xScale: any, yScale: any, point: ChartPoint) {
  container.append("circle")
    .attr("cx", xScale(point.percentage))
    .attr("cy", yScale(hillFn(point.percentage)))
    .attr("r", 10)
    .style("fill", point.color)
    .style("opacity", "0.7");

  container.append("text")
    .text(point.text)
    .attr("x", xScale(point.percentage))
    .attr("y", yScale(hillFn(point.percentage) - 10))
    .style("fill", "lightgrey")
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