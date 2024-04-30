// import jwtDecode from 'jwt-decode';

export const LOCAL_STORAGE_ITEMS = {
    TOKEN: "token",
    HANDLE: "handle",
    USER_ID: "user_id",
    IS_MAIL:"isMail"
};


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


// export const convertBufferToBinary = (buffer) => {
// 	if(buffer==undefined || buffer.data==undefined || buffer.data.length==0) return ''
// 	const base64Image = Buffer.from(buffer, 'binary').toString('base64');
//     const avatar_url = `data:image/png;base64,${base64Image}`;
// 	return avatar_url
// }