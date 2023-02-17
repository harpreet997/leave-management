import axios from "axios";
import { baseUrl } from "../baseurl";

export const login = (data) => {
    return axios.post(`${baseUrl}/api/v1/auth/login`, data)
} 

export const applyLeave = (leavedata) => {
    return axios.post(`${baseUrl}/api/v1/leave/add`, leavedata)
} 

export const editLeave = (id,editleavedata) => {
    return axios.patch(`${baseUrl}/api/v1/leave/${id}`, editleavedata)
} 

export const deleteLeave = (id) => {
    return axios.delete(`${baseUrl}/api/v1/leave/${id}`)
} 

export const addEmployee = (addemployee, headers) => {
    return axios.post(`${baseUrl}/api/v1/employee/add`, addemployee, {headers})
} 

export const editEmployee = (id, editemployee, headers) => {
    return axios.patch(`${baseUrl}/api/v1/employee/${id}`, editemployee, {headers})
} 

export const deleteEmployee = (id, headers) => {
    return axios.delete(`${baseUrl}/api/v1/employee/${id}`, {headers})
}

export const addProject = (addproject, headers) => {
    return axios.post(`${baseUrl}/api/v1/project/add`, addproject, {headers})
} 

export const editProject = (id, editemployee, headers) => {
    return axios.put(`${baseUrl}/api/v1/project/${id}`, editemployee, {headers})
} 

export const deleteProject = (id, headers) => {
    return axios.delete(`${baseUrl}/api/v1/project/${id}`, {headers})
}