import PouchDB from 'pouchdb';
import { DB_CONF } from 'configs/app';

/* eslint global-require: 0 */
// PouchDB.utils = { promise: require('pouchdb-promise') };

// const pouchdbFind = require('pouchdb-find');
// PouchDB.plugin(pouchdbFind);

/* global PouchDB */
const db = new PouchDB(DB_CONF);
// db.destroy();
export default db;
