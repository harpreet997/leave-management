import axios from "axios";
import { baseUrl } from "../baseurl";

export const getAllLeaves = () => {
    return axios.post(`${baseUrl}/api/v1/leave/list`)
}

export const getDashboardLeaves = () => {
    return axios.post(`${baseUrl}/api/v1/leave/dashboard/list`)
}

export const getEmployees = (headers) => {
          return axios.get(`${baseUrl}/api/v1/employee/list`, {headers})
      }


export const getProjects = (headers) => {
    return axios.get(`${baseUrl}/api/v1/project/list`, {headers})
    
}

export const getEmployeeProjectsDetails = (headers) => {
    return axios.get(`${baseUrl}/api/v1/employee/dashboard`, {headers})
}


export const getEmployeeDetail = (id, headers) => {
    return axios.get(`${baseUrl}/api/v1/employee/${id}`, {headers})
}

