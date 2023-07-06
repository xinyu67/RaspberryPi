import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const RealTimeTemperatureHumidityChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/realtimeData');
        const data = response.data;
        // 根據資料結構轉換成 Chart.js 所需的格式
        const formattedData = {
          labels: data.map((item) => item.timestamp),
          datasets: [
            {
              label: 'Temperature',
              data: data.map((item) => item.temperature),
              fill: false,
              borderColor: 'red',
            },
            {
              label: 'Humidity',
              data: data.map((item) => item.humidity),
              fill: false,
              borderColor: 'blue',
            },
          ],
        };
        console.log(response.data);
        setChartData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: '300px' }}>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Time',
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Value',
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default RealTimeTemperatureHumidityChart;
