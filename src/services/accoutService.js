import api from '../utils/apis';
import { header } from "../utils/header";

export const fetchFreelancerById = async (id) => {
    let response = await api.get(`/account/${id}/findFreelancer`)
    return response.data.payload;
};

export const fetchBusinessOwnerById = async (id) => {
    let response = await api.get(`/account/${id}/findBusinessOwner`)
    return response.data.payload;
};

export const updateProfileFreelancer = async (updatePfFrelan) => {
    let response = await api.put(`/account/update/freelancer`, updatePfFrelan, {headers: header() });
    console.log(response.data.message)
    return response.data.message;
  }

export const updateProfileBussiness = async (updatePfBus) => {
    let response = await api.put(`/account/update/businessowner`, updatePfBus, {headers: header() });
    console.log(response.data.message)
    return response.data.message;
}

export const deactivateAccount = async (password) => {
    let response = await api.delete(`/account/deactivate?password=${password}`, {headers: header() });
    console.log("testing delete Account", response.data.success)
    return response.data.success;
  }

  export const resetPassword = async (resetPass) => {
	let response = await api.put('/account/resetpassword', resetPass, { headers: header() });
 
  console.log(" header  =  ",header())
  console.log(" Response for register : " ,response.data.success)
	return response.data.success;
};
