import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as webpack from 'webpack';
import * as webpack_dev_middleware from 'webpack-dev-middleware';
import * as webpack_hot_middleware from 'webpack-hot-middleware';

import * as webpackConfig from '../webpack.config.js';
import config from './config';


declare const __basedir;

// set up server
const app: express.Application = express();
if ( config.debug ) app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( cookieParser() );

if ( config.debug ) {
	const compiler = webpack( webpackConfig as any );
	app.use( webpack_dev_middleware( compiler, {
		publicPath: webpackConfig.output.publicPath
	} ) );
	app.use( webpack_hot_middleware( compiler ) );
}

app.use( express.static( path.join( __basedir, 'public' ) ) );
app.use( '/assets', express.static( path.join( __basedir, 'assets' ) ) );
app.use( '/node_modules', express.static( path.join( __basedir, 'node_modules' ) ) );

app.get( '*', ( req, res ) => {
	const index = path.join( __basedir, config.index );
	res.sendFile( index );
} );

const port: any = process.env.PORT || config.port;
app.listen( port, () => {
	if ( config.debug ) console.log( `Listening on port ${port}` );
} );
