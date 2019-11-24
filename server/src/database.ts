import * as sequelize from 'sequelize';
require( 'dotenv' ).config();
if ( process.env.USES_DB === undefined ) {
	console.warn( '.env file is not set up, assuming no db used' );
	console.warn( 'please create the file `/server/.env` and initialize with `USES_DB=false`' );
	process.env.USES_DB = 'false';
}
else if( process.env.USES_DB === 'false' ) {
	console.warn("no database set up, cannot use a database");
	process.exit(1)
}
export let database = new sequelize.Sequelize( 'postgres://' + process.env.DB_USERNAME + ':' + process.env.DB_PASS+ '@'+ process.env.DB_HOST +':'+process.env.DB_PORT+'/'+process.env.DB_DBNAME, { logging: false } );
