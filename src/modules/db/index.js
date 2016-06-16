import lf from 'lovefield';
import { DB_NAME, DB_VERSION } from 'configs/app';
import buildNotebookSchema from './schemas/notebook';

const schemaBuilder = lf.schema.create(DB_NAME, DB_VERSION);
buildNotebookSchema(schemaBuilder, lf);

let db = null;
const dbPromise = schemaBuilder.connect(_db => {
  console.log('connected');
  db = _db;
  return db;
});

export default async function getDB(callback) {
  console.log('getDB');
  return db === null ? await dbPromise : db;
}
