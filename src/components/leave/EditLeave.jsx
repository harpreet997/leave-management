import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { editLeave } from "../../postdata/postdata";
import '../../styles/dashboard.css';

const EditLeave = ({ leavelist }) => {
    const [editleavedata, setEditLeavedata] = useState({
        employeeName: leavelist.employeeName,
        reason: leavelist.reason,
        leaveType: leavelist.leaveType,
        fromDate: leavelist.fromDate.substring(0, 10),
        toDate: leavelist.toDate.substring(0, 10),
        status: leavelist.status,
        _id: leavelist._id
    });

    const handleChange = (event) => {
        setEditLeavedata({
            ...editleavedata,
            [event.target.name]: event.target.value
        })
    }

    const handleClose = () => {
        window.location.reload(false);
    }

    const UpdateStatus = (event) => {
        event.preventDefault();
        editLeave(editleavedata._id, editleavedata)
            .then((response) => {
                alert(response.data.message);
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Edit Leave Status</Modal.Title>
            </Modal.Header>
            <form onSubmit={UpdateStatus}>
                <Modal.Body>
                    <div className="mb-3">
                        <p className="text-start">Employee Name</p>
                        <input type="email" className="text-capitalize form-control w-100" id="employeeName" name="employeeName" 
                            value={editleavedata.employeeName} readOnly />
                    </div>
                    <div className="mb-3">
                        <p className="text-start">Leave Type</p>
                        <input type="text" className="form-control w-100" id="leaveType" name="leaveType"
                            value={editleavedata.leaveType} readOnly />
                    </div>
                    <div className="mb-3">
                        <p className="text-start">From Date</p>
                        <input type="date" className="form-control w-100" id="fromDate" name="fromDate"
                            value={editleavedata.fromDate} readOnly />
                    </div>
                    <div className="mb-3">
                        <p className="text-start">To Date</p>
                        <input type="date" className="form-control w-100" id="toDate" name="toDate"
                            value={editleavedata.toDate} readOnly />
                    </div>
                    <div className="mb-3">
                        <p className="text-start">Leave Status</p>
                        <select class="form-select w-100" name="status" aria-label="Default select example" value={editleavedata.status}
                            onChange={handleChange} required>
                            <option value="">Leave Status</option>
                            <option value="Approved">Approved</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <p className="text-start">Remarks</p>
                        <textarea className="form-control" id="remarks" name="remarks" rows="3"></textarea>
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
        </>
    );
}

export default EditLeave;