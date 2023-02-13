import axios from "axios";
import { baseUrl } from "../baseurl";

export const login = (data) => {
    return axios.post(`${baseUrl}/api/v1/auth/login`, data)
} 