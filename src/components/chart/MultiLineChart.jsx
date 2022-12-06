import "./chart.scss";
import {
  AreaChart,
  LineChart,
  Line,
  Area,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {useState, useEffect} from 'react';

// const data = [
//   { name: "17:10:21", F: 98.2 },
//   { name: "17:10:25", F: 97.5 },
//   { name: "17:10:30", F: 100.4 },
//   { name: "17:10:35", F: 96.3 },
//   { name: "17:10:40", F: 97.0 },
//   { name: "17:10:45", F: 102.0 },
// ];

const MultiLineChart = ({ aspect, title, data, icon }) => {
  
  const [tempData, setTempData] = useState([]);
  useEffect(()=>{
    if(data === null){

    } else {
      setTempData(data);
    }
  },[data]);
  console.log("chart data: ", tempData);
  return (
    <div className="chart">
      <div className="title">{title}</div>
      {icon}
      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey={"name"}/>
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="C" stroke="#8884d8" />
          <Line type="monotone" dataKey="RV" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Re" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MultiLineChart;
