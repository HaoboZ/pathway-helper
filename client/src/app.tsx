import * as React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Index from './index';
import store, { persistor } from './redux/store';


function App() {
	return <Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Index/>
		</PersistGate>
	</Provider>;
}

const HotApp = hot( App );

$( () => {
	render( <HotApp/>, $( '#root' )[ 0 ] );
} );
