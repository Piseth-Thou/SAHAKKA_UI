import api from '../utils/apis';
import { cryptoEncrypt } from "../utils/crypto";
import { BehaviorSubject } from 'rxjs';
import fileUploadApi from '../utils/fileUpload';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));
export const authenticationService = {
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

export const handleLogin = async (email, password) => {
    let response = await api.post('auth/login', { email, password })
    if (response.data.payload) {
        let user = response.data.payload
        let role = response.data.payload.role
        // user.token = cryptoEncrypt(user.token, process.env.REACT_APP_ENCRYPT_KEY)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('role', JSON.stringify(role))
        currentUserSubject.next(user);
    }
    return response.data.success
}
export const handleRegister = async (
    username,
    email,
    passwords,
    bio,
    company_contact,
    company_description,
    company_location,
    company_logo,
    company_name,
    company_logo_file,
    email_address,
    gender,
    profile_image,
    provider_type,
    // social_media,
    facebook,
    telegram,
    twitter,
    linkIn,
    address,
    nationality,
    telephone
    // businessAcc
    ) => {
    let response = await api.post('auth/signup/businessOwner?providerType=NORMAL', {
        username,
        email,
        passwords,
        bio,
        company_contact,
        company_description,
        company_location,
        company_logo,
        company_name,
        company_logo_file,
        email_address,
        gender,
        profile_image,
        provider_type,
        social_media: [
            facebook,
            telegram,
            twitter,
            linkIn
        ],
        address,
        nationality,
        telephone
        // businessAcc
    })
    console.log(response);
    return response.data.success
}

export const handleRegisterFreelancer = async (
    telephone,
    username,
    email,
    passwords,
    achievement,
    address,
    bio,
    education_background,
    languages,
    nationality,
    email_address,
    gender,
    profile_image,
    skills,
    // social_media,
    facebook,
    telegram,
    twitter,
    linkIn,
    work_experience,
    provider_type
    
    ) => {
    let response = await api.post('auth/signup/freelancer?providerType=NORMAL', {
        telephone,
        username,
        email,
        passwords,
        achievement,
        address,
        bio,
        education_background,
        languages,
        nationality,
        email_address,
        gender,
        profile_image,
        skills,
        work_experience,
        provider_type,
        social_media: [
            facebook,
            telegram,
            twitter,
            linkIn
        ]
    })
    console.log(response);
    return response.data.success
}

export const logout = async () => {
    localStorage.removeItem('user');
    currentUserSubject.next(null);
}

export const getCurrentUser = async () => {
    return JSON.parse(localStorage.getItem('user'));
}