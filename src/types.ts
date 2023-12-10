interface HillChartSettings {
  chartHeight: number;
  chartWidth: number;
  pointSize: number;
}

type ChartPoint = {
  position: number;
  color?: string;
  text?: string;
}

export type { HillChartSettings, ChartPoint };