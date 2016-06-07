import { combineReducers } from 'redux';
import folder from './reducers/folder';

const folders = combineReducers({ folder });

export default folders;
