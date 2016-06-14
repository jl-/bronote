import db from 'modules/db';
import uid from 'utils/lib/uid';
import {
  NOTEBOOK_DOC_PREFIX
} from 'configs/app';
export function createNotebook(notebook) {
  const created_at = new Date();
  return db.put({
    _id: `${NOTEBOOK_DOC_PREFIX}${created_at.getTime()}_${uid()}`,
    created_at,
    ...notebook
  });
}

export function fetchNotebooks() {
  return db.find({
    selector: {
      _id: { $gte: NOTEBOOK_DOC_PREFIX }
    },
  });
}
