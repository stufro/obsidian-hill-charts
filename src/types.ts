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
  error?: string,
}

export type { HillChartSettings, ChartPoint, SerializedInput };