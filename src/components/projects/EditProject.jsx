import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { editProject } from "../../postdata/postdata";
import { headers } from "../../header";

const EditProject = ({data, id, handleEditClose}) => {
    const [editproject, setEditEmployee] = useState({
        name: data.name,
        startAt: data.startAt.substring(0, 10),
        endAt: data.endAt.substring(0, 10),
        clientName: data.clientName,
        clientPhoneNumber: data.clientPhoneNumber,
        clientEmail: data.clientEmail
        
    })

    const handleChange = (event) => {
        setEditEmployee({
            ...editproject, 
            [event.target.name]: event.target.value
        })
    }

    const UpdateProject = (event) => {
        event.preventDefault();
        editProject(id, editproject, headers)
        .then((response) => {
            alert(response.data.message)
            handleEditClose();
        })
        .catch((error) => {
            alert(error.response.data.message);
        })
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Edit Project</Modal.Title>
            </Modal.Header>
            <form onSubmit={UpdateProject}>
                <Modal.Body>

                <div className="mb-3">
                        <p className="text-start">Project Name</p>
                        <input type="text" className="text-capitalize form-control w-100" id="name" name="name" placeholder="Project Name"
                        value={editproject.name} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <p className="text-start">Project Start Date</p>
                        <input type="date" className="form-control w-100" id="startAt" name="startAt" 
                           value={editproject.startAt} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <p className="text-start">Project End Date</p>
                        <input type="date" className="form-control w-100" id="endAt" name="endAt" 
                          value={editproject.endAt}  onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-start">Client Name</p>
                        <input type="name" className="form-control w-100" id="clientName" name="clientName" placeholder="Client Name"
                        value={editproject.clientName} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <p className="text-start">Client's Contact No</p>
                        <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" className="form-control w-100" id="clientPhoneNumber" name="clientPhoneNumber" 
                        placeholder="Email Address" value={editproject.clientPhoneNumber} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <p className="text-start">Client's Email Address</p>
                        <input type="email" className="form-control w-100" id="clientEmail" name="clientEmail" placeholder="Email Address"
                        value={editproject.clientEmail} onChange={handleChange} required/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Update Project
                    </Button>
                </Modal.Footer>
            </form>
        </>
    );
}

export default EditProject;