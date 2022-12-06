import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import MultiLineChart from "../../components/chart/MultiLineChart";
//import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment/moment";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import SoapIcon from '@mui/icons-material/Soap';

const Single = () => {
  let params = useParams();
  const [patientData, setPatientData] = useState([""]);
  const [temp, setTemp] = useState([]);
  const [snore, setSnore] = useState([]);
  const [GSR, setGSR] = useState([]);
  // var humidity = [];
  // var temperature = []

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", params.userId), (doc) => {
      setPatientData(doc.data());
      //humidity.push({name: moment(new Date().getTime()).format('HH:mm:ss'), F: doc.data().humidity})
      setTemp([...temp,temp.push({name: moment(new Date().getTime()).format('HH:mm:ss'), C: doc.data().temperature})].slice(Math.max(temp.length - 9, 0)));
      setSnore([...snore, snore.push({name: moment(new Date().getTime()).format('HH:mm:ss'), V: doc.data().snore_voltages})].slice(Math.max(snore.length - 9, 0)));
      setGSR([...GSR, GSR.push({name: moment(new Date().getTime()).format('HH:mm:ss'), C: doc.data().conductance,RV: doc.data().resistive_voltages,Re: doc.data().resistance})].slice(Math.max(GSR.length - 9, 0)));
      console.log("single",temp);
    }, (err) => {
      console.log(err);
    });
    return () => unsub();
  }, [params.userId]);

  console.log("single page: ", params);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
            <h1 className="title">Information</h1>
            <div className="item">
              {/* <img
                src={patientData.img}
                alt=""
                className="itemImg"
              /> */}
              <div className="details">
                <h1 className="itemTitle">{patientData.username}</h1>
                {/* <div className="detailItem">
                  <span className="itemKey">Age:</span>
                  <span className="itemValue">{patientData.age}</span>
                </div> */}
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{patientData.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {patientData.address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Age:</span>
                  <span className="itemValue">{patientData.age}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Temperature:</span>
                  <span className="itemValue">{patientData.temperature}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Position:</span>
                  <span className="itemValue">{patientData.position}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Snore:</span>
                  <span className="itemValue">{patientData.snore_voltages}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Temperature" data={temp} dataKey={'C'} icon={<DeviceThermostatIcon style={{color:'red'}}/>} />
          </div>
        </div>
        <div className="down">
          <div className="left">
            <MultiLineChart aspect={3 / 1} title="GSR" data={GSR} icon={<SoapIcon style={{color:'green'}}/>} />
          </div>
          <div className="right1">
            <Chart aspect={3 / 1} title="Snore" data={snore} dataKey={'V'} icon={<AirIcon style={{color:'blue'}}/>} />
          </div>
        </div>
        {/* <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div> */}
      </div>
    </div>
  );
};

export default Single;
