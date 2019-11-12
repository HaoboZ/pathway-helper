import { Button, TextField } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from '../redux/store';
import { displayWarning, login } from '../store/local/actions';


function checkInput( str ) {
	return ( str !== undefined && str !== null && str.length > 0 );
}

export default function Login( props: RouteComponentProps ) {
	const dispatch = useDispatch(),
	      store    = useSelector( ( store: StoreState ) => store.main );
	
	let usernameFieldRef = React.useRef( null );
	let passwordFieldRef = React.useRef( null );
	
	React.useEffect( () => {
		if ( store.authenticated ) {
			props.navigate( '/upload' ).then( () => {
				dispatch( displayWarning( 'You are already logged in, you must log out first to create a new account.' ) );
			} );
		}
	}, [ props.path ] );
	
	return <div style={{
		display:       'flex',
		flexDirection: 'column',
		alignItems:    'center'
	}}>
		<TextField
			required
			id='outlined-required'
			label='Username'
			style={{ width: 200 }}
			margin='normal'
			variant='outlined'
			inputRef={usernameFieldRef}
		/>
		<TextField
			required
			id='outlined-password-input'
			label='Password'
			style={{ width: 200 }}
			type='password'
			autoComplete='current-password'
			margin='normal'
			variant='outlined'
			inputRef={passwordFieldRef}
		/>
		<Button variant='outlined' onClick={() => {
			let username = usernameFieldRef.current.value;
			let password = passwordFieldRef.current.value;
			if ( checkInput( username ) && checkInput( password ) ) {
				$.ajax( {
					type:        'POST',
					url:         '/loginHandler',
					dataType:    'json',
					contentType: 'application/json',
					data:        JSON.stringify( { 'username': username, 'password': password } ),
					success( r ) {
						console.log( r );
						if ( r.error ) {
							dispatch( displayWarning( r.error ) );
						} else {
							dispatch( login( true, r.username ) );
							props.navigate( '/upload' );
						}
					}
				} );
			} else {
				dispatch( displayWarning( 'Please enter a valid username and password' ) );
			}
		}}>Login</Button>
	</div>;
}
