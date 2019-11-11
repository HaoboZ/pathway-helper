import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { displayWarning, displayInfo } from '../store/local/actions';

import {navigate, RouteComponentProps} from '@reach/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from '../redux/store';
import { login } from '../store/local/actions';

const classes = {
	container: {
		display: 'flex',
		flexDirection: 'column' as "column",
		alignItems:'center',

	},
	textField: {
		width: 200
	},
};
function checkInput(str){
	console.log(str)
	return (str !== undefined && str !== null && str.length > 0 )
}

export default function Login( props: RouteComponentProps ) {
	const dispatch = useDispatch(),
	      store    = useSelector( ( store: StoreState ) => store.main );

	let usernameFieldRef = React.useRef(null);
	let passwordFieldRef = React.useRef(null);


	if ( store.authenticated ) {

		navigate('/upload').then( () => {
			dispatch(displayInfo('You are already logged in, you must log out first to switch accounts'))
		} );
		return null;
	}
	// const classes = useStyles({});
	return (
		<div
			style={classes.container}
		>
		<TextField
			required
			id="outlined-required"
			label="Username"
			style={classes.textField}
			// className={classes.textField}
			margin="normal"
			variant="outlined"
			inputRef={usernameFieldRef}
        />
		<TextField
			required
			id="outlined-password-input"
			label="Password"
			style={classes.textField}
			// className={classes.textField}

			type="password"
			autoComplete="current-password"
			margin="normal"
			variant="outlined"
			inputRef={passwordFieldRef}
        />
		<Button variant="outlined" onClick={() => {
			let username = usernameFieldRef.current.value;
			let password = passwordFieldRef.current.value;
			if(checkInput(username) && checkInput(password)){
				$.ajax({
					type:"POST",
					url:'/loginHandler',
					dataType:"json",
					contentType:"application/json",
					data: JSON.stringify({"username":username,"password":password}),
					success: function(r){
						console.log(r);
						if(r.error){
							//return { ...state, authenticated: true, warning:r.error };
							dispatch(displayWarning(r.error));

						}
						else{
							dispatch( login(true, r.username) );
							navigate('/upload');
							//return { ...state, authenticated: true, info:r.success };
					}


				}});
			}
			else{
				dispatch(displayWarning('Please enter a valid username and password'))
			}


		}}>Login</Button>
	</div>);
}
