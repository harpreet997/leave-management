import axios from "axios";
import { baseUrl } from "../baseurl";

export const getAllLeaves = () => {
    return axios.post(`${baseUrl}/api/v1/leave/list`)
}

export const getDashboardLeaves = () => {
    return axios.post(`${baseUrl}/api/v1/leave/dashboard/list`)
}

export const getEmployees = (headers, pagination) => {
        var config = {
            method: "get",
            url: `${baseUrl}/api/v1/employee/list`,
            params: { page: pagination , limit : 10},
            headers: headers,
          };
          return axios(config)
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

