import { Button } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from './redux/store';
import { setValue } from './store/actions';


export default function Index() {
	const dispatch = useDispatch(),
	      store    = useSelector( ( state: StoreState ) => state.main );
	
	// React.useEffect( () => {
	// 	dispatch( setValue( 'Hello World!' ) );
	// }, [] );
	
	return <div>
		<Button variant='contained' color='primary' onClick={() => {
			dispatch( setValue( 'Changed State!' ) );
		}}>
			Click Me!
		</Button>
		<br/><br/>
		{store.value}
	</div>;
}
