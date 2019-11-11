import {navigate} from "@reach/router";

export const TOGGLETHEME = 'toggleTheme';

export function toggleTheme() {
	return {
		type: TOGGLETHEME
	};
}

export const LOGIN = 'login';

export function login(authenticated, username=undefined) {
	return {
		type: LOGIN,
		authenticated,
		username

	};
}

export const LOGOUT = 'logout';

export function logout() {

	return {
		type: LOGOUT
	};
}


export const DISPLAYINFO = 'displayInfo';

export function displayInfo( text: string ) {
	return {
		type: DISPLAYINFO,
		text
	};
}

export const DISPLAYWARNING = 'displayWarning';

export function displayWarning( text: string ) {
	return {
		type: DISPLAYWARNING,
		text
	};
}
