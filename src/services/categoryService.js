import api from "../utils/apis";
import { header } from "../utils/header";

export const fetchCategories = async () => {
	let response = await api.get('/category/getAllCategories?limit=10&page=1', { headers: header() });
	return response.data.payload;
};

export const fetchCategoryById = async (id) => {
	let response = await api.get(`/v1/category/${id}/find`,  { headers: header() })
	return response.data.data;
}



