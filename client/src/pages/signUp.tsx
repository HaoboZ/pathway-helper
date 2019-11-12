import { Button, TextField } from '@material-ui/core';
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
    let passwordConfirmFieldRef = React.useRef(null);

	if ( store.authenticated ) {

		navigate('/upload').then( () => {
			dispatch(displayInfo('You are already logged in, you must log out first to create a new account.'))
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
			id="outlined-required-signUp"
			label="Username"
			style={classes.textField}
			// className={classes.textField}
			margin="normal"
			variant="outlined"
			inputRef={usernameFieldRef}
        />
        <TextField
			required
			id="outlined-password-input-signUp"
			label="Password"
			style={classes.textField}
			// className={classes.textField}

			type="password"
			autoComplete="current-password"
			margin="normal"
			variant="outlined"
			inputRef={passwordFieldRef}
        />
		<TextField
			required
			id="outlined-password-confirm-input-signUp"
			label="Confirm Password"
			style={classes.textField}
			// className={classes.textField}

			type="password"
			autoComplete="current-password"
			margin="normal"
			variant="outlined"
			inputRef={passwordConfirmFieldRef}
        />
		<Button variant="outlined" onClick={() => {
			let username = usernameFieldRef.current.value;
			let password = passwordFieldRef.current.value;
			let passwordConfirm = passwordConfirmFieldRef.current.value;
			if(password != passwordConfirm){
			    dispatch(displayWarning("Passwords do not match!"));
			    return;
            }
			if(checkInput(username) && checkInput(password)){
				$.ajax({
					type:"POST",
					url:'/signUpHandler',
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


		}}>Sign Up</Button>
	</div>);
}