import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
//import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment/moment";

const Single = () => {
  let params = useParams();
  const [patientData, setPatientData] = useState([""]);
  const [temp, setTemp] = useState([]);
  const [humid, setHumid] = useState([]);
  // var humidity = [];
  // var temperature = []

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", params.userId), (doc) => {
      setPatientData(doc.data());
      //humidity.push({name: moment(new Date().getTime()).format('HH:mm:ss'), F: doc.data().humidity})
      setTemp([...temp,temp.push({name: moment(new Date().getTime()).format('HH:mm:ss'), F: doc.data().temperature})].slice(Math.max(temp.length - 7, 0)));
      setHumid([...humid, humid.push({name: moment(new Date().getTime()).format('HH:mm:ss'), F: doc.data().humidity})]);
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
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={patientData.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{patientData.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Age:</span>
                  <span className="itemValue">{patientData.age}</span>
                </div>
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
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{patientData.country}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Temperature:</span>
                  <span className="itemValue">{patientData.temperature}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Humidity:</span>
                  <span className="itemValue">{patientData.humidity}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Temperature" data={temp} />
          </div>
        </div>
        <div className="down">
          <div className="left">
            <Chart aspect={3 / 1} title="Blood Pressure" />
          </div>
          <div className="right1">
            <Chart aspect={3 / 1} title="Humidity" data={humid} />
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
