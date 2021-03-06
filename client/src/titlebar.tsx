import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Brightness2 as MoonIcon, Brightness7 as SunIcon, Menu as MenuIcon } from '@material-ui/icons';
import { navigate } from '@reach/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from './redux/store';
import { displayWarning, logout, toggleTheme } from './store/local/actions';


export default function Titlebar() {
	const dispatch = useDispatch(),
	      store    = useSelector( ( store: StoreState ) => store.main );
	
	const theme = useTheme();
	
	const [ menuClick, setMenuClick ] = React.useState<null | HTMLElement>( null );
	
	return <AppBar position='static'>
		<Toolbar>
			<IconButton
				edge='start'
				style={{ marginRight: theme.spacing( 2 ) }}
				color='inherit'
				onClick={( e ) => {
					setMenuClick( e.currentTarget );
				}}>
				<MenuIcon/>
			</IconButton>
			<Menu
				anchorEl={menuClick}
				keepMounted
				open={!!menuClick}
				onClose={() => {
					setMenuClick( null );
				}}>
				<MenuItem onClick={() => {
					navigate( '/upload' ).then( () => {
						setMenuClick( null );
					} );
				}}>Upload New Transcript</MenuItem>
				<MenuItem onClick={() => {
					navigate( '/' ).then( () => {
						setMenuClick( null );
					} );
				}}>Transcript Details</MenuItem>
			</Menu>
			<Typography
				variant='h6'
				style={{ flexGrow: 1 }}>
				Course Helper
			</Typography>
			<Typography
				variant='subtitle1'
				style={{ flexGrow: 1 }}>
				{store.authenticated ? store.username : ''}
			</Typography>
			<IconButton color='inherit' onClick={() => {
				dispatch( toggleTheme() );
			}}>
				{store.theme === 'light' ? <MoonIcon/> : <SunIcon/>}
			</IconButton>
			{store.authenticated ? null :
				<Button color='inherit' onClick={() => {
					navigate( '/signUp' );
				}}>Sign Up</Button>
			}
			<Button color='inherit' onClick={() => {
				if ( store.authenticated && confirm( 'Are you sure you want to logout?' ) ) {
					$.ajax( {
						type: 'GET',
						url:  '/logout',
						success( r ) {
							if ( r.error ) {
								dispatch( displayWarning( r.error ) );
							} else {
								dispatch( logout() );
								navigate( '/login' );
							}
						}
					} );
				} else {
					navigate( '/login' );
				}
			}}>{store.authenticated ? 'Logout' : 'Login'}</Button>
		</Toolbar>
	</AppBar>;
}
