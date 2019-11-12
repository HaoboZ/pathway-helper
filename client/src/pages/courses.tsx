import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from '../redux/store';
import { displayWarning } from '../store/local/actions';


export default function Courses( props: RouteComponentProps ) {
	const dispatch = useDispatch(),
	      store    = useSelector( ( store: StoreState ) => store.details );
	
	React.useEffect( () => {
		if ( !store.transcript ) {
			props.navigate( 'upload' ).then( () => {
				dispatch( displayWarning( 'Transcript needs to be uploaded first' ) );
			} );
		}
	}, [ props.path ] );
	
	return <div>
		courses page
	</div>;
}
