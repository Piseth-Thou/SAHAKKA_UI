import api from "../utils/apis";
import { header } from "../utils/header";

export const fetchProjectPost = async (page) => {
    let response = await api.get(`/post/getAllPosts?limit=10&page=${page}`,{ headers: header() });
    return response.data;
  };

export const fetchProjectPostByID = async (postId) => {
    let response = await api.get(`/post/${postId}/findPostById`, { headers: header() })
    return response.data.payload;
}

export const fetchProjectPostByCategory = async (category) => {
  let response = await api.get(`/post/getAllPosts?category=${category}&limit=10&page=1`, { headers: header() })
  return response.data;
}

export const insertProjectPost = async (projectPost) => {
	let response = await api.post('/post/createPost', projectPost, { headers: header() });
 
  console.log(" header  =  ",header())
  console.log(" Response.Data : " ,response.data)
	return response.data;
};

// ===================== handle update post by id ===================
export const updateProjectPostById = async (id, updatedPost) => {
	let response = await api.put(`/post/${id}/updatePost`, updatedPost, {headers: header() });
	return response.data.message;
};

export const deleteProjectPost = async (id) => {
	let response = await api.delete(`/post/${id}/deletePost`);
  console.log(" delete project post : ", response);
	return response.data.success;
};

export const reachLikeById = async (id, reachLike) => {
  let response = await api.post(`post/${id}/react`, reachLike, {headers: header()});
  console.log("Reach like by post id :", response);
  return response.data;
}



