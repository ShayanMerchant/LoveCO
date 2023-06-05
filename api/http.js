import axios from 'axios';

export const baseURL = 'http://192.168.1.113:8000';

export default axios.create({baseURL});
