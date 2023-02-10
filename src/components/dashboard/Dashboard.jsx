import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import '../../styles/dashboard.css';
import { GrLogout } from 'react-icons/gr';
const Dashboard = () => {
    const [todayleave, setTodayLeave] = useState(true);
    const [laterleave, setLaterLeave] = useState(false);
    const [leavestatus, setLeaveStatus] = useState(false);
    const navigate = useNavigate();


    const handleLogout = () => {
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
                        />
                        {/* <BsSearch className='search-icon' /> */}
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
                                <div className='card' style={{ backgroundColor: "lightgreen", cursor: 'pointer' }} onClick={() => {

                                    setTodayLeave(true);
                                    setLaterLeave(false);
                                    setLeaveStatus(false);
                                }} >
                                    <div className="card-body">
                                        <p className="fw-bold text-secondary">Recent Leaves</p>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                {/* <img src={OrdersLogo} alt="OrderLogo" style={{ width: 100, height: 80 }} /> */}
                                                {/* <FontAwesomeIcon icon="fas fa-house-leave" /> */}
                                            </div>
                                            <div className="col-lg-6">
                                                <p className="fs-4 fw-bold">People On Leave Today</p>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='card' style={{ backgroundColor: "lightcoral", cursor: 'pointer' }} onClick={() => {
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
                                <div className='card' style={{ backgroundColor: "lightblue" }} onClick={() => {
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
                            {todayleave ? <p className="fs-4 fw-bold">People On Leave Today</p> : null}
                            {laterleave ? <p className="fs-4 fw-bold">People On Leave Upcoming (7 Days)</p> : null}
                            {leavestatus ? <p className="fs-4 fw-bold">Leaves Not Approved</p> : null}
                            <table className="table table-striped">

                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Employee Name</th>
                                        <th scope="col">Leave Type</th>
                                        <th scope="col">From Date</th>
                                        <th scope="col">To Date</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                {todayleave ? (
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Suresh</td>
                                            <td>Casual Leave</td>
                                            <td>10-02-2023</td>
                                            <td>10-02-2023</td>
                                            <td>Pending</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Mukesh</td>
                                            <td>Casual Leave</td>
                                            <td>10-02-2023</td>
                                            <td>10-02-2023</td>
                                            <td>Pending</td>
                                        </tr>
                                    </tbody>

                                ) : null}

                                {laterleave ? (
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Manish</td>
                                            <td>Casual Leave</td>
                                            <td>17-02-2023</td>
                                            <td>19-02-2023</td>
                                            <td>Pending</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Jai</td>
                                            <td>Casual Leave</td>
                                            <td>18-02-2023</td>
                                            <td>20-02-2023</td>
                                            <td>Pending</td>
                                        </tr>
                                    </tbody>
                                ) : null}

                                {leavestatus ? (
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Ram</td>
                                            <td>Casual Leave</td>
                                            <td>17-02-2023</td>
                                            <td>19-02-2023</td>
                                            <td>Pending</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Shyam</td>
                                            <td>Casual Leave</td>
                                            <td>18-02-2023</td>
                                            <td>20-02-2023</td>
                                            <td>Pending</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Gopal</td>
                                            <td>Sick Leave</td>
                                            <td>18-02-2023</td>
                                            <td>20-02-2023</td>
                                            <td>Pending</td>
                                        </tr>
                                    </tbody>
                                ) : null}


                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
