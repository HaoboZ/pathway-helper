import * as passwordHash from 'password-hash';
import * as sequelize from 'sequelize';
require( 'dotenv' ).config();
if ( process.env.USES_DB === undefined ) {
	console.warn( '.env file is not set up, assuming no db used' );
	console.warn( 'please create the file `/server/.env` and initialize with `USES_DB=false`' );
	process.env.USES_DB = 'false';
}
//cannot export a let singleton, so var is used
export let database = new sequelize.Sequelize( 'postgres://' + process.env.DB_USERNAME + ':' + process.env.DB_PASS+ '@'+ process.env.DB_HOST +':'+process.env.DB_PORT+'/'+process.env.DB_DBNAME, { logging: false } );

export class User extends sequelize.Model {

	static newUser( username, passwordPlaintext, cb ) {//returns user if successful, otherwise returns undefined
		this.findOrCreate( {
			where:    { username: username },
			defaults: { password: passwordHash.generate( passwordPlaintext ), transcriptData: {} }
		} )
			.then( ( [ user, created ] ) => {
				if ( created ) {
					console.log( 'Created a new User' );
					cb( user );
				} else {//username already existed
					cb( undefined );
				}

			} );

	}

	//pre: usernames are unique
	static login( username, passwordPlaintext, cb ) {//returns user if successful, otherwise returns undefined
		this.findOne( { where: { username: username } } )
			.then( user => {
				if ( user ) {
					if ( user.validatePassword( passwordPlaintext ) ) {//check password
						cb( user );
					} else {
						cb( undefined );
					}
				} else {//no user found of that name
					cb( undefined );
				}
			} );
	}

	validatePassword( providedPassword ) {
		// @ts-ignore
		return passwordHash.verify( providedPassword, this.password );
	}

}

User.init( {
	// @ts-ignore
	username:       { type: sequelize.Sequelize.STRING, unique: true },
	// @ts-ignore
	password:       sequelize.Sequelize.STRING,
	// @ts-ignore
	transcriptData: sequelize.Sequelize.JSONB//will break non postgres builds (this makes it fast to parse after read)
}, { sequelize: database, modelName: 'pathwayuser', timestamps: true } );

