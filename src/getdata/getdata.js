import axios from "axios";
import { baseUrl } from "../baseurl";

export const getAllLeaves = () => {
    return axios.post(`${baseUrl}/api/v1/leave/list`)
}

export const getDashboardLeaves = () => {
    return axios.post(`${baseUrl}/api/v1/leave/dashboard/list`)
}