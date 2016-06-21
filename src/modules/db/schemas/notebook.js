import lf from 'lovefield';
import { TBN_NOTEBOOK } from 'configs/app';
export default function buildNotebookSchema(schemaBuilder) {
  schemaBuilder.createTable(TBN_NOTEBOOK)
    .addColumn('id', lf.Type.INTEGER)
    .addColumn('name', lf.Type.STRING)
    .addColumn('theme', lf.Type.STRING)
    .addColumn('order', lf.Type.INTEGER)
    .addColumn('createdAt', lf.Type.DATE_TIME)
    .addColumn('updatedAt', lf.Type.DATE_TIME)
    .addNullable(['updatedAt'])
    .addPrimaryKey(['id'], true);
}
