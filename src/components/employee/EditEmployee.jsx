import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { editEmployee } from "../../postdata/postdata";
import { headers } from "../../header";

const EditEmployee = ({data, id}) => {
    const [editemployee, setEditEmployee] = useState({
        name: data.name,
        email: data.email,
        
    })

    const handleChange = (event) => {
        setEditEmployee({
            ...editemployee, 
            [event.target.name]: event.target.value
        })
    }

    const UpdateEmployee = (event) => {
        event.preventDefault();
        editEmployee(id, editemployee, headers)
        .then((response) => {
            alert(response.data.message)
            window.location.reload(false)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleClose = () => {
        window.location.reload(false);
    }
    
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Edit Employee</Modal.Title>
            </Modal.Header>
            <form onSubmit={UpdateEmployee}>
                <Modal.Body>

                <div className="mb-3">
                        <p className="text-start">Employee Name</p>
                        <input type="text" className="text-capitalize form-control w-100" id="name" name="name" placeholder="Employee Name"
                        value={editemployee.name} onChange={handleChange} required/>
                    </div>

                    <div className="mb-3">
                        <p className="text-start">Email Address</p>
                        <input type="email" className="form-control w-100" id="email" name="email" placeholder="Email Address"
                        value={editemployee.email} onChange={handleChange} required/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Update Employee
                    </Button>
                </Modal.Footer>
            </form>
        </>
    );
}

export default EditEmployee;