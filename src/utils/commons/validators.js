import { EMAIL, MOBILE, PASSWORD } from './../../utils/constants';


export const  validateForm = (user,setUser,setErrors) => {
    let errors = {};
   
    // Email validation
    if (!EMAIL.test(user["uniqueField"]) && !MOBILE.test(user["uniqueField"])) {
      errors.uniqueField = 'Invalid Mobile number or Email';
    }
    else{
      let isMail = EMAIL.test(user["uniqueField"])
      if (isMail) {
        setUser({ ...user, ["isMail"]: true })
      }
    }

    if (user["password"]!==undefined && !PASSWORD.test(user["password"])) {
      errors.password = 'Missing Criteria for password';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };



  export const  GooglevalidateForm = (user,setUser,setErrors) => {
    let errors = {};
   
    // Email validation
    if (user["password"]!==undefined && !PASSWORD.test(user["password"])) {
      errors.password = 'Missing Criteria for password';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };