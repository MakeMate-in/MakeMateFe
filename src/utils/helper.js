import { Buffer } from 'buffer';
import { PlusOutlined } from '@ant-design/icons';
import mime from 'mime';

export const SESSION_STORAGE_ITEMS = {
  TOKEN: "jwtToken",
  USER_NAME: "username",
  USER_EMAIL: "user_email",
  USER_ID: "user_id",
  COMPANY_ID: "company_id",
  ROLE: "role"

};

export const LOCAL_STORAGE_ITEMS = {
  USER_NAME: "username",
  USER_EMAIL: "user_email",
  USER_ID: "user_id",
  COMPANY_ID: "company_id",
  ROLE: "role"
};

export const getUserData = (user, role) => {
  let data = {}
  data.name = user.first_name + " " + user.last_name
  data.email = user.email
  data.mobile_no = user.mobile_no.substring(2)
  data.password = user.password
  data.company_name = user.company_name
  data.GST_no = user.GST_no
  data.role = role
  return data 
}

export const getCustomerData = (user, role) => {
  let data = {}
  data.name = user.first_name + " " + user.last_name
  data.email = user.email
  data.mobile_no = user.mobile_no.substring(2)
  data.password = user.password
  data.role = role
  return data
}

export const getToken = () => {
  let token = sessionStorage.getItem(SESSION_STORAGE_ITEMS.TOKEN)
  return token;
};

export const getJWTData = (token) => {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

export const getUserName = () => sessionStorage.getItem(LOCAL_STORAGE_ITEMS.USER_NAME);

export const getUserEmail = () => sessionStorage.getItem(LOCAL_STORAGE_ITEMS.USER_EMAIL);

export const getUserId = () => sessionStorage.getItem(LOCAL_STORAGE_ITEMS.USER_ID);

export const getCopanyId = () => sessionStorage.getItem(LOCAL_STORAGE_ITEMS.COMPANY_ID);

export const getRole = () => sessionStorage.getItem(LOCAL_STORAGE_ITEMS.ROLE);

export const setUserName =(username)=>sessionStorage.setItem(LOCAL_STORAGE_ITEMS.USER_NAME,username);

export const setUserEmail =(useremail)=>sessionStorage.setItem(LOCAL_STORAGE_ITEMS.USER_EMAIL,useremail);

export const setUserId =(userId)=>sessionStorage.setItem(LOCAL_STORAGE_ITEMS.USER_ID,userId);

export const setCopanyId =(companyId)=>sessionStorage.setItem(LOCAL_STORAGE_ITEMS.COMPANY_ID,companyId);

export const setRole =(role)=>sessionStorage.setItem(LOCAL_STORAGE_ITEMS.ROLE,role);

export const initializeUserValues = (token) => {

    if(typeof(token)==="string" && token!=undefined && token!=''){
      const details  = getJWTData(token).User
      setUserEmail(details.email)
      setUserId(details.id)
      setCopanyId(details.company)
      setUserName(details.name)
      setRole(details.role)
    }
    else{
      return Error
    }
};


export const convertBufferToBinary = (buffer) => {
  if (buffer === undefined || buffer.data === undefined || buffer.data.length === 0) return ''
  const base64Image = Buffer.from(buffer, 'binary').toString('base64');
  const avatar_url = `data:image/png;base64,${base64Image}`;
  return avatar_url
}

export const getBase64 = async (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


export const uploadButton = (
  <button
    style={{
      border: 0,
      background: 'none',
    }}
    type="button"
  >
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </button>
);

export const options = [
  {
    value: 'IS0-14001',
    label: 'IS0-14001',
  },
  {
    value: 'ISO 9001',
    label: 'ISO 9001',
  }
];

export const MACHINE_TYPE = [
  {
    'label': "CNC Machine",
    'value': "CNC Machine"
  },
  {
    'label': "CNC EDM",
    'value': "CNC EDM"
  },
  {
    'label': "ZNC EDM",
    'value': "ZNC EDM"
  },
  {
    'label': "Wirecut",
    'value': "Wirecut"
  },
  {
    'label': "Conventional",
    'value': "Conventional"
  }
]


export const ROW_COLUMNS = [
  'Part DFM / Review',
  'Mold Flow / Part Simulation',
  'PLG Format',
  'Tool Design',
  'Insert Ordering',
  'Mold Base',
  'Standard Parts',
  'Insert Machining Rough',
  'Electrode Manufacturing',
  'Insert Finalization',
  'Ejector assembly',
  'Mould assembly',
  'Mould Trial',
  'Mould Finalisation after trial (No of days)'
]


export const checkButtonRequired = (current, currentSub, currentInfraSub) => {
  if ((current === 0 && currentSub === 0) || (current === 1 && (currentInfraSub === 0 || currentInfraSub === 2)) || (current===3)) {
    return false
  }
  return true
}

export const getFileType = (fileName) => {
  let fileType = null;
  let fileExtension = null;
const mimeType = mime.getType(fileName)
if (mimeType){
  fileType = mimeType.split('/')[0]
  fileExtension = mimeType.split('/')[1]
}
return {mimeType, fileType, fileExtension}
};


export const deepEqual = (obj1, obj2) => {
  if (obj1 == obj2) return true;

  if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}
