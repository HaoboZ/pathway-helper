import { Button } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from '../../redux/store';
import Category from './category';
import Filters from './filters';


export default function Courses( props: RouteComponentProps ) {
	const store = useSelector( ( store: StoreState ) => store.details );
	
	if ( !store.transcript ) {
		return <div>You need to upload your transcript first. <Button variant='contained' onClick={() => {
			props.navigate( '/upload' );
		}}>Click me</Button> to go back to main page</div>;
	}
	
	const scheduleName = props[ '*' ];
	
	React.useEffect( () => {
		if ( !scheduleName ) {
			props.navigate( '/upload' );
		}
	}, [ scheduleName ] );
	
	if ( !( scheduleName in store.schedules ) ) return <div>Schedule Does not Exist</div>;
	const schedule = store.schedules[ props[ '*' ] ];
	
	return <div>
		<Category scheduleName={scheduleName} schedule={schedule}/>
		<Filters scheduleName={scheduleName} schedule={schedule}/>
	</div>;
}
