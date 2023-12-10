import { parse } from 'yaml'
import { HillChartSettings, ChartPoint } from './types'

const DEFAULT_COLORS = [
  "var(--color-red)",
  "var(--color-blue)",
  "var(--color-orange)",
  "var(--color-cyan)",
  "var(--color-green)",
  "var(--color-yellow)",
  "var(--color-pink)",
]

function parseCodeBlock(input: string, settings: HillChartSettings): Array<ChartPoint> {
  let colors = [...DEFAULT_COLORS];

  return parse(input)["points"].map((point: ChartPoint) => {
    if (colors.length == 0) colors = [...DEFAULT_COLORS];
    return { size: settings.pointSize, opacity: settings.pointOpacity, color: selectColor(colors), ...point }
  })
}

function selectColor(colors: Array<string>) {
  return colors.shift()
}

export { parseCodeBlock }