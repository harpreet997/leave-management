import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { editEmployee } from "../../postdata/postdata";
import { getProjects } from "../../getdata/getdata";
import { headers } from "../../header";

const EditEmployee = ({ data, id, project, projectid, handleEditClose }) => {
    const [editemployee, setEditEmployee] = useState({
        name: data.name,
        email: data.email,
    })
    const [projectlist, setProjectList] = useState([]);
    const [projectName, setProjectName] = useState(project)
    const [projectId, setProjectId] = useState(projectid)
    console.log(project)
    console.log(projectName);
    console.log(projectId)

    useEffect(() => {
        getProjects(headers)
            .then((response) => {
                setProjectList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleChange = (event) => {
        setEditEmployee({
            ...editemployee,
            [event.target.name]: event.target.value
        })
    }

    const UpdateEmployee = (event) => {
        event.preventDefault();
        if (projectId === "Bench") {
            const data = {
                name: editemployee.name,
                email: editemployee.email,
                assignedProject: null
            }
            editEmployee(id, data, headers)
                .then((response) => {
                    alert(response.data.message)
                    handleEditClose();
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
        }
        else if(projectName === "Bench"){
            const data = {
                name: editemployee.name,
                email: editemployee.email,
                assignedProject: null
            }
            editEmployee(id, data, headers)
                .then((response) => {
                    alert(response.data.message)
                    window.location.reload(false)
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
        }
        else {
            const data = {
                name: editemployee.name,
                email: editemployee.email,
                assignedProject: projectId
            }
            editEmployee(id, data, headers)
                .then((response) => {
                    alert(response.data.message)
                    window.location.reload(false)
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
        }
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
                            value={editemployee.name} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-start">Email Address</p>
                        <input type="email" className="form-control w-100" id="email" name="email" placeholder="Email Address"
                            value={editemployee.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <p className="text-start">Project Assigned</p>
                        <select className="form-select w-100"
                            value={projectId} onChange={(e) => {
                                
                                setProjectId(e.target.value)
                                setProjectName('')
                            }}>
                            <option value={projectid}>{project}</option>
                            {projectlist.map((item, i) => {
                                return (
                                    <option key={i} value={item._id}>{item.name}</option>
                                )
                            })}
                            <option value="Bench">Bench</option>

                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
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

export default EditEmployee