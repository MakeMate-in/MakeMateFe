import { EMAIL, MOBILE, PASSWORD } from './../../utils/constants';


export const  validateForm = (user,setUser,setErrors,checked,checkPassword) => {
    let errors = {};

    if (user["first_name"].length===0) {
      errors.first_name = 'First Name is Required';
    }

    if (user["last_name"].length===0) {
      errors.last_name = 'Last Name is Required';
    }
    
    if (user["email"].length===0) {
      errors.email = 'Email is Required';
    }
    else  if (!EMAIL.test(user["email"]) ) {
      errors.email = 'Invalid Email';
    }

    if (user["mobile_no"].length===0) {
      errors.mobile_no = 'Mobile Number is Required';
    }
    else if(user["mobile_no"].length<12 || (!MOBILE.test(user["mobile_no"].substring(2)))){
      errors.mobile_no = 'Invalid Mobile number';
    }


    if (user["company_name"]!=undefined && user["company_name"].length===0) {
      errors.company_name = 'Company Name is Required';
    }

    if (user["GST_no"]!=undefined  && user["GST_no"].length<1 && checked==false) {
      errors.GST_no = 'GST_no is Required';
    }

    if (user["password"].length===0) {
      errors.password = 'Password is Required';
    }
    else if(checkPassword.length===0){
      errors.password = 'Confirm Password is Required';
    }
    else if (user["password"]!==undefined && !PASSWORD.test(user["password"])) {
      errors.password = 'Missing Criteria for password';
    }
    else if (user["password"]!==checkPassword) {
      errors.password = "Password and Confirm Password doesn't match";
    }

    console.log(errors)
    
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