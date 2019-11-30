import { Button, TextField } from '@material-ui/core';
import { Link, RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from '../redux/store';
import { displayWarning, login } from '../store/local/actions';


function checkInput( str ) {
	return ( str !== undefined && str !== null && str.length > 0 );
}

export default function Login( props: RouteComponentProps ) {
	const dispatch = useDispatch(),
	      store    = useSelector( ( store: StoreState ) => ( {
		      authenticated: store.main.authenticated,
		      transcript:    store.details.transcript
	      } ) );
	
	let usernameFieldRef = React.useRef( null );
	let passwordFieldRef = React.useRef( null );
	
	if ( store.authenticated ) {
		return <div>You are already authenticated. <Link to={store.transcript ? '/' : '/upload'}>Click me</Link> to go back to main page</div>;
	}
	
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
