import { openNotificationWithIcon } from '../helper';
import { EMAIL, MOBILE, OPEN_ROUTES, PASSWORD, ROLE, baseURL } from './../../utils/constants';


export const  validateForm = (user,setUser,setErrors,checked,checkPassword, role) => {
    let errors = {};

    let isRequired = role==ROLE.VENDOR?1:0
    
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


    if (isRequired && user["company_name"]!=undefined && user["company_name"].length===0) {
      errors.company_name = 'Company Name is Required';
    }

    if (isRequired &&  user["GST_no"]!=undefined  && user["GST_no"].length<1 && checked==false) {
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


  export const errorValidator = (error) => {
    const err = new Error();
    if(error.response.status == 500) {
      err.msg = "Something went wrong!";
      err.status = 500;
      openNotificationWithIcon("error", err.msg);
  }
  else if(error.response.status == 502) {
      err.msg = "Cannot reach the servers at the moment, Please try agian later!";
      err.status = 500;
      openNotificationWithIcon("error", err.msg);
  }
  else if(error.response.data.errors){
      error.response.data.errors.forEach(error => {
          openNotificationWithIcon("error", error.msg);
          err.msg = error.msg;
          err.status = error.status;
      });
      window.location.href = baseURL+OPEN_ROUTES.CUSTOMER_DASHBOARD
  }
  else if(error.response.status == 404) {
      err.msg = "Could not find the resource!";
      err.status = 500;
      openNotificationWithIcon("error", err.msg);
  }

  throw err
  }


export const errorRouting = () => {
  openNotificationWithIcon("error","Something went Wrong")
  sessionStorage.clear()
}