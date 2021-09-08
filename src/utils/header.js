import { cryptoDecrypt } from "./crypto";

export const header = () => {
    let user = JSON.parse(localStorage.getItem('user'))
   // let REACT_APP_ENCRYPT_KEY='Oh-no,not-again'
    if (user && user.token) {
       // let token = cryptoDecrypt(user.token, REACT_APP_ENCRYPT_KEY)
        return {
            ContentType: "application/json",
            Authorization: 'Bearer ' + user.token,
        };
    } else {
        return { ContentType: "application/json" }
    }
}
