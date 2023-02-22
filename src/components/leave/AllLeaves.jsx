import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { Modal } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import EditLeave from './EditLeave';
import Pagination from '../pagination/Pagination';
import { getAllLeaves } from '../../getdata/getdata';
import { deleteLeave } from '../../postdata/postdata';
import NoRecord from '../../assets/NoRecord.png';
import '../../styles/dashboard.css';

const AllLeaves = () => {
    const [allleave, setAllLeave] = useState(true);
    const [pendingleave, setPendingLeave] = useState(false);
    const [approvedleave, setApprovedLeave] = useState(false);
    const [rejectedleave, setRejectedLeave] = useState(false);
    const [editstatus, setEditStatus] = useState(false);
    const [leavelist, setLeaveList] = useState([]);
    const status = 'All';
    const filterdata = leavelist.filter(item => {
        if (status === 'All') {
            return item;
        }
        return item.status === status;
    })

    const pendingleaves = leavelist.filter(item => item.status === 'Pending')
    const approvedleaves = leavelist.filter(item => item.status === 'Approved')
    const rejectedleaves = leavelist.filter(item => item.status === 'Rejected')


    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filterdata.slice(indexOfFirstRecord, indexOfLastRecord);
    const pendingRecords = pendingleaves.slice(indexOfFirstRecord, indexOfLastRecord);
    const approvedRecords = approvedleaves.slice(indexOfFirstRecord, indexOfLastRecord);
    const rejectedRecords = rejectedleaves.slice(indexOfFirstRecord, indexOfLastRecord);
    const allPages = Math.ceil(filterdata.length / recordsPerPage);
    const pendingPages = Math.ceil(pendingleaves.length / recordsPerPage);
    const approvedPages = Math.ceil(approvedleaves.length / recordsPerPage);
    const rejectedPages = Math.ceil(rejectedleaves.length / recordsPerPage);
    const [totalrecords, setTotalRecords] = useState(0);

    useEffect(() => {
        getAllLeaves()
            .then((response) => {
                setLeaveList(response.data.data);
                setTotalRecords(response.data.data.length)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleEditStatus = (id) => {
        setEditStatus(id)
    };


    const DeleteLeaves = (id) => {
        deleteLeave(id)
            .then((response) => {
                alert(response.data.message);
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const handleClose = () => setEditStatus(false);
    return (
        <>
            <Sidebar />
            <div className="content">
                <div className="card">
                    <div className="card-body">
                        <div className='m-2'>
                            <div className='row'>
                                <div className='col-lg-3'>
                                    <div className='card' style={allleave ? { backgroundColor: "lightgreen", cursor: 'pointer' } : { cursor: 'pointer' }}
                                        onClick={() => {
                                            setAllLeave(true);
                                            setPendingLeave(false);
                                            setApprovedLeave(false);
                                            setRejectedLeave(false);
                                        }}>
                                        <div className='card-body'>
                                            <p className='fs-4 fw-bold text-secondary'>All Leaves</p>
                                        </div>
                                    </div>

                                </div>
                                <div className='col-lg-3'>
                                    <div className='card'
                                        style={pendingleave ? { backgroundColor: "lightgreen", cursor: 'pointer' } : { cursor: 'pointer' }}
                                        onClick={() => {
                                            setAllLeave(false);
                                            setPendingLeave(true);
                                            setApprovedLeave(false);
                                            setRejectedLeave(false);
                                        }}>
                                        <div className='card-body'>
                                            <p className='fs-4 fw-bold text-secondary'>Pending Leaves</p>
                                        </div>
                                    </div>

                                </div>
                                <div className='col-lg-3'>
                                    <div className='card'
                                        style={approvedleave ? { backgroundColor: "lightgreen", cursor: 'pointer' } : { cursor: 'pointer' }}
                                        onClick={() => {
                                            setAllLeave(false);
                                            setPendingLeave(false);
                                            setApprovedLeave(true);
                                            setRejectedLeave(false);
                                        }}>
                                        <div className='card-body'>
                                            <p className='fs-4 fw-bold text-secondary'>Approved Leaves</p>
                                        </div>
                                    </div>

                                </div>
                                <div className='col-lg-3'>
                                    <div className='card'
                                        style={rejectedleave ? { backgroundColor: "lightgreen", cursor: 'pointer' } : { cursor: 'pointer' }}
                                        onClick={() => {
                                            setAllLeave(false);
                                            setPendingLeave(false);
                                            setApprovedLeave(false);
                                            setRejectedLeave(true);
                                        }}>
                                        <div className='card-body'>
                                            <p className='fs-4 fw-bold text-secondary'>Rejected Leaves</p>
                                        </div>
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
                                        <th className='vertical-row-color' scope="col">|</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>

                                {allleave ? (
                                    <tbody>
                                        {currentRecords.map((item, i) => {
                                            return (
                                                <tr key={i}>
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
                                                    <td className='vertical-row-color'>|</td>
                                                    <td><FaEdit style={{ width: 50, height: 30, cursor: 'pointer' }}
                                                        onClick={() => {
                                                            handleEditStatus(item._id);
                                                        }} /><span className='vertical-row-color'>|</span> <AiFillDelete style={{ width: 50, height: 30, cursor: 'pointer' }}
                                                            onClick={() => {
                                                                DeleteLeaves(item._id);
                                                            }} /></td>
                                                    <Modal show={editstatus === item._id ? true : false} onHide={handleClose}>
                                                        <EditLeave leavelist={item} />
                                                    </Modal>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                ) : null}

                                {pendingleave ? (
                                    <tbody>
                                        {pendingRecords.map((item, i) => {
                                            return (
                                                <tr key={i}>
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
                                                    <td className='vertical-row-color'>|</td>
                                                    <td><FaEdit style={{ width: 50, height: 30, cursor: 'pointer' }}
                                                        onClick={() => {
                                                            handleEditStatus(item._id);
                                                        }} /><span className='vertical-row-color'>|</span> <AiFillDelete style={{ width: 50, height: 30, cursor: 'pointer' }}
                                                            onClick={() => {
                                                                DeleteLeaves(item._id);
                                                            }} /></td>
                                                    <Modal show={editstatus === item._id ? true : false} onHide={handleClose}>
                                                        <EditLeave leavelist={item} />
                                                    </Modal>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                ) : null}

                                {approvedleave ? (
                                    <tbody>
                                        {approvedRecords.map((item, i) => {
                                            return (
                                                <tr key={i}>
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
                                                    <td className='vertical-row-color'>|</td>
                                                    <td><FaEdit style={{ width: 50, height: 30, cursor: 'pointer' }}
                                                        onClick={() => {
                                                            handleEditStatus(item._id);
                                                        }} /><span className='vertical-row-color'>|</span> <AiFillDelete style={{ width: 50, height: 30, cursor: 'pointer' }}
                                                            onClick={() => {
                                                                DeleteLeaves(item._id);
                                                            }} /></td>
                                                    <Modal show={editstatus === item._id ? true : false} onHide={handleClose}>
                                                        <EditLeave leavelist={item} />
                                                    </Modal>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                ) : null}

                                {rejectedleave ? (
                                    <tbody>
                                        {rejectedRecords.map((item, i) => {
                                            return (
                                                <tr key={i}>
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
                                                    <td className='vertical-row-color'>|</td>
                                                    <td><FaEdit style={{ width: 50, height: 30, cursor: 'pointer' }}
                                                        onClick={() => {
                                                            handleEditStatus(item._id);
                                                        }} /><span className='vertical-row-color'>|</span> <AiFillDelete style={{ width: 50, height: 30, cursor: 'pointer' }}
                                                            onClick={() => {
                                                                DeleteLeaves(item._id);
                                                            }} /></td>
                                                    <Modal show={editstatus === item._id ? true : false} onHide={handleClose}>
                                                        <EditLeave leavelist={item} />
                                                    </Modal>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                ) : null}
                            </table>

                            {allleave && currentRecords.length === 0 ?
                                <div className='text-center'>
                                    <img src={NoRecord} alt='NoRecord' className='w-10' />
                                </div>
                                : null}
                            {pendingleave && pendingRecords.length === 0 ?
                                <div className='text-center'>
                                    <img src={NoRecord} alt='NoRecord' className='w-10' />
                                </div>
                                : null}
                            {approvedleave && approvedRecords.length === 0 ?
                                <div className='text-center'>
                                    <img src={NoRecord} alt='NoRecord' className='w-10' />
                                </div>
                                : null}
                            {rejectedleave && rejectedRecords.length === 0 ?
                                <div className='text-center'>
                                    <img src={NoRecord} alt='NoRecord' className='w-10' />
                                </div>
                                : null}
                        </div>
                    </div>
                </div>
                

                {allleave && currentRecords.length > 0 ?
                    <div className='d-flex'>
                        <div className="p-2 w-100 fs-6 fw-bold text-secondary">
                        Showing {indexOfFirstRecord+1} to {currentPage === allPages ? totalrecords: indexOfLastRecord}  of {totalrecords} records
                        </div>
                        <div className="p-2 flex-shrink-1">
                            <Pagination
                                nPages={allPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            /></div>

                    </div>
                    : null}

                {pendingleave && pendingRecords.length > 0 ?
                    <div className='d-flex'>
                        <div className="p-2 w-100 fs-6 fw-bold text-secondary">
                        Showing {indexOfFirstRecord+1} to {currentPage === pendingPages ? pendingleaves.length: indexOfLastRecord}  of {pendingleaves.length} records
                        </div>
                        <div className="p-2 flex-shrink-1">
                            <Pagination
                                nPages={pendingPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            /></div>

                    </div>
                    : null}

                {approvedleave && approvedRecords.length > 0 ?
                    <div className='d-flex'>
                        <div className="p-2 w-100 fs-6 fw-bold text-secondary">
                        Showing {indexOfFirstRecord+1} to {currentPage === approvedPages ? approvedleaves.length: indexOfLastRecord}  of {approvedleaves.length} records
                        </div>
                        <div className="p-2 flex-shrink-1">
                            <Pagination
                                nPages={approvedPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            /></div>

                    </div>
                    : null}

                {rejectedleave && rejectedRecords.length > 0 ?
                    <div className='d-flex'>
                        <div className="p-2 w-100 fs-6 fw-bold text-secondary">
                        Showing {indexOfFirstRecord+1} to {currentPage === rejectedPages ? rejectedleaves.length: indexOfLastRecord}  of {rejectedleaves.length} records
                        </div>
                        <div className="p-2 flex-shrink-1">
                            <Pagination
                                nPages={rejectedPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            /></div>

                    </div>
                    : null}
            </div>
        </>
    );
}

export default AllLeaves
