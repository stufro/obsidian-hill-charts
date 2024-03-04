import { HillChartSettings, ChartPoint, SerializedInput } from './types'

const DEFAULT_COLORS = [
  "var(--color-red)",
  "var(--color-blue)",
  "var(--color-orange)",
  "var(--color-cyan)",
  "var(--color-green)",
  "var(--color-yellow)",
  "var(--color-pink)",
]

function parseCodeBlock(input: string, settings: HillChartSettings, parseFn: (input: string) => any): SerializedInput {
  let colors = [...DEFAULT_COLORS];

  try {
    const parsedInput = parseFn(input);
    return ({
      ok: true,
      points: parsedInput.points.map((point: ChartPoint) => {
        if (colors.length == 0) colors = [...DEFAULT_COLORS];
        return { size: settings.pointSize, opacity: settings.pointOpacity, color: selectColor(colors), ...point }
      }),
      width: parsedInput.width || settings.chartWidth,
      height: parsedInput.height || settings.chartHeight
    })
  } catch (error) {
    return ({
      ok: false,
      error: `Parsing Error: ${error.message}`
    })
  }
}

function selectColor(colors: Array<string>) {
  return colors.shift()
}

export { parseCodeBlock }
