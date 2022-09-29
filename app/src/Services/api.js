import axios from 'axios';
import { apiURL } from '../Helpers/Globals'

const api = axios.create({
	baseURL: apiURL
})

export default api;