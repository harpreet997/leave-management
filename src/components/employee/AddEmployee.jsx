import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { addEmployee } from "../../postdata/postdata";
import { headers } from "../../header";

const AddEmployee = () => {
    const [addemployee, setAddEmployee] = useState({
        employeeName: "",
        email: ""
    })

    const handleChange = (event) => {
        setAddEmployee({
            ...addemployee, 
            [event.target.name]: event.target.value
        })
    }

    const AddEmployee = (event) => {
        event.preventDefault();
        addEmployee(addemployee, headers)
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
                <Modal.Title className="text-center">Add Employee</Modal.Title>
            </Modal.Header>
            <form onSubmit={AddEmployee}>
                <Modal.Body>

                <div className="mb-3">
                        <p className="text-start">Employee Name</p>
                        <input type="text" className="form-control w-100" id="employeeName" name="employeeName" placeholder="Employee Name"
                        onChange={handleChange} required/>
                    </div>

                    <div className="mb-3">
                        <p className="text-start">Email Address</p>
                        <input type="email" className="form-control w-100" id="email" name="email" placeholder="Email Address"
                        onChange={handleChange} required/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Add Employee
                    </Button>
                </Modal.Footer>
            </form>
        </>
    );
}

export default AddEmployee;