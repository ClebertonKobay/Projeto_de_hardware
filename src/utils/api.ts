import axios from "axios";

export const api = axios.create({
    baseURL:"http://192.168.3.42",
    headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'X-Requested-With': 'XMLHttpRequest'
    }
})