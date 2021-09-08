let currentFormType=1;

export const getCurrentFormType=() => {
  currentFormType= JSON.parse(localStorage.getItem("formType")); 
   return currentFormType;
};
export const setCurrentFormType=(value) => {
    currentFormType= localStorage.setItem("formType",value)
    return currentFormType;
 };
 