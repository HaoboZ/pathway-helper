import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from './redux/store';


export default function Theme( { children } ) {
	const store = useSelector( ( state: StoreState ) => state.main );

	const muiTheme = createMuiTheme( {
		palette: {
			primary:   {
				main: '#b30838'
			},
			secondary: {
				main: '#760d17'
			},
			type:      store.theme as any
		},
		overrides: {
			MuiContainer: {
				root: {
					flexGrow:1
				}
			}
  		}
	} );

	return <ThemeProvider theme={muiTheme} >
		{children}
	</ThemeProvider>;
}
