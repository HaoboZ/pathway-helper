import * as sequelize from "sequelize";
import * as passwordHash from "password-hash";
import {database} from "../database";

export class User extends sequelize.Model {
    username
    transcriptData
    password
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
    static updateData(username, data, cb){
	    if( typeof data == 'object') {//check if json
	        User.update({transcriptData:data},{where:{username}}).then((res)=>{
	            cb(res,undefined);
            })
        }
        else{
            cb(undefined, 'Data is not a valid json object')
        }
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

