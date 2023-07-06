import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { timeFormat } from 'd3-time-format';
import axios from 'axios'


const RealTimeTemperatureHumidityChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/realtimeData');
                const formattedData = Array.isArray(response.data)
                    ? response.data.map((item) => ({
                        x: new Date(item.timestamp),
                        Temperature: item.temperature,
                        Humidity: item.humidity,
                    }))
                    : [];
                setData(formattedData);
            } catch (error) {
                console.log(error);
            }
        };

        const interval = setInterval(fetchData, 1000); // 每分鐘重新取得資料

        fetchData(); // 初始取得資料

        return () => {
            clearInterval(interval); // 結束時清除定時器
        };
    }, []);

    // const formatDate = timeFormat('%H:%M'); // 格式化時間

    return (
        <div style={{ height: '300px' }}>
            <ResponsiveLine
                data={[
                    {
                        id: 'Temperature',
                        data: data.map((item) => ({
                            x: item.x,
                            y: item.Temperature,
                        }))
                    },
                    {
                        id: 'Humidity',
                        data: data.map((item) => ({
                            x: item.x,
                            y: item.Humidity,
                        }))}
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