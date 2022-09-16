import axios from 'axios';


export const apiInstance = axios.create({
    baseURL: 'https://restcountries.com/v3.1'
});