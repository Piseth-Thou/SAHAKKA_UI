import api from '../utils/apis';
import { header } from '../utils/header';

export const fetchPost = async (page) => {
  let response = await api.get(`/servicePost/findAllServicePost?limit=${8}&page=${page}`);
  // alert("called",response.status)
  // console.log("response",response.data.payload.id);
  return response.data;
};
export const fetchPostById = async (id) => {
  let response = await api.get(`/servicePost/${id}/findServicePostById`)
  return response.data.payload;
};
export const insertServicePost = async (servicePost) => {
	let response = await api.post('/servicePost/create', servicePost, { headers: header() });
 
  console.log(" header  =  ",header())
  console.log(" Response.Data : " ,response.data)
	return response.data;
};


export const updateServicePostById = async (id, updateServicePost) => {
  let response = await api.put(`/servicePost/${id}/update`, updateServicePost, {headers: header() });
  return response.data.message;
}

export const deleteServicePost = async (id) => {
	let response = await api.delete(`/servicePost/${id}/delete`, {headers: header() });
  console.log("testing", response)
	return response.data.message;
};

export const deletePost = async (post_id) => {
  let response = await api.delete(`/post/${post_id}/deletePost`, {headers: header() });
  console.log("testing delete post", response)
  return response.data.message;
}

// ================== fetch ownergetAllpost ============
export const fetchOwnerGetAllPost = async () => {
  let response = await api.get(`/post/ownerGetAllPost?postType=NORMAL`, {headers: header() });
  return response.data;
}

export const fetchOwnerGetAllPostPending = async () => {
  let response = await api.get(`/post/ownerGetAllPost?postType=PENDING`, {headers: header() });
  return response.data;
}

export const fetchOwnerGetAllPostDraft = async () => {
  let response = await api.get(`/post/ownerGetAllPost?postType=DRAFT`, {headers: header() });
  return response.data;
}

export const fetchOwnerGetAllServicePost = async (page) => {
  let respones = await api.get(`/servicePost/ownerGetAllServicePost?limit=10&page=${page}&postType=NORMAL`, {headers: header() });
  return respones.data;
}

export const fetchOwnerGetAllServicePostPending = async () => {
  let respones = await api.get(`/servicePost/ownerGetAllServicePost?postType=PENDING`, {headers: header() });
  return respones.data;
}

export const fetchOwnerGetAllServicePostDraft = async () => {
  let response = await api.get(`/servicePost/ownerGetAllServicePost?postType=DRAFT`,{headers: header() });
  return response.data;
}
// ----------------Find service post of freelancer by category ---------------------
export const fetchServicePostByCategory = async (category) => {
  let response = await api.get(`/servicePost/findAllServicePost?category=${category}`)
  return response.data;
};

export const reactLikePost = async (post_id, post) => {
	let response = await api.post(`post/${post_id}/react`, post, { headers: header() });
 
  console.log(" header  =  ", header())
  console.log(" Response.Data React like  : " ,response.data)
	return response.data;
};

export const reportPost = async (post_id,reason,post) => {
	let response = await api.post(`/post/${post_id}/reportPost?reason=${reason}`, post, { headers: header() });
 
  console.log(" header  =  ",header())
  console.log(" Response.Data : " ,response.data, post_id, reason, post," =========== fetch from report post")
	return response.data;
};

export const reportServicePost = async (id,reason,servicePost) => {
	let response = await api.post(`/servicePost/${id}/reportServicePost?reason=${reason}`, servicePost, { headers: header() });
  console.log(" reason", reason)
  console.log(" header  =  ",header())
	return response.data;
};





