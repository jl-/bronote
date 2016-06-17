import db from 'modules/db';

export function fetchNotebooks() {
  return db.allDocs({
    include_docs: true
  });
}
