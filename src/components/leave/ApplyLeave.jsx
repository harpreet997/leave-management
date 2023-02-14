import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { applyLeave } from '../../postdata/postdata';
import '../../styles/dashboard.css';

const ApplyLeave = () => {
    const [leavedata, setLeavedata] = useState({
        employeeName: "",
        reason: "",
        leaveType: "",
        fromDate: "",
        toDate: ""
    });


    const handleChange = (event) => {
        setLeavedata({
            ...leavedata,
            [event.target.name]: event.target.value
        })
    }


    const AddLeave = (event) => {
        event.preventDefault();
        applyLeave(leavedata)
            .then((response) => {
                alert(response.data.message);
                window.location.reload(false);
            }
            )
            .catch((error) => {
                alert(error.response.data.message);
            })
    }

    return (
        <>
            <Sidebar />
            <div className="content">
                <div className="card">
                    <div className="card-body">
                        <h3>Apply Leave</h3>
                        <form onSubmit={AddLeave}>
                            <div className="mb-3">
                                <p className="text-start">Employee Name</p>
                                <input type="text" className="form-control w-50" id="employeeName" name="employeeName" placeholder="Enter Employee Name"
                                    onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <p className="text-start">Leave Type</p>
                                <select className="form-select w-50" name="leaveType" aria-label="Default select example" onChange={handleChange} required>
                                    <option value="">Select Leave Type</option>
                                    <option value="SL">Sick Leave</option>
                                    <option value="CL">Casual Leave</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <p className="text-start">From Date</p>
                                <input type="date" className="form-control w-50" id="fromDate" name="fromDate"
                                    onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <p className="text-start">To Date</p>
                                <input type="date" className="form-control w-50" id="toDate" name="toDate"
                                    onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <p className="text-start">Reason of Leave</p>
                                <textarea className="form-control" id="reason" name="reason" rows="3" onChange={handleChange}></textarea>
                            </div>
                            <div className='text-start'>
                                <button className='btn btn-primary apply-leave-button' type='submit'><p className='fs-4'>Apply Leave</p></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ApplyLeave
