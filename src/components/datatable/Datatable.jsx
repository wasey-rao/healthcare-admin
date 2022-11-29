import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import {INITIAL_STATE, searchReducer} from "../../context/searchReducers";
import {useReducer} from "react";
import { useBetween } from 'use-between';
import { useShareableState } from "../../context/shareable";

const Datatable = () => {
  const [data, setData] = useState([]);
  const {query} = useBetween(useShareableState);

  useEffect(() => {
    // let list = [];
    // const fetchData = async () => {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //       //setData((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    //     });
    //     setData(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // fetchData();

    // Listen realtime:

    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      console.log(err);
    });

    return () => unsub();

  }, []);

  console.log(data);

  // const search = () => {
  //   return data.filter((item) => item.displayName.toLowerCase().includes(state.query.toLowerCase()));
  // }

  console.log("Query in tablle: ",query);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={{pathname: `/users/${params.row.id}`}}
              style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Patient
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data.filter((item) => item.displayName.toLowerCase().includes(query.toLowerCase()))}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
