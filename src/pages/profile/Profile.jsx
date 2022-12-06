import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './profile.scss';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Profile = () => {
    const [docData, setDocData] = useState();
    const {docId} = useParams();
    const [data, setData] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        contact: "",
        gender: "",
        qualification: "",
    });

    useEffect(() => {
        const fetchData = onSnapshot(doc(db, "doctors", docId), (doc) => {
                setDocData(doc.data());
                setData(doc.data());
                console.log(doc.data());
            },(err) => {
                console.log(err);
            })
        return () => {
        fetchData();
        }
    }, [docId]);

    const handleUpdate = () => {
        updateDoc(doc(db, "doctors", docId), data);
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{"Profile"}</h1>
                </div>
                <div className="bottom">

                    <div className="left">
                        <div className="card">
                            <figure className="card-figure">
                                <img src="https://thumbs.dreamstime.com/z/doctor-icon-logo-white-background-template-vector-97395631.jpg" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{docData?.firstName + " " + docData?.lastName}</h2>
                                <p className="card-text">{docData?.username}</p>
                                <p className="card-text">{docData?.qualification}</p>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <form onSubmit={handleUpdate} >
                            <div className="formInput">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder='Username'
                                    onChange={(e) => {setData({...data, username: e.target.value})}}
                                    defaultValue={docData?.username}
                                />
                            </div>
                            <div className="formInput">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder='Email'
                                    onChange={(e) => {setData({...data, email: e.target.value})}}
                                    defaultValue={docData?.email}
                                />
                            </div>
                            <div className="formInput">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder='First Name'
                                    onChange={(e) => {setData({...data, firstName: e.target.value})}}
                                    defaultValue={docData?.firstName}
                                />
                            </div>
                            <div className="formInput">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder='Last Name'
                                    onChange={(e) => {setData({...data, lastName: e.target.value})}}
                                    defaultValue={docData?.lastName}
                                />
                            </div>
                            <div className="formInput">
                                <label>Qualification</label>
                                <input
                                    type="text"
                                    placeholder='Qualification'
                                    onChange={(e) => {setData({...data, qualification: e.target.value})}}
                                    defaultValue={docData?.qualification}
                                />
                            </div>
                            <div className="formInput">
                                <label>Contact</label>
                                <input
                                    type="text"
                                    placeholder='Contact'
                                    onChange={(e) => {setData({...data, contact: e.target.value})}}
                                    defaultValue={docData?.contact}
                                />
                            </div>
                            <div className="formInput">
                                <label>Gender</label>
                                <input
                                    type="text"
                                    placeholder='Gender'
                                    onChange={(e) => {setData({...data, gender: e.target.value})}}
                                    defaultValue={docData?.gender}
                                />
                            </div>

                        <button type="submit" >Update</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;