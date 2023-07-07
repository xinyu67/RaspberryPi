// import React from 'react'
// import { ComposedChart,XAxis,YAxis,Tooltip,Legend,CartesianGrid,Bar,Line, ReferenceDot} from 'recharts';
// import './chart.css'

// const data = [
//     {
//       "date": "2023-07-01",
//       "temp": 30,
//       "humid": 75,
      
//     },
//     {
//       "date": "2023-07-02",
//       "temp": 29,
//       "humid": 56,
      
//     },
//     {
//       "date": "2023-07-03",
//       "temp": 33,
//       "humid": 78,
      
//     },
//     {
//       "date": "2023-07-04",
//       "temp": 32,
//       "humid": 56,
      
//     },
//     {
//       "date": "2023-07-05",
//       "temp": 27,
//       "humid": 52,
      
//     },
//     {
//       "date": "2023-07-06",
//       "temp": 27,
//       "humid": 43,
      
//     },
//     {
//       "date": "2023-07-07",
//       "temp": 30,
//       "humid": 67,
      
//     }
//   ]
  

// function Chart() {

//     return (

//         <ComposedChart width={730} height={250} data={data}>
//         <ReferenceDot/>
//         <XAxis dataKey="date" />
//         <YAxis unit={'°c'} type='number'/>
//         <Tooltip />
//         <Legend />
//         <CartesianGrid stroke="#f5f5f5" />
//         <Bar dataKey="humid" barSize={20} fill="#413ea0" />
//         <Line type="monotone" dataKey="temp" stroke="#ff7300" />
//       </ComposedChart>
//     )
    
// }

// export default Chart;