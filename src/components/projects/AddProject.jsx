import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { addProject } from "../../postdata/postdata";
import { headers } from "../../header";

const AddProject = ({handleClose}) => {
    const [addproject, setAddProject] = useState({
        name: "",
        startAt: "",
        endAt: "",
        clientName: "",
        clientPhoneNumber: "",
        clientEmail: ""
    })

    const handleChange = (event) => {
        setAddProject({
            ...addproject,
            [event.target.name]: event.target.value
        })
    }

    const AddProject = (event) => {
        event.preventDefault();
        addProject(addproject, headers)
            .then((response) => {
                alert(response.data.message)
                handleClose();
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Add Project</Modal.Title>
            </Modal.Header>
            <form onSubmit={AddProject}>
                <Modal.Body>

                    <div className="mb-3">
                        <p className="text-start">Project Name</p>
                        <input type="text" className="form-control w-100" id="name" name="name" placeholder="Project Name"
                            onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <p className="text-start">Project Start Date</p>
                        <input type="date" className="form-control w-100" id="startAt" name="startAt" 
                            onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <p className="text-start">Project End Date</p>
                        <input type="date" className="form-control w-100" id="endAt" name="endAt" 
                            onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-start">Client Name</p>
                        <input type="text" className="form-control w-100" id="clientName" name="clientName" placeholder="Client Name"
                            onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <p className="text-start">Client's Contact No.</p>
                        <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" className="form-control w-100" id="clientPhoneNumber" 
                        name="clientPhoneNumber" placeholder="Client's Contact No." onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-start">Client's Email Address</p>
                        <input type="email" className="form-control w-100" id="clientEmail" name="clientEmail" placeholder="Client's Email Address"
                            onChange={handleChange} required />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Add Project
                    </Button>
                </Modal.Footer>
            </form>
        </>
    );
}

export default AddProject;