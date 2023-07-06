import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { timeFormat } from 'd3-time-format';

const RealTimeTemperatureHumidityChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateRandomData = () => {
      const newData = data.slice();
      const now = new Date();
      const temperature = Math.floor(Math.random() * 30) + 10; // 生成10到39之間的隨機溫度
      const humidity = Math.floor(Math.random() * 60) + 40; // 生成40到99之間的隨機濕度
      newData.push({ x: now, y: temperature, humidity });
      if (newData.length > 24 * 6) {
        newData.shift(); // 移除最舊的資料點，保持24小時內的資料
      }
      setData(newData);
    };

    const interval = setInterval(generateRandomData, 1000); // 每分鐘生成一次隨機資料

    return () => {
      clearInterval(interval); // 結束時清除定時器
    };
  }, [data]);

  const formatDate = timeFormat('%H:%M'); // 格式化時間

  return (
    <div style={{ height: '300px' }}>
      <ResponsiveLine
        data={[
          {
            id: 'Temperature',
            data: data.map((item) => ({
              x: item.x,
              y: item.y,
            })),
          },
          {
            id: 'Humidity',
            data: data.map((item) => ({
              x: item.x,
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
        curve="natural"
        enableGridX={false}
        enableGridY={false}
        enablePoints={true}
        enableArea={true}
        areaOpacity={0.3}
        colors={{ scheme: 'category10' }}
        axisBottom={{
          format: '%H:%M',
          tickValues: 'every 1 hour',
          legend: 'Time',
          legendPosition: 'middle',
          legendOffset: 46,
        }}
        axisLeft={{
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Value',
          legendPosition: 'middle',
          legendOffset: -60,
        }}
        legends={[
          {
            dataFrom: "id",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}

        tooltip={(tooltip) => (
          <div>
            {/* <div>{formatDate(tooltip.point.data.xFormatted)}</div> */}
            <div>{tooltip.point.serieId}: {tooltip.point.data.xFormatted}</div>
            <div>{tooltip.point.serieId}: {tooltip.point.data.yFormatted}</div>
          </div>
        )}
      />
    </div>
  );
};

export default RealTimeTemperatureHumidityChart;