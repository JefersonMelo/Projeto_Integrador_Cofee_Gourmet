import axios from 'axios';

import { apiURL } from '../Helpers/Globals'
import { getToken } from "./auth";

const api = axios.create({
	baseURL: apiURL
})

api.interceptors.request.use(async config => {
	const token = getToken();
	console.log(getToken())
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;