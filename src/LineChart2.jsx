import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { timeFormat } from 'd3-time-format';

const TemperatureHumidityChart = () => {
  const [data, setData] = useState([]);
  const [history, setHistory] = useState([]);
  // 生成模擬資料
   const generateData = (count) => {
    const data = [];
    const startDate = new Date("2023-07-05T00:00:00");
    for (let i = 0; i < count; i++) {
      const time = new Date(startDate.getTime() + i * 3600000); // 增加一小時的毫秒數
      const temperature = Math.floor(Math.random() * 30) + 10; // 生成10到39之間的隨機溫度
      const humidity = Math.floor(Math.random() * 60) + 10; // 生成40到99之間的隨機濕度
      data.push({ time, temperature, humidity });
    }
    return data;
  };

  useEffect(() => {
    const newData = generateData(24); // 生成24小時的模擬資料
    setData(newData);

    // 將新資料加入歷史資料
    setHistory((prevHistory) => [...prevHistory, ...newData]);
  }, []);


  return (
    <div style={{ height: '500px' }}>
      <ResponsiveLine
        data={[
          {
            id: '溫度',
            data: data.map((item) => ({
              x: item.time,
              y: item.temperature,
            })),
          },
          {
            id: '濕度',
            data: data.map((item) => ({
              x: item.time,
              y: item.humidity,
            })),
          },
        ]}
        width={600}
        height={300}
        margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
        xScale={{
          type: 'time',
          format: '%H:%M',
          precision: 'minute',
        }}
        xFormat="time:%H:%M"
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        curve="linear"
        enableGridX={false}
        enableGridY={false}
        enablePoints={true}
        enableArea={false}
        // areaOpacity={0.3}
        colors={{ scheme: 'category10' }}
        axisBottom={{
          format: '%H:%M',
          tickValues: 'every 3 hours',
          legend: '時間',
          legendPosition: 'middle',
          legendOffset: 46,
        }}
        axisLeft={{
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '數值(t/h)',
          legendPosition: 'middle',
          legendOffset: -60,
        }}
        useMesh={true} //增加互動性
        legends={[
          {
              dataFrom: "id",
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 50,
              translateY: -200,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
            //   effects: [
            //     {
            //         on: 'hover',
            //         style: {
            //             itemBackground: 'rgba(0, 0, 0, .03)',
            //             itemOpacity: 1
            //         }
            //     }
            // ]
        }]}
        tooltip={(tooltip) => (
          <div>
            <div>{tooltip.point.serieId}: {tooltip.point.data.yFormatted}</div>
          </div>
        )}
      />
    </div>
  );
};

export default TemperatureHumidityChart;
