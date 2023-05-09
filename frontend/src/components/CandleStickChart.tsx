import { FC, useEffect, useRef } from "react";
import {
  createChart,
  SingleValueData,
  WhitespaceData,
  ChartOptions,
  DeepPartial,
  SeriesMarker,
  Time,
} from "lightweight-charts";

interface Props {
  dataSeries: (SingleValueData | WhitespaceData)[];
  chartOptions?: DeepPartial<ChartOptions>;
  height: number;
  markers: SeriesMarker<Time>[];
}

const CandlestickChart: FC<Props> = ({ dataSeries: data, chartOptions, height, markers }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current === null) {
      return;
    }
    const handleResize = () => {
      if (chartContainerRef.current === null) {
        return;
      }
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      ...chartOptions,
      height,
      width: chartContainerRef.current.clientWidth,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries();
    newSeries.setData(data);
    newSeries.setMarkers(markers);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, markers, chartOptions, height]);

  return <div ref={chartContainerRef} />;
};

export default CandlestickChart;
