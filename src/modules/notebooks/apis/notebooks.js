import lf from 'lovefield';
import getDB from 'modules/db';
import uid from 'utils/lib/uid';
import {
  TBN_NOTEBOOK
} from 'configs/app';

export async function createNotebook(data) {
  const db = await getDB();
  const table = db.getSchema().table(TBN_NOTEBOOK);
  const notebook = table.createRow({
    ...data,
    created_at: new Date()
  });
  return db.insert().into(table).values([notebook]).exec();
}

export async function updateNotebook(notebook) {
  const db = await getDB();
}

export async function fetchNotebooks() {
  const db = await getDB();
  const notebookTable = db.getSchema().table(TBN_NOTEBOOK);
  return await db.select()
    .from(notebookTable)
    .where(notebookTable.id.gte(3))
    .orderBy(notebookTable.id, lf.Order.DESC)
    .exec();
}
