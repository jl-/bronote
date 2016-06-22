import lf from 'lovefield';
import getDB from 'modules/db';
import uid from 'utils/lib/uid';
import {
  TBN_NOTEBOOK, TBN_CHAPTER, TBN_PAGE
} from 'configs/app';
import {
  genChapterName, genPageName
} from 'modules/helpers/name-gen';
import genRandomTheme from 'modules/helpers/gen-theme';

export async function createNotebook(data = {}) {
  const db = await getDB();
  const table = db.getSchema().table(TBN_NOTEBOOK);
  const row = table.createRow({
    order: 1,
    theme: genRandomTheme().value,
    ...data,
    createdAt: new Date()
  });
  const [notebook] = await db.insert().into(table).values([row]).exec();
  if (!notebook) throw Error('create notebook failed');
  const { chapter, page } = await createChapter(notebook.id, { name: genChapterName() });
  return { notebook, chapter, page };
}

export async function createChapter(notebookId, data = {}) {
  const db = await getDB();
  const table = db.getSchema().table(TBN_CHAPTER);
  const row = table.createRow({
    notebookId,
    order: 1,
    name: genChapterName(),
    theme: genRandomTheme().value,
    ...data,
    createdAt: new Date()
  });
  const [chapter] = await db.insert().into(table).values([row]).exec();
  if (!chapter) throw Error('create notebook chapter failed');
  const page = await createPage(notebookId, chapter.id, { name: genPageName() });
  return { chapter, page };
}

export async function createPage(notebookId, chapterId, data = {}) {
  const db = await getDB();
  const table = db.getSchema().table(TBN_PAGE);
  const row = table.createRow({
    notebookId, chapterId,
    order: 1,
    name: genPageName(),
    ...data,
    createdAt: new Date()
  });
  const [page] = await db.insert().into(table).values([row]).exec();
  if (!page) throw Error('create notebook chapter page failed');
  return page;
}

export async function updateNotebook(notebook) {
  const db = await getDB();
}

export async function fetchNotebooks() {
  const db = await getDB();
  const notebookTable = db.getSchema().table(TBN_NOTEBOOK);
  const notebooks = await db.select()
    .from(notebookTable)
    .orderBy(notebookTable.id, lf.Order.ASC)
    .exec();
  return notebooks;
}
export async function fetchNotebook(notebookId) {
  const db = await getDB();
  const notebookTable = db.getSchema().table(TBN_NOTEBOOK);
  const [notebook] = await db.select()
    .from(notebookTable)
    .where(notebookTable.id.eq(notebookId))
    .limit(1)
    .exec();
  const chapters = await fetchChapters(notebookId);
  return { notebook, chapters };
}

export async function fetchChapters(notebookId) {
  const db = await getDB();
  const chapterTable = db.getSchema().table(TBN_CHAPTER);
  const chapters = await db.select()
    .from(chapterTable)
    .where(chapterTable.notebookId.eq(notebookId))
    .orderBy(chapterTable.order, lf.Order.ASC)
    .exec();
  return chapters;
}
export async function fetchChapter(chapterId) {
  const db = await getDB();
  const chapterTable = db.getSchema().table(TBN_CHAPTER);
  const [chapter] = await db.select()
    .from(chapterTable)
    .where(chapterTable.id.eq(chapterId))
    .limit(1)
    .exec();
  const pages = await fetchPages(chapterId);
  return { chapter, pages };
}

export async function fetchPages(chapterId) {
  const db = await getDB();
  const pageTable = db.getSchema().table(TBN_PAGE);
  const pages = await db.select()
    .from(pageTable)
    .where(pageTable.chapterId.eq(chapterId))
    .orderBy(pageTable.order, lf.Order.ASC)
    .exec();
  return pages;
}
export async function fetchPage(pageId) {
  const db = await getDB();
  const pageTable = db.getSchema().table(TBN_PAGE);
  const [page] = await db.select()
    .from(pageTable)
    .where(pageTable.id.eq(pageId))
    .limit(1)
    .exec();
  return page;
}
