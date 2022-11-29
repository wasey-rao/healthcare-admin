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
import {useState, useEffect, useRef} from 'react';

// const data = [
//   { name: "17:10:21", F: 98.2 },
//   { name: "17:10:25", F: 97.5 },
//   { name: "17:10:30", F: 100.4 },
//   { name: "17:10:35", F: 96.3 },
//   { name: "17:10:40", F: 97.0 },
//   { name: "17:10:45", F: 102.0 },
// ];

const Chart = ({ aspect, title, data }) => {
  
  // const [response, setResponse] = useState([]);
  // const [time,setTime] = useState('');
  // const [arr,setArr] = useState([{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:5},{X:5},{X:5},{X:5},{X:5},{X:5},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:5},{X:5},{X:5},{X:5},{X:5},{X:5},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:5},{X:5},{X:5},{X:5},{X:5},{X:5},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:0},{X:5},{X:5},{X:5},{X:5},{X:5},{X:5},{X:0},{X:0},{X:0},{X:0},{X:0}]);
  // const timeoutRef = useRef(null);
  // function validate() {
  //   setArr((prevState)=>[...prevState,{X:(Math.random()>=0.5)? 5 : 0}].slice(1))
  // }

  // useEffect(() => {
  //   if (timeoutRef.current !== null) {
  //     clearTimeout(timeoutRef.current);
  //   }
  //  let interval = 6000;
  //  let speed = 100;
  //  for(let i=0;i<interval;i++){
  //   timeoutRef.current = setTimeout(()=> {
  //     timeoutRef.current = null;
  //     validate()
  //   },i*speed);
  //  }
  // },[]);
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
      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey={"name"}/>
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="F" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
