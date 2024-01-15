import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import axios from "axios";

const LineChart = () => {
  const [data, setData] = useState<number[]>([]);

  const options = {
    grid: { top: 4, right: 0, bottom: 24, left: -100 },
    xAxis: {
      type: "category",
      data: [],
      axisLabel: {
        show: false, // Hide X axis labels
      },
      splitLine: {
        show: false, // Hide X axis grid lines
      },
    },

    yAxis: {
      type: "value",
      axisLabel: {
        show: false, // Hide X axis labels
      },
      splitLine: {
        show: false, // Hide X axis grid lines
      },
    },
    tooltip: {
      trigger: "axis", // Show tooltip when hovering over data points
      // ... other tooltip configurations
    },

    series: [
      {
        animation: true,
        animationDuration: 1000, // Set the animation duration
        animationEasing: "cubicInOut",
        data: data,
        type: "line",
        showSymbol: false,
        smooth: 0.1,
        lineStyle: {
          color: "white",
          width: 4, // Hide series line
        },
        areaStyle: {
          opacity: 0.8,
          color: "#1DA6BB",
        },
      },
    ],
  };

  const runApp = async () => {
    const res = await axios.get(
      "https://api.geckoterminal.com/api/v2/networks/eth/pools/0xaa665ad2c5f99c9861c1030ef85e48ba07059c2a/ohlcv/minute?aggregate=5&limit=100&currency=usd"
    );

    const ohlcvList= res.data.data.attributes.ohlcv_list;
    // Map through the array and return the second item of each sub-array
    const items = ohlcvList.map((item : any) => item[1]);
    setData(items);
  };

  useEffect(() => {
    runApp();
  }, []);

  return (
    <ReactECharts
      style={{
        height: 150,
        width: 900,
      }}
      option={options}
      notMerge={true}
      lazyUpdate={true}
    />
  );
};

export default LineChart;
