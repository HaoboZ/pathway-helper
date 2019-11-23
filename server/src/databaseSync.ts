import * as connect_session_sequelize from 'connect-session-sequelize';
import * as session from 'express-session';

import { database, User } from './database';

import {Course} from './courses';

let SequelizeStore = connect_session_sequelize( session.Store );
let sessionStore = new SequelizeStore( {
	db: database
} );
User.sync();
Course.sync().then(()=>{
	Course.checkIfSyncNeeded(true);

});



sessionStore.sync();// for db initialization
