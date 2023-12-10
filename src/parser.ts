import { parse } from 'yaml'
import { HillChartSettings, ChartPoint } from './types'

function parseCodeBlock(input: string, settings: HillChartSettings): Array<ChartPoint> {
  const defaultColors = [
    "var(--color-red)",
    "var(--color-blue)",
    "var(--color-orange)",
    "var(--color-cyan)",
    "var(--color-green)",
    "var(--color-yellow)",
    "var(--color-pink)",
  ]
  let colors = [...defaultColors];

  return parse(input)["points"].map((point: ChartPoint) => {
    if (colors.length == 0) colors = [...defaultColors];
    return { size: settings.pointSize, color: selectColor(colors), ...point }
  })
}

function selectColor(colors: Array<string>) {
  return colors.shift()
}

export { parseCodeBlock }