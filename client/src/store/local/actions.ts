export const TOGGLETHEME = 'toggleTheme';

export function toggleTheme() {
	return {
		type: TOGGLETHEME
	};
}

export const LOGIN = 'login';

export function login() {
	return {
		type: LOGIN
	};
}

export const LOGOUT = 'logout';

export function logout() {
	return {
		type: LOGOUT
	};
}


export const DISPLAYWARNING = 'displayWarning';

export function displayWarning( text: string ) {
	return {
		type: DISPLAYWARNING,
		text
	};
}
