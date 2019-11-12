import * as connect_session_sequelize from 'connect-session-sequelize';
import * as session from 'express-session';

import { database, User } from './database';


export default function generateDatabaseHandlers( app ) {
	
	const SequelizeStore = connect_session_sequelize( session.Store );
	const sessionStore = new SequelizeStore( {
		db: database
	} );
	app.use( session( {
		secret: process.env.SESSION_SECRET,
		store:  sessionStore,
		resave: false, // we support the touch method so per the express-session docs this should be set to false
		//proxy: true, // if you do SSL outside of node.
		
		saveUninitialized: false,
		cookie:            { secure: false } // we do not support ssl yet, but when we do this should be true
		//expires: new Date(Date.now() + ( 86400 * 1000)),
	} ) );
	
	//expose and validate session data to req.session
	app.use( ( req, res, next ) => {
		if ( req.session.data != undefined ) {
			// console.log(req.session)
			let data = JSON.parse( req.session.data );
			req.session.username = data.username;
			req.session.authorized = true;
		} else {
			req.session.authorized = false;
		}
		
		next();
	} );
	
	function checkInput( str ) {
		return ( str !== undefined && str !== null && str.length > 0 && str.length < 100 );
	}
	
	app.post( '/signUpHandler', ( req, res ) => {
		if ( req.session.authorized ) {
			res.send( { 'error': 'You are still logged in, you must sign out first' } );
			return;
		}
		let username = req.body.username;
		let password = req.body.password;
		
		if ( checkInput( username ) && checkInput( password ) ) {//maybe move this check into newUser function
			//password is hashed by the newUser function
			User.newUser( username, password, function ( user ) {
				if ( user ) {
					req.session.data = JSON.stringify( { 'username': username } );
					res.send( { 'success': 'signed up and logged in', 'username': username } );
				} else {
					res.send( { 'error': 'That username already exists.' } );
				}
			} );
		} else {
			res.send( { 'error': 'bad input' } );
		}
	} );
	
	app.post( '/loginHandler', ( req, res ) => {
		if ( req.session.authorized ) {
			res.send( { 'error': 'You are still logged in, you must sign out first' } );
			return;
		}
		let username = req.body.username;
		let password = req.body.password;
		if ( checkInput( username ) && checkInput( password ) ) {//maybe move this check into login function
			User.login( username, password, function ( user ) {
				if ( user ) {
					req.session.data = JSON.stringify( { 'username': username } );
					res.send( { 'success': 'logged in' } );
				} else {
					res.send( { 'error': 'Incorrect username or password' } );
				}
			} );
		} else {
			res.send( { 'error': 'bad input' } );
		}
	} );
	
	app.get( '/getUserInfo', ( req, res ) => {
		if ( req.session.authorized ) {
			res.send( { 'username': req.session.username } );
		} else {
			res.send( {} );
		}
	} );
	
	app.get( '/logout', ( req, res ) => {
		if ( req.session.authorized ) {
			req.session.destroy( ( err ) => {
				if ( err ) {
					console.error( err );
				}
				res.clearCookie( 'connect.sid' );
				res.send( { 'success': 'logged out' } );
				
			} );
		} else {
			res.send( { 'error': 'You are not logged in' } );
		}
	} );
	
}
