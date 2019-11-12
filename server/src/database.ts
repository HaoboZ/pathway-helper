import * as passwordHash from 'password-hash';
import * as sequelize from 'sequelize';


export let database = new sequelize.Sequelize( 'postgres://pathwayhelper:pathwayhelper123@localhost:5432/pathwayhelperdb', { logging: false } );

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
		return passwordHash.verify( providedPassword, this.password );
	}
	
}

User.init( {
	username:       { type: sequelize.Sequelize.STRING, unique: true },
	password:       sequelize.Sequelize.STRING,
	transcriptData: sequelize.Sequelize.JSONB//will break non postgres builds (this makes it fast to parse after read)
}, { sequelize: database, modelName: 'pathwayuser', timestamps: true } );
