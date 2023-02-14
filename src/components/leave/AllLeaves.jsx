import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { Modal } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa';
import {AiFillDelete} from 'react-icons/ai';
import EditLeave from './EditLeave';
import Pagination from '../pagination/Pagination';
import { getAllLeaves } from '../../getdata/getdata';
import { deleteLeave } from '../../postdata/postdata';
import '../../styles/dashboard.css';

const AllLeaves = () => {
    const [editstatus, setEditStatus] = useState(false);
    const [leavelist, setLeaveList] = useState([]);
    const [status, setStatus] = useState();

    const [message, setMessage] = useState(true);

    const filterdata = leavelist.filter(item => {
        if (status === 'All') {
            return item;
        }
        return item.status === status;
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filterdata.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(filterdata.length / recordsPerPage);

    console.log(filterdata)


    useEffect(() => {
        getAllLeaves()
            .then((response) => {
                setLeaveList(response.data.data);
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
                        <div className='d-flex'>
                            <h3>ALL Leaves</h3>
                            <select className="ms-4  w-20" name="status"
                                onChange={(event) => {
                                    setStatus(event.target.value);
                                    setMessage(false);
                                }} >
                                <option value="0">Select Status</option>
                                <option value="All">All</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
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
                                <tbody>
                                    {currentRecords.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                {/* <td>{i + 1}</td> */}
                                                <td>{item.employeeName}</td>
                                                <td style={{color: 'lightgray'}}>|</td>
                                                <td>{item.leaveType}</td>
                                                <td style={{color: 'lightgray'}}>|</td>
                                                <td>{item.fromDate.substring(0, 10)}</td>
                                                <td style={{color: 'lightgray'}}>|</td>
                                                <td>{item.toDate.substring(0, 10)}</td>
                                                <td style={{color: 'lightgray'}}>|</td>
                                                <td>{item.status}</td>
                                                <td style={{color: 'lightgray'}}>|</td>
                                                <td>{item.reason}</td>
                                                <td style={{color: 'lightgray'}}>|</td>
                                                <td><FaEdit style={{ width: 50, height: 30, cursor: 'pointer' }}
                                                    onClick={() => {
                                                        handleEditStatus(item._id);
                                                    }} /><span className='vertical-row-color'>|</span> <AiFillDelete style={{ width: 50, height: 30, cursor: 'pointer' }} 
                                                    onClick={() => {
                                                        DeleteLeaves(item._id);
                                                    }}/></td>
                                                <Modal show={editstatus === item._id ? true : false} onHide={handleClose}>
                                                    <EditLeave leavelist={item} />
                                                </Modal>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                {message || status === '0' ? <p className='fs-5 fw-bold'>Note : Please select the status to view the records.</p> : null}
                            </table>
                            <Pagination
                                nPages={nPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllLeaves
