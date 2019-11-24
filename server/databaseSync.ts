import * as connect_session_sequelize from 'connect-session-sequelize';
import * as session from 'express-session';

import { database } from './src/database';

import {User} from './src/models/User';
import {Course} from './src/models/Course';

let SequelizeStore = connect_session_sequelize( session.Store );
let sessionStore = new SequelizeStore( {
	db: database
} );

User.sync();
Course.sync().then(()=>{
	Course.checkIfSyncNeeded(true);
});

sessionStore.sync();// for db initialization
