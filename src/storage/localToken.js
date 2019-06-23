import { sha256 } from 'js-sha256';


export function getEncryptedToken() {
  return sha256(localStorage.getItem('steem_access_token'));
}

export function getToken(){

	try {
	const serializedState = localStorage.getItem('steem_access_token')
	if (serializedState === null){
		return undefined;
	}
	return JSON.parse(serializedState);

	}catch(err){
		console.error("Error getting localStorage data...")
		return undefined;
	}

}

export function setToken(token) {

try {
	const serializedState = JSON.stringify(token);
	localStorage.setItem('steem_access_token', serializedState)

}catch(err){
	console.error("Error setting localStorage...")
}

}


export function removeToken() {
  return localStorage.removeItem('steem_access_token');
}

