import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { Modal } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import Pagination from '../pagination/Pagination';
import NoRecord from '../../assets/NoRecord.png';
import AddEmployee from './AddEmployee';
import { getEmployees, getEmployeeDetail } from '../../getdata/getdata';
import { deleteEmployee } from '../../postdata/postdata';
import { headers } from '../../header';
import EditEmployee from './EditEmployee';
import '../../styles/dashboard.css';

const EmployeeList = () => {
    const [addemployee, setAddEmployee] = useState(false);
    const [editemployee, setEditEmployee] = useState(false);
    const [employeelist, setEmployeeList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = employeelist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(employeelist.length / recordsPerPage);
    const [projectname, setProjectName] = useState('')
    

    useEffect(() => {
        getEmployees(headers)
            .then((response) => {
                console.log(response.data.data);
                setEmployeeList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    

    const AddEmployeeModal = () => {
        setAddEmployee(true)
    };

    const EditEmployeeModal = (id) => {
        setEditEmployee(id)
    };


    const DeleteEmployee = (id) => {
        deleteEmployee(id, headers)
            .then((response) => {
                alert(response.data.message);
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const ViewEmployee = (id) => {
        getEmployeeDetail(id, headers)
            .then((response) => {
                if (response.data.data.assignedProject === null) {
                    setProjectName("Bench");
                }
                console.log(response.data.data.assignedProject[0].name)
                setProjectName(response.data.data.assignedProject[0].name)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const handleClose = () => setAddEmployee(false);
    const handleEditClose = () => setEditEmployee(false);
    return (
        <>
            <Sidebar />
            <div className="content">
                <div className="card">
                    <div className="card-body">
                        <div className='d-flex'>
                            <div className="p-2 w-100 fs-4 fw-bold text-secondary">
                                Employees List
                            </div>
                            <div className="p-2 flex-shrink-1">
                                <button className='btn btn-primary' onClick={AddEmployeeModal}>Add Employee</button>
                            </div>
                            <Modal show={addemployee} onHide={handleClose}>
                                <AddEmployee />
                            </Modal>
                        </div>

                        <div className='scroll'>
                            {currentRecords.length > 0 ?
                                (
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Employee Name</th>
                                                <th className='vertical-row-color' scope="col">|</th>
                                                <th scope="col">Email Address</th>
                                                <th className='vertical-row-color' scope="col">|</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>


                                        <tbody>
                                            {currentRecords.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className='text-capitalize'>{item.name}</td>
                                                        <td className='vertical-row-color'>|</td>
                                                        <td>{item.email}</td>
                                                        <td className='vertical-row-color'>|</td>
                                                        <td><FaEdit style={{ width: 50, height: 30, cursor: 'pointer' }}
                                                            onClick={() => {
                                                                EditEmployeeModal(item._id);
                                                                ViewEmployee(item._id);
                                                            }} /><span className='vertical-row-color'>|</span> <AiFillDelete style={{ width: 50, height: 30, cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    DeleteEmployee(item._id);
                                                                }} /></td>
                                                        <Modal show={editemployee === item._id ? true : false} onHide={handleEditClose}>
                                                            <EditEmployee data={item} id={item._id} project={projectname} />
                                                        </Modal>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                ) :
                                <div className='text-center'>
                                    <img src={NoRecord} alt='NoRecord' className='mt-4 w-10' />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {currentRecords.length > 0 ?
                    (
                        <div className='d-flex'>
                            <div className="p-2 w-100 fs-6 fw-bold text-secondary">
                                Displaying {currentPage} to {currentRecords.length}  of {currentRecords.length} records
                            </div>
                            <div className="p-2 flex-shrink-1">
                            <Pagination
                                nPages={nPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                            </div>
                        </div>
                    ) : null}
            </div>
        </>
    );
}

export default EmployeeList
