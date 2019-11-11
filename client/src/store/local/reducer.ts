import { DISPLAYWARNING,DISPLAYINFO, LOGIN, LOGOUT, TOGGLETHEME,SETUSERDATA } from './actions';
import {navigate} from "@reach/router";


export interface LocalState {
	theme: string
	authenticated: boolean
	warning: string
	info: string
	username: string
	obtainedUserData: boolean
}

const initState: LocalState = {
	theme:         'light',
	authenticated: false,
	warning:       '',
	info:		   '',
	username: undefined,
	obtainedUserData: false
};

export const LocalReducer = (
	state = initState,
	action: { type: string } & any
) => {
	switch ( action.type ) {
	case TOGGLETHEME:
		return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
	case LOGIN:
		return { ...state, authenticated: action.authenticated, username:action.username, obtainedUserData: false };
	case LOGOUT:
		// return { ...state, authenticated: false, username:undefined };
		return initState;
	case DISPLAYWARNING:
		return { ...state, warning: action.text };
	case DISPLAYINFO:
		return { ...state, info: action.text };
	case SETUSERDATA:
		return { ...state, username: action.username, authenticated: action.username !== undefined, obtainedUserData: true};
	}
	return state;
};



