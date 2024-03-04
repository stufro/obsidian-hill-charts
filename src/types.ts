interface HillChartSettings {
  chartHeight: number;
  chartWidth: number;
  pointSize: number;
  pointOpacity: number;
}

type ChartPoint = {
  position: number;
  color?: string;
  text?: string;
  size?: number;
  opacity?: number;
}

type SerializedInput = {
  ok: boolean,
  points?: Array<ChartPoint>,
  width?: number,
  height?: number,
  error?: string,
}

type ChartCoordinates = {
  x: number,
  y: number
}

export type { HillChartSettings, ChartPoint, ChartCoordinates, SerializedInput };
