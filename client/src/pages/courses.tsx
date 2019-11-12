import { navigate, RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from '../redux/store';
import { displayWarning } from '../store/local/actions';


export default function Courses( props: RouteComponentProps ) {
	const dispatch = useDispatch(),
	      store    = useSelector( ( store: StoreState ) => store.details );
	if ( !store.transcript ) {
		navigate( 'upload' ).then( () => {
			dispatch( displayWarning( 'Transcript needs to be uploaded first' ) );
		} );
		return null;
	}
	
	return <div>
		courses page
	</div>;
}
