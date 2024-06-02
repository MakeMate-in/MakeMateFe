// import jwtDecode from 'jwt-decode';
import {Buffer} from 'buffer';
import { PlusOutlined } from '@ant-design/icons';
import {Space} from 'antd'


export const LOCAL_STORAGE_ITEMS = {
    TOKEN: "token",
    HANDLE: "handle",
    USER_ID: "user_id",
    IS_MAIL:"isMail"
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


// export const getAccessToken = () => {
//     const state = store.getState();
//     return state.authenReducer.access_token;
//   };

export const getToken = () => {
    let token = localStorage.getItem(LOCAL_STORAGE_ITEMS.TOKEN)
    return token;
};

// export const getJWTData = (token) => {
//     let updatedToken = token.split(' ')[1]
//     return jwtDecode(updatedToken).User; 
// };

// export const getFileType = (fileName) => {
//     let fileType = null;
//     let fileExtension = null;
// 	const mimeType = mime.getType(fileName)
// 	if (mimeType){
// 		fileType = mimeType.split('/')[0]
// 		fileExtension = mimeType.split('/')[1]
// 	}
// 	return {mimeType, fileType, fileExtension}
// };


// export const getUserId = () => localStorage.getItem(LOCAL_STORAGE_ITEMS.USER_ID);

// export const getUserEmailId = () => localStorage.getItem(LOCAL_STORAGE_ITEMS.UNIQUE_FIELD);

// export const setJwtToken = (token) => localStorage.setItem(LOCAL_STORAGE_ITEMS.TOKEN, token); 

// export const setIsMail =(isMail)=>localStorage.setItem(LOCAL_STORAGE_ITEMS.IS_MAIL,isMail);

// export const setUserdet = (token) => {
//     const handle = getJWTData(token).handle;
//     localStorage.setItem(LOCAL_STORAGE_ITEMS.HANDLE, handle);
// };

// export const setUserId = (token) => {
//     const userId = getJWTData(token).id;
//     localStorage.setItem(LOCAL_STORAGE_ITEMS.USER_ID, userId);
// };

// export const getHandleFromToken = (token) => {
//     if(typeof(token)=="string" && token!=undefined && token!=''){
//     const handle = getJWTData(token).handle;
//     return handle
//     }
// }


// export const initializeUserValues = (token) => {

//     if(typeof(token)==="string" && token!=undefined && token!=''){
//     setUserdet(token);
//     setUserId(token);
//     }
// };


// export const timeAgo = (timestamp) => {
// 	const now = Date.now();
//     timestamp = Date.parse(timestamp)

// 	const secondsAgo = Math.floor((now - timestamp) / 1000);

// 	if (secondsAgo < 60) {
// 		return `${secondsAgo}s ago`;
// 	} else if (secondsAgo < 3600) {
// 		const minutesAgo = Math.floor(secondsAgo / 60);
// 		return `${minutesAgo}m ago`;
// 	} else if (secondsAgo < 86400) {
// 		const hoursAgo = Math.floor(secondsAgo / 3600);
// 		return `${hoursAgo}h ago`;
// 	} else if (secondsAgo < 604800) {
// 		const daysAgo = Math.floor(secondsAgo / 86400);
// 		return `${daysAgo}d ago`;
// 	} else {
// 		const weeksAgo = Math.floor(secondsAgo / 604800); // 7 days in seconds
// 		return `${weeksAgo}w ago`;
// 	}
// };


// export const timewithoutAgo = (timestamp) => {
// 	const now = Date.now();
//     timestamp = Date.parse(timestamp)

// 	const secondsAgo = Math.floor((now - timestamp) / 1000);

// 	if (secondsAgo < 60) {
// 		return `${secondsAgo}s`;
// 	} else if (secondsAgo < 3600) {
// 		const minutesAgo = Math.floor(secondsAgo / 60);
// 		return `${minutesAgo}m`;
// 	} else if (secondsAgo < 86400) {
// 		const hoursAgo = Math.floor(secondsAgo / 3600);
// 		return `${hoursAgo}h`;
// 	} else if (secondsAgo < 604800) {
// 		const daysAgo = Math.floor(secondsAgo / 86400);
// 		return `${daysAgo}d`;
// 	} else {
// 		const weeksAgo = Math.floor(secondsAgo / 604800); // 7 days in seconds
// 		return `${weeksAgo}w`;
// 	}
// };


// export const getisFollower = (async (visitingAnotherProfileAndAuth, user_follower, user_following) => {
// 	if(visitingAnotherProfileAndAuth){
// 		let data = {}
// 		data.follower = user_follower
// 		data.following = user_following
// 		try{
// 		const response = await isFollower(data)
// 		return response.isFollower
// 		}
// 		catch(err){
// 			console.log(err)
// 			return err
// 		}
// 	}
// 	else{
// 		return false
// 	}
// })


export const convertBufferToBinary =  (buffer) => {
	if(buffer==undefined || buffer.data==undefined || buffer.data.length==0) return ''
	const base64Image =  Buffer.from(buffer, 'binary').toString('base64');
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

   export  const options = [
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        }
      ];



export const ROW_COLUMNS = [
  'Part DFM / Review',
  'Part DFM / Review',
  'Part DFM / Review',
  'Part DFM / Review',
  'Part DFM / Review',
  'Part DFM / Review',
  'Part DFM / Review',
  'Part DFM / Review',
  'Part DFM / Review',
  'Part DFM / Review',
  'Part DFM / Review',
  'Part DFM / Review'
]


export const MACHINE_TYPE = [
  {
      'label': "CNC Machine 1",
      'value': "CNC Machine 1"
  },
  {
      'label': "CNC Machine 2",
      'value': "CNC Machine 2"
  },
  {
      'label': "CNC EDM 1",
      'value': "CNC EDM 1"
  },
  {
      'label': "CNC EDM 2",
      'value': "CNC EDM 2"
  },
  {
      'label': "ZNC EDM 1",
      'value': "ZNC EDM 1"
  },
  {
      'label': "ZNC EDM 2",
      'value': "ZNC EDM 2"
  },
  {
      'label': "Wirecut 1",
      'value': "Wirecut 1"
  },
  {
      'label': "Wirecut 2",
      'value': "Wirecut 2"
  },
  {
      'label': "Conventional",
      'value': "Conventional"
  }
]