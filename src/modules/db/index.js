import lf from 'lovefield';
import { DB_NAME, DB_VERSION } from 'configs/app';
import buildNotebookSchema from './schemas/notebook';
import buildChapterSchema from './schemas/chapter';
import buildPageSchema from './schemas/page';

// indexedDB.deleteDatabase(DB_NAME);

const schemaBuilder = lf.schema.create(DB_NAME, DB_VERSION);
buildNotebookSchema(schemaBuilder);
buildChapterSchema(schemaBuilder);
buildPageSchema(schemaBuilder);


let db = null;
const dbPromise = schemaBuilder.connect(_db => {
  db = _db;
  return db;
});

export default async function getDB() {
  return db === null ? await dbPromise : db;
}
