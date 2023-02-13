import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import '../../styles/dashboard.css';
import { GrLogout } from 'react-icons/gr';
import axios from 'axios';
import Pagination from '../pagination/Pagination';

const Dashboard = () => {
    const [todayleave, setTodayLeave] = useState(true);
    const [laterleave, setLaterLeave] = useState(false);
    const [leavestatus, setLeaveStatus] = useState(false);
    const [todayleavelist, setTodayLeavelist] = useState([]);
    const [laterleavelist, setLaterLeavelist] = useState([]);
    const [leavestatuslist, setLeaveStatuslist] = useState([]);
    const [searchLeave, setSearchLeave] = useState('');
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const todayRecords = todayleavelist.slice(indexOfFirstRecord, indexOfLastRecord);
    const upcomingRecords = laterleavelist.slice(indexOfFirstRecord, indexOfLastRecord);
    const pendingRecords = leavestatuslist.slice(indexOfFirstRecord, indexOfLastRecord);
    const todayPages = Math.ceil(todayleavelist.length / recordsPerPage);
    const upcomingPages = Math.ceil(laterleavelist.length / recordsPerPage);
    const pendingPages = Math.ceil(leavestatuslist.length / recordsPerPage);



    useEffect(() => {
        axios.post('https://db66-2401-4900-1c19-5e6d-e173-3e63-35f5-4011.in.ngrok.io/api/v1/leave/dashboard/list')
            .then((response) => {
                setTodayLeavelist(response.data.dataForToday);
                setLaterLeavelist(response.data.dataForWeek);
                setLeaveStatuslist(response.data.dataForPendingStaus);

            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logging out');
        navigate('/');
    }
    return (
        <>
            <Sidebar />
            <div className="content">
                <div className="row mt-4 mb-4">
                    <div className="col-xs-6 col-sm-6 col-md-10 col-lg-11">
                        <input className="w-100 ps-3 search-input" type="text" name="Search" placeholder='Search Leave Details...'
                            onChange={(e) => setSearchLeave(e.target.value)} />

                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-2 col-lg-1">
                        <GrLogout className="shopping-bag" style={{ width: 50, height: 40, cursor: 'pointer' }} onClick={handleLogout} />
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h3>Leave Details</h3>
                        <div className="row mt-5">
                            <div className="col-md-4">
                                <div className='card' style={todayleave ? { backgroundColor: "lightgreen", cursor: 'pointer' } : { cursor: 'pointer' }}
                                    onClick={() => {

                                        setTodayLeave(true);
                                        setLaterLeave(false);
                                        setLeaveStatus(false);
                                    }} >
                                    <div className="card-body">
                                        <p className="fw-bold text-secondary">Recent Leaves</p>
                                        <div className="row">
                                            <div className="col-lg-6">

                                            </div>
                                            <div className="col-lg-6">
                                                <p className="fs-4 fw-bold">People On Leave Today</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='card' style={laterleave ? { backgroundColor: "lightcoral", cursor: 'pointer' } : { cursor: 'pointer' }} onClick={() => {
                                    setLaterLeave(true);
                                    setTodayLeave(false);
                                    setLeaveStatus(false);
                                }}>
                                    <div className="card-body">
                                        <p className="fw-bold text-secondary">Upcoming Leaves</p>
                                        <div className="row">
                                            <div className="col-lg-3">
                                                {/* <img src={IncomeLogo} alt="OrderLogo" style={{ width: 100, height: 80 }} /> */}
                                            </div>
                                            <div className="col-lg-9">
                                                <p className="fs-4 fw-bold">People On Leave Upcoming (7 Days)</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='card' style={leavestatus ? { backgroundColor: "lightblue", cursor: 'pointer' } : { cursor: 'pointer' }} onClick={() => {
                                    setLeaveStatus(true);
                                    setLaterLeave(false);
                                    setTodayLeave(false);
                                }}>
                                    <div className="card-body">
                                        <p className="fw-bold text-secondary">Leaves Status</p>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                {/* <img src={ExpenseLogo} alt="OrderLogo" style={{ width: 100, height: 80 }} /> */}
                                            </div>
                                            <div className="col-lg-6">
                                                <p className="fs-4 fw-bold">Leaves Not Approved</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {todayleave ? <p className="mt-3 fs-5 fw-bold">People On Leave Today</p> : null}
                            {laterleave ? <p className="mt-3 fs-5 fw-bold">People On Leave Upcoming (7 Days)</p> : null}
                            {leavestatus ? <p className="mt-3 fs-5 fw-bold">Leaves Not Approved</p> : null}
                            <div className='scroll'>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            {/* <th scope="col">S.No</th> */}
                                            <th scope="col">Employee Name</th>
                                            <th scope="col">Leave Type</th>
                                            <th scope="col">From Date</th>
                                            <th scope="col">To Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Reason</th>
                                        </tr>
                                    </thead>
                                    {todayleave ? (
                                        <tbody>
                                            {todayRecords.filter((val) => {
                                                return val.employeeName.toLowerCase().includes(searchLeave.toLowerCase())
                                            }).map((item) => {
                                                return (
                                                    <tr>
                                                        {/* <td>1</td> */}
                                                        <td>{item.employeeName}</td>
                                                        <td>{item.leaveType}</td>
                                                        <td>{item.fromDate.substring(0, 10)}</td>
                                                        <td>{item.toDate.substring(0, 10)}</td>
                                                        <td>{item.status}</td>
                                                        <td>{item.reason}</td>
                                                    </tr>
                                                )
                                            })}


                                        </tbody>

                                    ) : null}

                                    {laterleave ? (
                                        <tbody>
                                            {upcomingRecords.filter((val) => {
                                                return val.employeeName.toLowerCase().includes(searchLeave.toLowerCase())
                                            }).map((item) => {
                                                return (
                                                    <tr>
                                                        {/* <td>1</td> */}
                                                        <td>{item.employeeName}</td>
                                                        <td>{item.leaveType}</td>
                                                        <td>{item.fromDate.substring(0, 10)}</td>
                                                        <td>{item.toDate.substring(0, 10)}</td>
                                                        <td>{item.status}</td>
                                                        <td>{item.reason}</td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    ) : null}

                                    {leavestatus ? (
                                        <tbody>
                                            {pendingRecords.filter((val) => {
                                                return val.employeeName.toLowerCase().includes(searchLeave.toLowerCase())
                                            }).map((item) => {
                                                return (
                                                    <tr>
                                                        {/* <td>1</td> */}
                                                        <td>{item.employeeName}</td>
                                                        <td>{item.leaveType}</td>
                                                        <td>{item.fromDate.substring(0, 10)}</td>
                                                        <td>{item.toDate.substring(0, 10)}</td>
                                                        <td>{item.status}</td>
                                                        <td>{item.reason}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    ) : null}


                                </table>
                                {todayleave ? <Pagination
                                    nPages={todayPages}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                /> : null}
                                {laterleave ? <Pagination
                                    nPages={upcomingPages}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                /> : null}
                                {leavestatus ? <Pagination
                                    nPages={pendingPages}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                /> : null}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
