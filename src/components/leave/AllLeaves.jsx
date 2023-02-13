import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { Modal } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa';
import '../../styles/dashboard.css';
import axios from 'axios';
import EditLeave from './EditLeave';
import Pagination from '../pagination/Pagination';

const AllLeaves = () => {
    const [editstatus, setEditStatus] = useState(false);
    const [leavelist, setLeaveList] = useState([]);
    const [status, setStatus] = useState();

    const filterdata = leavelist.filter(item => {
        if(status === 'All')
        {
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
        axios.post('https://db66-2401-4900-1c19-5e6d-e173-3e63-35f5-4011.in.ngrok.io/api/v1/leave/list')
            .then((response) => {
                console.log(response.data);
                setLeaveList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleEditStatus = (id) => {
        setEditStatus(id)
    };

    


    const handleClose = () => setEditStatus(false);
    return (
        <>
            <Sidebar />
            <div className="content">

                <div className="card">
                    <div className="card-body">
                        <h3>ALL Leaves</h3>
                        <div className='scroll'>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        {/* <th scope="col">S.No</th> */}
                                        <th scope="col">Employee Name</th>
                                        <th scope="col">Leave Type</th>
                                        <th scope="col">From Date</th>
                                        <th scope="col">To Date</th>
                                        <th scope="col"><select className="w-100" name="status" 
                                        onChange={(event) => setStatus(event.target.value)} >
                                            <option value="">Select Status</option>
                                            <option value="All">All</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Rejected">Rejected</option>
                                        </select></th>
                                        <th scope="col">Reason</th>
                                        <th scope="col">Edit Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRecords.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                {/* <td>{i + 1}</td> */}
                                                <td>{item.employeeName}</td>
                                                <td>{item.leaveType}</td>
                                                <td>{item.fromDate.substring(0, 10)}</td>
                                                <td>{item.toDate.substring(0, 10)}</td>
                                                <td>{item.status}</td>
                                                <td>{item.reason}</td>
                                                <td><FaEdit style={{ marginLeft: 20, width: 50, height: 30, cursor: 'pointer' }}
                                                    onClick={() => {
                                                        handleEditStatus(item._id);
                                                    }} /></td>
                                                <Modal show={editstatus === item._id ? true : false} onHide={handleClose}>
                                                    <EditLeave leavelist={item} />
                                                </Modal>
                                            </tr>
                                        )
                                    })}


                                </tbody>

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
