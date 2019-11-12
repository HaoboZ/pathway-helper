const result = require('dotenv').config();
if(process.env.USES_DB === undefined){
    console.warn(".env file is not set up, assuming no db used");
    console.warn("please create the file `/server/.env` and initialize with `USES_DB=false`")
    process.env.USES_DB = "false";
}

import * as path from 'path';


global[ '__basedir' ] = path.join( __dirname, '../client' );

require( './src/main' );
