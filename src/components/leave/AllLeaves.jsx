import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { Modal, Button } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa';
import '../../styles/dashboard.css';

const AllLeaves = () => {
    const [editstatus, setEditStatus] = useState(false);

    const handleEditStatus = () => {
        setEditStatus(true)
    };

    const handleClose = () => setEditStatus(false);
    return (
        <>
            <Sidebar />
            <div className="content">

                <div className="card">
                    <div className="card-body">
                        <h3>ALL Leaves</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Employee Name</th>
                                    <th scope="col">Leave Type</th>
                                    <th scope="col">From Date</th>
                                    <th scope="col">To Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Edit Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Suresh</td>
                                    <td>Casual Leave</td>
                                    <td>10-02-2023</td>
                                    <td>10-02-2023</td>
                                    <td>Pending</td>
                                    <td><FaEdit style={{ marginLeft: 20, width: 50, height: 30, cursor: 'pointer' }}
                                        onClick={handleEditStatus} /></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Mukesh</td>
                                    <td>Casual Leave</td>
                                    <td>10-02-2023</td>
                                    <td>10-02-2023</td>
                                    <td>Pending</td>
                                    <td><FaEdit style={{ marginLeft: 20, width: 50, height: 30, cursor: 'pointer' }}
                                        onClick={handleEditStatus} /></td>
                                </tr>
                            </tbody>
                            <Modal show={editstatus} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title className="text-white" style={{ paddingLeft: 160 }}>Edit Leave Status</Modal.Title>
                                </Modal.Header>
                                <form >
                                    <Modal.Body>

                                        <div className="mb-3">
                                            <p className="text-start">Employee Name</p>
                                            <input type="email" className="form-control w-100" id="employeeName" name="employeeName"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-start">Leave Type</p>
                                            <input type="text" className="form-control w-100" id="leaveType" name="leaveType"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-start">From Date</p>
                                            <input type="date" className="form-control w-100" id="fromDate" name="fromDate"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-start">To Date</p>
                                            <input type="date" className="form-control w-100" id="toDate" name="toDate"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-start">Leave Status</p>
                                            <select class="form-select w-100" aria-label="Default select example" required>
                                                <option value="">Leave Status</option>
                                                <option value="1">Active</option>
                                                <option value="2">Pending</option>
                                                <option value="2">Rejected</option>
                                            </select>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" variant="primary">
                                            Update Status
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Modal>
                        </table>

                    </div>
                </div>
            </div>
        </>
    );
}

export default AllLeaves
