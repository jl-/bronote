import lf from 'lovefield';
import getDB from 'modules/db';
import uid from 'utils/lib/uid';
import syncWorkspace from 'modules/helpers/sync-workspace';
import {
  TBN_NOTEBOOK
} from 'configs/app';

export async function createNotebook(data) {
  const db = await getDB();
  const table = db.getSchema().table(TBN_NOTEBOOK);
  const row = table.createRow({
    ...data,
    created_at: new Date()
  });
  return db.insert().into(table).values([row]).exec().then(res => {
    const notebook = res && res[0];
    if (!notebook) throw Error('create notebook failed');
    syncWorkspace({
      notebookId: notebook.id,
      chapterId: null,
      pageId: null
    });
    return notebook;
  });
}

export async function updateNotebook(notebook) {
  const db = await getDB();
}

export async function fetchNotebooks() {
  const db = await getDB();
  const notebookTable = db.getSchema().table(TBN_NOTEBOOK);
  return await db.select()
    .from(notebookTable)
    //.where(notebookTable.id.gte(3))
    .orderBy(notebookTable.id, lf.Order.ASC)
    .exec();
}
