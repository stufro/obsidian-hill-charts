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

export type { HillChartSettings, ChartPoint };