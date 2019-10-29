import { SETVALUE } from './actions';


export interface MainState {
	value: string
}

const initState: MainState = {
	value: 'Hello World!'
};

export const MainReducer = (
	state = initState,
	action: { type: string } & any
) => {
	switch ( action.type ) {
	case SETVALUE:
		return { ...state, value: action.value };
	default:
		return state;
	}
};
