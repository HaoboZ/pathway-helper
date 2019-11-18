import { SETTRANSCRIPT } from './actions';


export interface GlobalState {
	transcript: any
}

const initState: GlobalState = {
	transcript: null
};

export const GlobalReducer = (
	state = initState,
	action: { type: string } & any
) => {
	switch ( action.type ) {
	case SETTRANSCRIPT:
		return { ...state, transcript: action.transcript };
	}
	return state;
};
