import React, { useEffect, useState } from 'react';
import { getEmployeeProjectsDetails } from '../../getdata/getdata';
import { headers } from '../../header';
import Pagination from '../pagination/Pagination';
import NoRecord from '../../assets/NoRecord.png';
import '../../styles/dashboard.css';


const ProjectDetails = () => {
    const [assignedproject, setAssignedProject] = useState(true);
    const [unassignedproject, setUnassignedProject] = useState(false);
    
    const [assignedprojectlist, setAssignedProjectlist] = useState([]);
    const [unassignedprojectlist, setUnassignedProjectlist] = useState([]);
    

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const assignedRecords = assignedprojectlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const unassignedRecords = unassignedprojectlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const assignedPages = Math.ceil(assignedprojectlist.length / recordsPerPage);
    const unassignedPages = Math.ceil(unassignedprojectlist.length / recordsPerPage);
    

    useEffect(() => {
        getEmployeeProjectsDetails(headers)
            .then((response) => {
                console.log(response.data);
                setAssignedProjectlist(response.data.assignedProjectEmployee);
                setUnassignedProjectlist(response.data.unassignedEmployee);
               
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);



    return (
            <div>
                <div className="card mt-1">
                    <div className="card-body">
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <div className='card' style={assignedproject ? { backgroundColor: "lightgreen", cursor: 'pointer' } : { cursor: 'pointer' }}
                                    onClick={() => {
                                        setAssignedProject(true);
                                        setUnassignedProject(false);
                                    }} >
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <div className="p-2 w-100 fs-4 fw-bold text-secondary">On Project</div>
                                            <div className="p-2 fs-1 fw-bold text-secondary flex-shrink-1">0{assignedprojectlist.length}</div>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='card' style={unassignedproject ? { backgroundColor: "lightgreen", cursor: 'pointer' } : { cursor: 'pointer' }} onClick={() => {
                                    setUnassignedProject(true);
                                    setAssignedProject(false);
                                    
                                }}>
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <div className="p-2 w-100 fs-4 fw-bold text-secondary">On Bench</div>
                                            <div className="p-2 fs-1 fw-bold text-secondary flex-shrink-2">0{unassignedprojectlist.length}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            

                            <div className='scroll'>

                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Employee Name</th>
                                            <th className='vertical-row-color' scope="col">|</th>
                                            <th scope="col">Project Assigned</th>         
                                        </tr>
                                    </thead>
                                    {assignedproject ? (
                                        <tbody>
                                            {assignedRecords.map((item) => {
                                                return (
                                                    <tr>
                                                        <td style={{ textTransform: "capitalize" }}>{item.name}</td>
                                                        <td className='vertical-row-color'>|</td>
                                                        <td>{item.assignedProject[0].name}</td>
                                                    </tr>
                                                )
                                            })}


                                        </tbody>

                                    ) : null}

                                    {unassignedproject ? (
                                        <tbody>
                                            {unassignedRecords.map((item) => {
                                                return (
                                                    <tr>
                                                        <td style={{ textTransform: "capitalize" }}>{item.name}</td>
                                                        <td className='vertical-row-color'>|</td>
                                                        <td>{item.assignedProject === null ? "No Project Assigned": null}</td>    
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    ) : null}

                                    
                                </table>

                                {assignedproject && assignedRecords.length === 0 ?
                                    <div className='text-center'>
                                        <img src={NoRecord} alt='NoRecord' className='w-10' />
                                    </div>
                                    : null}
                                {unassignedproject && unassignedRecords.length === 0 ?
                                    <div className='text-center'>
                                        <img src={NoRecord} alt='NoRecord' className='w-10' />
                                    </div>
                                    : null}
                                
                            </div>
                        </div>
                    </div>
                </div>

                {assignedproject && assignedRecords.length > 0 ?
                    <div className='d-flex'>
                        <div className="p-2 w-100 fs-6 fw-bold text-secondary">
                        Showing {indexOfFirstRecord+1} to {currentPage === assignedPages ? assignedprojectlist.length: indexOfLastRecord}  of {assignedprojectlist.length} records
                        </div>
                        <div className="p-2 flex-shrink-1">
                            <Pagination
                                nPages={assignedPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            /></div>

                    </div>
                    : null}

                {unassignedproject && unassignedRecords.length > 0 ?
                    <div className='d-flex'>
                        <div className="p-2 w-100 fs-6 fw-bold text-secondary">
                        Showing {indexOfFirstRecord+1} to {currentPage === unassignedPages ? unassignedprojectlist.length: indexOfLastRecord}  of {unassignedprojectlist.length} records
                        </div>
                        <div className="p-2 flex-shrink-1">
                            <Pagination
                                nPages={unassignedPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            /></div>

                    </div>
                    : null}
            </div>
        
    );
}

export default ProjectDetails;
