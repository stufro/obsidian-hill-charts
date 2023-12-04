import { create, scaleLinear, axisBottom, range, line } from 'd3';

function renderHillChart(el: HTMLElement) {
  const chartHeight = 250;
  const chartWidth = 700;
  const container = create("svg");
  container
    .attr("width", "700")
    .attr("height", "260")
    .attr("id", "hillChart");
  el.parentElement?.replaceChild(container.node(), el);

  const marginTop = 5;
  const xScale = scaleLinear().domain([0, 100]).range([0, chartWidth]);
  const yScale = scaleLinear().domain([0, 110]).range([chartHeight, 0]);

  const hillFn = (point: number) =>
    50 * Math.sin((Math.PI / 50) * point - (1 / 2) * Math.PI) + 50;

  // Render bottom line
  const bottomLine = axisBottom(xScale).ticks(0).tickSize(0);
  container
    .append('g')
    .attr('class', 'hill-chart-bottom-line')
    .attr('transform', `translate(0, ${chartHeight + marginTop})`)
    .call(bottomLine);

  // Render main curve
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

  // Render middle dotted line
  container
    .append('line')
    .attr('class', 'hill-chart-middle-line')
    .attr('y1', yScale(0))
    .attr('y2', yScale(100))
    .attr('x2', xScale(50))
    .attr('x1', xScale(50))
    .style('stroke', "lightgrey")
    .style('stroke-dasharray', "5,5");

  // Render circle
  const percentage = 40;
  container.append("circle")
    .attr("cx", xScale(percentage))
    .attr("cy", yScale(hillFn(percentage)))
    .attr("r", 10)
    .style("fill", "red");
}

export { renderHillChart };