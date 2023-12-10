import { parse } from 'yaml'
import { HillChartSettings, ChartPoint } from './types'

function parseCodeBlock(input: string, settings: HillChartSettings): Array<ChartPoint> {
  return parse(input)["points"]
}

export { parseCodeBlock }