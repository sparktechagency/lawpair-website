import { Select } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ chartValue, curdTitle }) => {
  const [chartHeight, setChartHeight] = useState(440);
  const [chartData, setChartData] = useState({
    prices: [],
    dates: [],
  });

  // Update chart data when props change
  useEffect(() => {
    if (chartValue?.length > 0) {
      const dates = chartValue.map((item) => item.month);
      const prices = chartValue.map((item) => item.data);
      setChartData({ prices, dates });
    }
  }, [chartValue]);

  const chartOptions = {
    chart: {
      type: "area",
      height: 350,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    colors: ["#00d2ff"],
    stroke: { curve: "smooth", width: 1 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4, // Adjusted opacity to match the effect
        opacityTo: 0.1, // Gradient fading effect
        stops: [0, 100],
      },
    },
    title: {
      text: `${curdTitle}`,
      align: "left",
    },
    subtitle: {
      text: "Dynamic Analytics",
      align: "left",
    },
    xaxis: {
      categories: chartData.dates,
      type: "category",
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {},
    grid: {
      xaxis: { lines: { show: false } },
      borderColor: "transparent",
    },
    legend: { horizontalAlign: "right" },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartHeight(300);
      } else if (window.innerWidth < 1024) {
        setChartHeight(396);
      } else {
        setChartHeight(396);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Chart */}
      <div id="chart" className="w-full bg-[#FFFF] my-6 p-4 rounded-lg">
        {chartData.prices.length > 0 ? (
          <ReactApexChart
            options={chartOptions}
            series={[{ name: `Monthly ${curdTitle}`, data: chartData.prices }]}
            type="area"
            height={chartHeight}
          />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default Chart;
