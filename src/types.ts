interface HillChartSettings {
  chartHeight: number;
  chartWidth: number;
  pointSize: number;
}

type ChartPoint = {
  position: number;
  color?: string;
  text?: string;
  size?: number;
}

export type { HillChartSettings, ChartPoint };