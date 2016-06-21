import lf from 'lovefield';
import { TBN_NOTEBOOK, TBN_CHAPTER } from 'configs/app';
export default function buildChapterSchema(schemaBuilder) {
  schemaBuilder.createTable(TBN_CHAPTER)
    .addColumn('id', lf.Type.INTEGER)
    .addColumn('notebookId', lf.Type.INTEGER)
    .addColumn('name', lf.Type.STRING)
    .addColumn('theme', lf.Type.STRING)
    .addColumn('order', lf.Type.INTEGER)
    .addColumn('createdAt', lf.Type.DATE_TIME)
    .addColumn('updatedAt', lf.Type.DATE_TIME)
    .addNullable(['updatedAt'])
    .addPrimaryKey(['id'], true)
    .addForeignKey('fk_notebook_chapter_id', {
      local: 'notebookId',
      ref: `${TBN_NOTEBOOK}.id`,
      action: lf.ConstraintAction.CASCADE
    });
}

