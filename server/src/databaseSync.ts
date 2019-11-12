import * as connect_session_sequelize from 'connect-session-sequelize';
import * as session from 'express-session';

import { database, User } from './database';


let SequelizeStore = connect_session_sequelize( session.Store );
let sessionStore = new SequelizeStore( {
	db: database
} );
User.sync();
sessionStore.sync();// for db initialization
