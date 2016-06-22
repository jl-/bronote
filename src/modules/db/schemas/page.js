import lf from 'lovefield';
import { TBN_CHAPTER, TBN_PAGE } from 'configs/app';
export default function buildPageSchema(schemaBuilder) {
  schemaBuilder.createTable(TBN_PAGE)
    .addColumn('id', lf.Type.INTEGER)
    .addColumn('chapterId', lf.Type.INTEGER)
    .addColumn('name', lf.Type.STRING)
    .addColumn('content', lf.Type.STRING)
    .addColumn('order', lf.Type.INTEGER)
    .addColumn('createdAt', lf.Type.DATE_TIME)
    .addColumn('updatedAt', lf.Type.DATE_TIME)
    .addNullable(['updatedAt'])
    .addNullable(['content'])
    .addPrimaryKey(['id'], true)
    .addForeignKey('fk_chapter_page_id', {
      local: 'chapterId',
      ref: `${TBN_CHAPTER}.id`,
      action: lf.ConstraintAction.CASCADE
    });
}

