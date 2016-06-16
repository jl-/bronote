import lf from 'lovefield';
import { TBN_CHAPTER, TBN_PAGE } from 'configs/app';
export default function buildPageSchema(schemaBuilder) {
  schemaBuilder.createTable(TBN_PAGE)
    .addColumn('id', lf.Type.INTEGER)
    .addColumn('chapter_id', lf.Type.INTEGER)
    .addColumn('name', lf.Type.STRING)
    .addColumn('created_at', lf.Type.DATE_TIME)
    .addColumn('updated_at', lf.Type.DATE_TIME)
    .addNullable(['updated_at'])
    .addPrimaryKey(['id'], true)
    .addForeignKey('fk_chapter_page_id', {
      local: 'chapter_id',
      ref: `${TBN_CHAPTER}.id`,
      action: lf.ConstraintAction.CASCADE
    });
}

