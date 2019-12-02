import { Grid } from '@material-ui/core';
import { Link, RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from '../../redux/store';
import Category from './category';
import CourseList from './courseList';
import DetailedDescription from './detailedDescription';
import Filters from './filters';
import SelectedCourses from './selectedCourses';
import TermSelector from './termSelector';


export default function Courses( props: RouteComponentProps ) {
	const store = useSelector( ( store: StoreState ) => store.details );
	
	if ( !store.transcript ) {
		return <div>You need to upload your transcript first. <Link to='/upload'>Click me</Link> to go back to main page
		</div>;
	}
	
	const scheduleName = props[ '*' ];
	
	React.useEffect( () => {
		if ( !scheduleName ) {
			props.navigate( '/upload' );
		}
	}, [ scheduleName ] );
	
	if ( !( scheduleName in store.schedules ) ) return <div>Schedule Does not Exist</div>;
	const schedule = store.schedules[ props[ '*' ] ];
	
	const [ selectedTerm, setSelectedTerm ]     = React.useState( schedule.terms[ 0 ].id ),
	      [ filter, setFilter ]                 = React.useState( [] ),
	      [ selectedCourse, setSelectedCourse ] = React.useState( undefined );
	
	React.useEffect( () => {
		setSelectedCourse( undefined );
	}, [ schedule ] );
	
	return <Grid container>
		<Grid item xs={12} style={{ display: 'flex' }}>
			<div style={{ padding: 20, width: 300 }}>
				<Category
					scheduleName={scheduleName}
					schedule={schedule}/>
			</div>
			<Filters
				filter={filter}
				setFilter={setFilter}/>
		</Grid>
		<Grid item xs={12} style={{ margin: 20 }}>
			<TermSelector
				schedule={schedule}
				selectedTerm={selectedTerm}
				setSelectedTerm={setSelectedTerm}/>
		</Grid>
		<Grid item xs={6}>
			<SelectedCourses
				scheduleName={scheduleName}
				schedule={schedule}
				selectedTerm={selectedTerm}
				setSelectedCourse={setSelectedCourse}/>
			<CourseList
				schedule={schedule}
				selectedTerm={selectedTerm}
				filter={filter}
				setSelectedCourse={setSelectedCourse}/>
		</Grid>
		<Grid item xs={6}>
			<DetailedDescription
				scheduleName={scheduleName}
				schedule={schedule}
				selectedCourse={selectedCourse}/>
		</Grid>
	</Grid>;
}
