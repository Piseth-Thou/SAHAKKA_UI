import api from "../utils/apis";

export const uploadImage = async (file) => {
	let formData = new FormData();
	formData.append('file', file);

	let response = await api.post('/file/uploadFile', formData);
	console.log(response,"images")

	return response.data.payload;

	
};
