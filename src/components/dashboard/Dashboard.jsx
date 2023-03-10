import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { getDashboardLeaves } from '../../getdata/getdata';
import Pagination from '../pagination/Pagination';
import RecentLeave from '../../assets/Recentleave.png';
import Upcomingleave from '../../assets/Upcomingleave.png';
import Pendingleave from '../../assets/Pendingleave.png';
import NoRecord from '../../assets/NoRecord.png';
import '../../styles/dashboard.css';
import ProjectDetails from '../projects/ProjectDetails';


const Dashboard = () => {
    const [leavedetails, setLeaveDetails] = useState(true);
    const [projectdetails, setProjectDetails] = useState(false);
    const [todayleave, setTodayLeave] = useState(true);
    const [laterleave, setLaterLeave] = useState(false);
    const [leavestatus, setLeaveStatus] = useState(false);
    const [todayleavelist, setTodayLeavelist] = useState([]);
    const [laterleavelist, setLaterLeavelist] = useState([]);
    const [leavestatuslist, setLeaveStatuslist] = useState([]);

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
        getDashboardLeaves()
            .then((response) => {
                setTodayLeavelist(response.data.dataForToday);
                setLaterLeavelist(response.data.dataForWeek);
                setLeaveStatuslist(response.data.dataForPendingStaus);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);



    return (
        <>
            <Sidebar />
            <div className="content" >
                <div className='row mb-1' style={{marginTop: 1}}>
                    <div className="col-lg-6">
                        <div className='card' style={leavedetails ? { backgroundColor: "lightgreen", cursor: 'pointer' } : { cursor: 'pointer' }}
                            onClick={() => {

                                setLeaveDetails(true);
                                setProjectDetails(false)

                            }}>
                            <div className='card-body'>
                                <p className='fs-6 fw-bold text-secondary text-center'>Leave Details</p>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-6">
                        <div className='card' style={projectdetails ? { backgroundColor: "lightgreen", cursor: 'pointer' } : { cursor: 'pointer' }}
                            onClick={() => {

                                setProjectDetails(true);
                                setLeaveDetails(false);
                            }}>
                            <div className='card-body'>
                                <p className='fs-6 fw-bold text-secondary text-center'>Project Details</p>
                            </div>
                        </div>
                    </div>
                 
                </div>
                

                {leavedetails ? (
                    <div className="card mt-1">
                        <div className="card-body">
                            <div className="row mt-2">
                                <div className="col-md-4">
                                    <div className='card' style={todayleave ? { backgroundColor: "lightgreen", cursor: 'pointer' } : { cursor: 'pointer' }}
                                        onClick={() => {

                                            setTodayLeave(true);
                                            setLaterLeave(false);
                                            setLeaveStatus(false);
                                        }} >
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="p-2 w-100 fs-4 fw-bold text-secondary">Current Leaves</div>
                                                <div className="p-2 fs-1 fw-bold text-secondary flex-shrink-1">0{todayleavelist.length}</div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="p-2 w-100"><img src={RecentLeave} alt='RecentLeave' /></div>
                                                <div className="p-2 fs-6 fw-bold flex-shrink-1">People on leave Today</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className='card' style={laterleave ? { backgroundColor: "lightgreen", cursor: 'pointer', height: "100%" } : { cursor: 'pointer' }} onClick={() => {
                                        setLaterLeave(true);
                                        setTodayLeave(false);
                                        setLeaveStatus(false);
                                    }}>
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="p-2 w-100 fs-4 fw-bold text-secondary">Upcoming Leaves</div>
                                                <div className="p-2 fs-1 fw-bold text-secondary flex-shrink-2">0{laterleavelist.length}</div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="p-2 w-100"><img src={Upcomingleave} alt='Upcomingleave' /></div>
                                                <div className="p-2 fs-6 fw-bold flex-shrink-1">People on leave Upcoming 7 days</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className='card' style={leavestatus ? { backgroundColor: "lightgreen", cursor: 'pointer' } : { cursor: 'pointer' }} onClick={() => {
                                        setLeaveStatus(true);
                                        setLaterLeave(false);
                                        setTodayLeave(false);
                                    }}>
                                        <div className="card-body">

                                            <div className="d-flex">
                                                <div className="p-2 w-100 fs-4 fw-bold text-secondary">Take Action</div>
                                                <div className="p-2 fs-1 fw-bold text-secondary flex-shrink-1">0{leavestatuslist.length}</div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="p-2 w-100"><img src={Pendingleave} alt='Pendingleave' /></div>
                                                <div className="p-2 fs-6 fw-bold flex-shrink-1">Leaves Not Approved</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='scroll'>

                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Employee Name</th>
                                                <th className='vertical-row-color' scope="col">|</th>
                                                <th scope="col">Leave Type</th>
                                                <th className='vertical-row-color' scope="col">|</th>
                                                <th scope="col">From Date</th>
                                                <th className='vertical-row-color' scope="col">|</th>
                                                <th scope="col">To Date</th>
                                                <th className='vertical-row-color' scope="col">|</th>
                                                <th scope="col">Status</th>
                                                <th className='vertical-row-color' scope="col">|</th>
                                                <th scope="col">Reason</th>
                                            </tr>
                                        </thead>
                                        {todayleave ? (
                                            <tbody>
                                                {todayRecords.map((item) => {
                                                    return (
                                                        <tr>
                                                            <td style={{ textTransform: "capitalize" }}>{item.employeeName}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.leaveType}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.fromDate.substring(0, 10)}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.toDate.substring(0, 10)}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.status}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.reason}</td>
                                                        </tr>
                                                    )
                                                })}


                                            </tbody>

                                        ) : null}

                                        {laterleave ? (
                                            <tbody>
                                                {upcomingRecords.map((item) => {
                                                    return (
                                                        <tr>

                                                            <td style={{ textTransform: "capitalize" }}>{item.employeeName}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.leaveType}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.fromDate.substring(0, 10)}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.toDate.substring(0, 10)}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.status}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.reason}</td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        ) : null}

                                        {leavestatus ? (
                                            <tbody>
                                                {pendingRecords.map((item) => {
                                                    return (
                                                        <tr>
                                                            <td className='text-capitalize'>{item.employeeName}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.leaveType}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.fromDate.substring(0, 10)}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.toDate.substring(0, 10)}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.status}</td>
                                                            <td className='vertical-row-color'>|</td>
                                                            <td>{item.reason}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        ) : null}
                                    </table>

                                    {todayleave && todayRecords.length === 0 ?
                                        <div className='text-center'>
                                            <img src={NoRecord} alt='NoRecord' className='w-10' />
                                        </div>
                                        : null}
                                    {laterleave && upcomingRecords.length === 0 ?
                                        <div className='text-center'>
                                            <img src={NoRecord} alt='NoRecord' className='w-10' />
                                        </div>
                                        : null}
                                    {leavestatus && pendingRecords.length === 0 ?
                                        <div className='text-center'>
                                            <img src={NoRecord} alt='NoRecord' className='w-10' />
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <ProjectDetails/>}



                {todayleave && todayRecords.length > 0 && leavedetails ?
                    <div className='d-flex'>
                        <div className="p-2 w-100 fs-6 fw-bold text-secondary">
                        Showing {indexOfFirstRecord+1} to {currentPage === todayPages ? todayleavelist.length: indexOfLastRecord}  of {todayleavelist.length} records
                        </div>
                        <div className="p-2 flex-shrink-1">
                            <Pagination
                                nPages={todayPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            /></div>

                    </div>
                    : null}

                {laterleave && upcomingRecords.length > 0 && leavedetails ?
                    <div className='d-flex'>
                        <div className="p-2 w-100 fs-6 fw-bold text-secondary">
                        Showing {indexOfFirstRecord+1} to {currentPage === upcomingPages ? laterleavelist.length: indexOfLastRecord}  of {laterleavelist.length} records
                        </div>
                        <div className="p-2 flex-shrink-1">
                            <Pagination
                                nPages={upcomingPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            /></div>

                    </div>
                    : null}

                {leavestatus && pendingRecords.length > 0 && leavedetails ?
                    <div className='d-flex'>
                        <div className="p-2 w-100 fs-6 fw-bold text-secondary">
                        Showing {indexOfFirstRecord+1} to {currentPage === pendingPages ? leavestatuslist.length: indexOfLastRecord}  of {leavestatuslist.length} records
                        </div>
                        <div className="p-2 flex-shrink-1">
                            <Pagination
                                nPages={pendingPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            /></div>

                    </div>
                    : null}
            </div>
        </>
    );
}

export default Dashboard;
