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
    const [editstatus, setEditStatus] = useState(false);
    const [leavelist, setLeaveList] = useState([]);
    const [status, setStatus] = useState('All');
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

                                }} >
                                <option value="All">All</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div className='scroll'>
                            {currentRecords.length > 0 ?
                                (
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
                                    </table>
                                ) : 
                                <div className='text-center'>
                                <img src={NoRecord} alt='NoRecord' className='mt-4 w-10'/>
                                </div>
                                }


                            
                        </div>
                    </div>
                </div>
                {currentRecords.length > 0 ?
                                (
                                    <div className='d-flex'>
                                        <div className="p-2 w-100 fs-6 fw-bold text-secondary">
                                            Displaying {currentPage} to {currentRecords.length}  of {currentRecords.length} records
                                        </div>
                                        <div className="p-2 flex-shrink-1">
                                            <Pagination
                                                nPages={nPages}
                                                currentPage={currentPage}
                                                setCurrentPage={setCurrentPage}
                                            /></div>

                                    </div>
                                ) : null}
            </div>
        </>
    );
}

export default AllLeaves
