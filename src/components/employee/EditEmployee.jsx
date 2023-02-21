import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { editEmployee } from "../../postdata/postdata";
import { getProjects, getEmployeeDetail } from "../../getdata/getdata";
import { headers } from "../../header";

const EditEmployee = ({data, id, project}) => {
    const [editemployee, setEditEmployee] = useState({
        name: data.name,
        email: data.email,
        assignedProject: project
    })

    const [projectlist, setProjectList] = useState([]);
    const [projectname, setProjectName] = useState('')

console.log(data.assignedProject)
console.log(id);
    console.log(editemployee.assignedProject);

    useEffect(() => {

        getEmployeeDetail(id, headers)
        .then((response) => {
            if(data.assignedProject === null)
            {
                setProjectName("Bench");
            }
            console.log(response.data.data.assignedProject[0].name)
            setProjectName(response.data.data.assignedProject[0].name)
        })
        .catch((error) => {
            console.log(error);
        })

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
        if(editemployee.assignedProject === "Bench")
        {
        editemployee.assignedProject = null;
        editEmployee(id, editemployee, headers)
        .then((response) => {
            alert(response.data.message)
            window.location.reload(false)
        })
        .catch((error) => {
            console.log(error);
        })
    }
    else{
        editEmployee(id, editemployee, headers)
        .then((response) => {
            alert(response.data.message)
            window.location.reload(false)
        })
        .catch((error) => {
            console.log(error);
        })
    }}

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
                    <div className="mb-3">
                        <p className="text-start">Project Assigned</p>
                        <select className="form-select w-100" name="assignedProject"   
                         value={editemployee.assignedProject} onChange={handleChange} required>
                            <option value={editemployee.assignedProject}>{editemployee.assignedProject}</option>
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

export default EditEmployee