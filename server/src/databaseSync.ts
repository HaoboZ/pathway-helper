const session = require('express-session');


const {sequelize, User} = require('./database');
let SequelizeStore = require('connect-session-sequelize')(session.Store);



let sessionStore = new SequelizeStore({
    db: sequelize
});
User.sync();
sessionStore.sync();// for db initialization
