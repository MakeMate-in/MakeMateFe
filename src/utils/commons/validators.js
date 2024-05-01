import { EMAIL, MOBILE, PASSWORD } from './../../utils/constants';


export const  validateForm = (user,setUser,setErrors) => {
    let errors = {};
   
    // Email validation
    if (!EMAIL.test(user["email"]) && !MOBILE.test(user["mobile_no"])) {
      errors.email = 'Invalid Email';
    }

    if(user["mobile_no"].length<12 || (!MOBILE.test(user["mobile_no"].substring(2)))){
      errors.mobile_no = 'Invalid Mobile number';
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