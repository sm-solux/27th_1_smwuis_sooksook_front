import {createStore} from 'redux';
import loginReducer from './login/reducer';
const store=createStore(loginReducer);

export default store;