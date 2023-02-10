import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import '../../styles/dashboard.css';

const ApplyLeave = () => {
    return (
        <>
            <Sidebar />
            <div className="content">
                <div className="card">
                    <div className="card-body">
                        <h3>Apply Leave</h3>
                        <form >
                            <div className="mb-3">
                                <p className="text-start">Employee Name</p>
                                <input type="text" className="form-control w-50" id="email" name="email" placeholder="Enter Employee Name"
                                    required />
                            </div>
                            <div className="mb-3">
                            <p className="text-start">Leave Type</p>
                            <select class="form-select w-50" aria-label="Default select example" required>
                                <option value="">Select Leave Type</option>
                                <option value="1">Sick Leave</option>
                                <option value="2">Casual Leave</option>
                            </select>
                            </div>
                            <div className="mb-3">
                                <p className="text-start">From Date</p>
                                <input type="date" className="form-control w-50" id="fromDate" name="fromDate"
                                    required />
                            </div>

                            <div className="mb-3">
                                <p className="text-start">To Date</p>
                                <input type="date" className="form-control w-50" id="toDate" name="toDate"
                                    required />
                            </div>
                            <div className="mb-3">
                                <p className="text-start">Reason of Leave</p>
                                <textarea className="form-control" id="reasonLeave" name="reasonLeave" rows="3"></textarea>
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
