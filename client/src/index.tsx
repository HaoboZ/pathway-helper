import { Container, CssBaseline, IconButton, Snackbar, SnackbarContent, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Close as CloseIcon } from '@material-ui/icons';
import { Router } from '@reach/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Courses from './pages/courses';
import Details from './pages/details';
import Login from './pages/login';
import Upload from './pages/upload';
import { StoreState } from './redux/store';
import { displayWarning, displayInfo } from './store/local/actions';
import Theme from './theme';
import Titlebar from './titlebar';


export default function Index() {
	const dispatch = useDispatch(),
	      store    = useSelector( ( store: StoreState ) => store.main );

	const theme = useTheme();

	return <Theme>
		<CssBaseline/>
		<Titlebar/>
		<Container>
			<Router>
				<Details path='/'/>
				<Login path='login'/>
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

		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={!!store.info}
			autoHideDuration={6000}
			onClose={() => {
				dispatch( displayInfo( '' ) );
			}}>
			<SnackbarContent
				style={{
					backgroundColor: theme.palette.primary.dark
				}}
				message={<Typography color='textPrimary' style={{
					display:    'flex',
					alignItems: 'center'
				}}>{store.info}</Typography>}
				action={<IconButton color='default' onClick={() => {
					dispatch( displayInfo( '' ) );
				}}>
					<CloseIcon style={{ fontSize: 20 }}/>
				</IconButton>}/>



		</Snackbar>

	</Theme>;
}
