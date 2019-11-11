import { Button } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from '../redux/store';
import { login } from '../store/local/actions';


export default function Login( props: RouteComponentProps ) {
	const dispatch = useDispatch(),
	      store    = useSelector( ( store: StoreState ) => store.main );
	
	if ( store.authenticated ) {
		window.history.back();
		return null;
	}
	
	return <div>
		<Button onClick={() => {
			dispatch( login() );
		}}>Login</Button>
	</div>;
}
