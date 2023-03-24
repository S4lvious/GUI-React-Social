import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://api.salvatoreliccardo.it/api/",
    withCredentials:true,
});

//https://api.salvatoreliccardo.it/api/