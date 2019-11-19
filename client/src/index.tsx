import { Container, CssBaseline, IconButton, Snackbar, SnackbarContent, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Close as CloseIcon } from '@material-ui/icons';
import { Router } from '@reach/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import config from './config';
import Courses from './pages/courses';
import Details from './pages/details';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Upload from './pages/upload';
import { RESET } from './redux/reducers';
import { StoreState } from './redux/store';
import { displayWarning, setUserData } from './store/local/actions';
import Theme from './theme';
import Titlebar from './titlebar';


export default function Index() {
	const dispatch = useDispatch(),
	      store    = useSelector( ( store: StoreState ) => store.main );
	
	const theme = useTheme();
	
	React.useEffect( () => {
		if ( config.version !== store.version ) {
			dispatch( { type: RESET } );
		}
	}, [] );
	
	if ( !store.obtainedUserData ) {
		$.ajax( {
			type: 'GET',
			url:  '/getUserInfo',
			success( r ) {
				console.log( r );
				if ( r.error ) {
					console.error( 'Error aquiring user info: ', r.error );
				} else {
					dispatch( setUserData( r ) );
				}
			}
		} );
		return null;
	}
	
	return <Theme>
		<CssBaseline/>
		<Titlebar/>
		<Container style={{ overflowY: 'scroll' }}>
			<Router style={{ height: '100%' }}>
				<Details path='/'/>
				<Login path='login'/>
				<SignUp path='signUp'/>
				<Upload path='upload'/>
				<Courses path='courses'/>
			</Router>
		</Container>
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={!!store.warning}
			autoHideDuration={6000}
			onClose={() => {
				dispatch( displayWarning( '' ) );
			}}>
			<SnackbarContent
				style={{
					backgroundColor: theme.palette.error.dark
				}}
				message={<Typography color='textPrimary' style={{
					display:    'flex',
					alignItems: 'center'
				}}>{store.warning}</Typography>}
				action={<IconButton color='default' onClick={() => {
					dispatch( displayWarning( '' ) );
				}}>
					<CloseIcon style={{ fontSize: 20 }}/>
				</IconButton>}/>
		</Snackbar>
	</Theme>;
}
