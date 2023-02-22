import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { Modal } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import Pagination from '../pagination/Pagination';
import NoRecord from '../../assets/NoRecord.png';
import AddProject from './AddProject';
import { getProjects } from '../../getdata/getdata';
import { deleteProject } from '../../postdata/postdata';
import { headers } from '../../header';
import EditProject from './EditProject';
import '../../styles/dashboard.css';

const ProjectList = () => {
    const [addproject, setAddProject] = useState(false);
    const [editproject, setEditProject] = useState(false);
    const [projectlist, setProjectList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = projectlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(projectlist.length / recordsPerPage);
    const [totalrecords, setTotalRecords] = useState(0);

    useEffect(() => {
        getProjects(headers)
            .then((response) => {
                setProjectList(response.data.data);
                setTotalRecords(response.data.data.length)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const AddProjectModal = () => {
        setAddProject(true)
    };

    const EditProjectModal = (id) => {
        setEditProject(id)
    };


    const DeleteEmployee = (id) => {
        deleteProject(id, headers)
            .then((response) => {
                alert(response.data.message);
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const handleClose = () => setAddProject(false);
    const handleEditClose = () => setEditProject(false);
    return (
        <>
            <Sidebar />
            <div className="content">
                <div className="card">
                    <div className="card-body">
                        <div className='d-flex'>
                            <div className="p-2 w-100 fs-4 fw-bold text-secondary">
                                Projects List
                            </div>
                            <div className="p-2 flex-shrink-1">
                                <button className='btn btn-primary' onClick={AddProjectModal}>Add Project</button>
                            </div>
                            <Modal show={addproject} onHide={handleClose}>
                                <AddProject />
                            </Modal>
                        </div>

                        <div className='scroll'>
                            {currentRecords.length > 0 ?
                                (
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Project Name</th>
                                                <th className='vertical-row-color' scope="col">|</th>
                                                <th scope="col">Client Name</th>
                                                <th className='vertical-row-color' scope="col">|</th>
                                                <th scope="col">Client's Contact No.</th>
                                                <th className='vertical-row-color' scope="col">|</th>
                                                <th scope="col">Client's Email Address</th>
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
                                                        <td>{item.clientName}</td>
                                                        <td className='vertical-row-color'>|</td>
                                                        <td>{item.clientPhoneNumber}</td>
                                                        <td className='vertical-row-color'>|</td>
                                                        <td>{item.clientEmail}</td>
                                                        <td className='vertical-row-color'>|</td>
                                                        <td><FaEdit style={{ width: 50, height: 30, cursor: 'pointer' }}
                                                            onClick={() => {
                                                                EditProjectModal(item._id);
                                                            }} /><span className='vertical-row-color'>|</span> <AiFillDelete style={{ width: 50, height: 30, cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    DeleteEmployee(item._id);
                                                                }} /></td>
                                                        <Modal show={editproject === item._id ? true : false} onHide={handleEditClose}>
                                                            <EditProject data={item} id={item._id}/>
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
                            Showing {indexOfFirstRecord+1} to {currentPage === nPages ? totalrecords: indexOfLastRecord}  of {totalrecords} records
                            </div>
                            <div className="p-2 flex-shrink-1">
                                <Pagination
                                    nPages={nPages}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                /></div>

                        </div>
                    ) : null}
            </div>
        </>
    );
}

export default ProjectList
