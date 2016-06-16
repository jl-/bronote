import lf from 'lovefield';
import { TBN_NOTEBOOK, TBN_CHAPTER } from 'configs/app';
export default function buildChapterSchema(schemaBuilder) {
  schemaBuilder.createTable(TBN_CHAPTER)
    .addColumn('id', lf.Type.INTEGER)
    .addColumn('notebook_id', lf.Type.INTEGER)
    .addColumn('name', lf.Type.STRING)
    .addColumn('created_at', lf.Type.DATE_TIME)
    .addColumn('updated_at', lf.Type.DATE_TIME)
    .addNullable(['updated_at'])
    .addPrimaryKey(['id'], true)
    .addForeignKey('fk_notebook_chapter_id', {
      local: 'notebook_id',
      ref: `${TBN_NOTEBOOK}.id`,
      action: lf.ConstraintAction.CASCADE
    });
}

