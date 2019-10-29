import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers, { state } from './reducers';


const persistConfig = {
	key: 'root',
	storage
};

const persistedReducer = persistReducer( persistConfig, reducers );

const store = createStore( persistedReducer );
export default store;
export const persistor = persistStore( store );

export interface StoreState extends state {
}
