import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { addEmployee } from "../../postdata/postdata";
import { getProjects } from "../../getdata/getdata";
import { headers } from "../../header";
import Multiselect from "multiselect-react-dropdown";

const AddEmployee = ({handleClose}) => {
    const [addemployee, setAddEmployee] = useState({
        employeeName: "",
        email: "",
        assignedProject: ""
    })
    const [projectlist, setProjectList] = useState([]);

    const [projectname, setProjectName] = useState([]);

    const options = projectlist.map((item) => {
        return item.name
    })

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
        setAddEmployee({
            ...addemployee,
            [event.target.name]: event.target.value
        })
    }

    const AddEmployee = (event) => {
        event.preventDefault();
        if(addemployee.assignedProject === "Bench")
        {
            addemployee.assignedProject = null;
            addEmployee(addemployee, headers)
            .then((response) => {
                alert(response.data.message)
                handleClose();
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
        }
        else{
        addEmployee(addemployee, headers)
            .then((response) => {
                alert(response.data.message)
                window.location.reload(false)
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
    }}

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
                            onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <p className="text-start">Email Address</p>
                        <input type="email" className="form-control w-100" id="email" name="email" placeholder="Email Address"
                            onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <p className="text-start">Project Assigned</p>
                        <select className="form-input-width form-select w-100" name="assignedProject" aria-label="Default select example" onChange={handleChange} required>
                            <option value="">Select Project</option>
                            {projectlist.map((item) => {
                                return (
                                    <option value={item._id}>{item.name}</option>
                                )
                            })}
                            <option value="Bench">Bench</option>

                        </select>
                    </div>
                    {/* <Multiselect
                    
                    isObject = {false}
                    options = {options}
                    onSelect = {(event) => {
                        setProjectName(event)
                    console.log(projectname)}}
                    onRemove = {(event) => {
                        setProjectName(event)
                    console.log(projectname)}}
                    showCheckbox
                    /> */}
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