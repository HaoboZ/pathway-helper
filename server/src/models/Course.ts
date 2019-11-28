import * as FormData from 'form-data';
import * as https from 'https';
import * as sequelize from 'sequelize';

import { terms } from '../api/courseRequestHandlers';
import { database } from '../database';


export class Course extends sequelize.Model {
	static addCourse( number, term, subject, catalog_nbr, class_descr, cb ) {
		this.findOrCreate( {
			where:    { term, subject, class_descr }, // for multiple times offered for the same class
			defaults: { number, subject, catalog_nbr }
		} )
			.then( ( [ c, created ] ) => {
				if ( created ) {
					// console.log( 'Created a new Course' );
					cb( c );
				} else {//course already existed
					// console.log("Course listing already existed for this term")
					cb( undefined );
				}
			} );
	}
	
	static checkIfSyncNeeded( forceSync ) {
		
		this.findAndCountAll().then( res => {
			if ( res.count == 0 || forceSync ) {
				this.syncFromCourseAvail();
			}
		} );
	}
	
	static async syncFromCourseAvail() {
		this.destroy( { where: {}, truncate: true } ).then( ( res ) => {
				console.log( res );
				//first get departments
				https.get( 'https://www.scu.edu/apps/ws/courseavail/autocomplete/4120/departments', ( res ) => {
					getJSONResponse( res, async ( body ) => {
						let departments = body.results;
						console.log( departments );
						for ( let t in terms ) {
							console.log( terms[ t ].id );
							for ( let d in departments ) {
								// console.log(departments[d].value);
								let form = new FormData();
								form.append( 'maxRes', 300 );
								form.append( 'dept', departments[ d ].value );
								//without sleeping this was causing timeouts and other weird errors because of how many requests made to courseavail at once
								await sleep( 5 );
								form.submit( `https://www.scu.edu/apps/ws/courseavail/search/${terms[ t ].id}/ugrad`, function ( err, res ) {
									if ( err ) {
										console.log( err );
									}
									getJSONResponse( res, ( body ) => {
										let courses = body.results;
										// console.log(courses, courses.length)
										for ( let course in courses ) {
											let c = courses[ course ];
											Course.addCourse( c.class_nbr, c.term, c.subject, c.catalog_nbr, c.class_descr, () => {
											} );
										}
									} );
								} );
							}
							await sleep( 1000 );
						}
					} );
				} );
			}
		);
	}
}

Course.init( {
	// @ts-ignore
	number:      sequelize.Sequelize.INTEGER,// this is not unique over multiple terms
	// @ts-ignore
	term:        sequelize.Sequelize.INTEGER,
	// @ts-ignore
	subject:     sequelize.Sequelize.STRING,
	// @ts-ignore
	catalog_nbr: sequelize.Sequelize.STRING,
	// @ts-ignore
	class_descr: sequelize.Sequelize.STRING
	
}, { sequelize: database, modelName: 'courses', timestamps: true } );

//helpers
function getJSONResponse( res, cb ) {
	let data = [];
	res.on( 'data', function ( d ) {
		data.push( d );
	} );
	res.on( 'end', function () {
		let body = JSON.parse( Buffer.concat( data ).toString() );
		cb( body );
	} );
}

function sleep( ms ) {
	return new Promise( resolve => {
		setTimeout( resolve, ms );
	} );
}
