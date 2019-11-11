import { DISPLAYWARNING,DISPLAYINFO, LOGIN, LOGOUT, TOGGLETHEME } from './actions';
import {navigate} from "@reach/router";


export interface LocalState {
	theme: string
	authenticated: boolean
	warning: string
	info: string
}

const initState: LocalState = {
	theme:         'light',
	authenticated: false,
	warning:       '',
	info:		   ''
};

export const LocalReducer = (
	state = initState,
	action: { type: string } & any
) => {
	switch ( action.type ) {
	case TOGGLETHEME:
		return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
	case LOGIN:
		return { ...state, authenticated: action.authenticated, username:action.username };
	case LOGOUT:
		return { ...state, authenticated: false, username:undefined };
	case DISPLAYWARNING:
		return { ...state, warning: action.text };
	case DISPLAYINFO:
		return { ...state, info: action.text };
	}
	return state;
};



