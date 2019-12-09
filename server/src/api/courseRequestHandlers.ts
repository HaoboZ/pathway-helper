//hardcoded terms (this should probably be set dynamically)
export let terms = [
	{ id: 4120, name: 'Winter 2020' },
	{ id: 4040, name: 'Spring 2019' },
	{ id: 4060, name: 'Summer 2019' },
	{ id: 4100, name: 'Fall 2019' },
	 ];

import { Course } from '../models/Course';


export default function generateCourseRequestHandlers( app ) {
	app.get( '/classes', ( req, res ) => {//must specify term in get query parameter
		if ( req.query.term !== undefined ) {
			Course.findAll( { where: req.query, raw: true } ).then( ( results ) => {
				// console.log( results );
				res.send( { results } );
			} );
		} else {
			res.send( {} );
		}
	} );
	app.get( '/courseDescription', ( req, res ) => {
		Course.findOne( { where: req.query } ).then( ( course ) => {
			if ( course ) {
				course.getDescription( ( description ) => {
					res.send( { description } );
				} );
			} else {
				res.send( { 'error': 'no courses found' } );
			}
		} );
	} );
	app.get( '/getCurrentTerm', ( req, res ) => {
		//this is a temporary hardcoded solution
		res.send( { id: 4100, name: 'Fall 2019' } );
	} );
	app.get( '/availableTerms', ( req, res ) => {
		res.send( terms );
	} );

}
