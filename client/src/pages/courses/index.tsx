import { Grid } from '@material-ui/core';
import { Link, RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from '../../redux/store';
import Category from './category';
import Filters from './filters';
import TermSelector from './termSelector';


export default function Courses( props: RouteComponentProps ) {
	const store = useSelector( ( store: StoreState ) => store.details );
	
	if ( !store.transcript ) {
		return <div>You need to upload your transcript first. <Link to='/upload'>Click me</Link> to go back to main page</div>;
	}
	
	const scheduleName = props[ '*' ];
	
	React.useEffect( () => {
		if ( !scheduleName ) {
			props.navigate( '/upload' );
		}
	}, [ scheduleName ] );
	
	if ( !( scheduleName in store.schedules ) ) return <div>Schedule Does not Exist</div>;
	const schedule = store.schedules[ props[ '*' ] ];
	
	
	return <Grid container>
		<Grid item xs={12} style={{ display: 'flex' }}>
			<div style={{ padding: 20, width: 300 }}>
				<Category scheduleName={scheduleName} schedule={schedule}/>
			</div>
			<Filters scheduleName={scheduleName} schedule={schedule}/>
		</Grid>
		<Grid item xs={12}>
			<TermSelector/>
		</Grid>
	</Grid>;
}
