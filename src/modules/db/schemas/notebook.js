import lf from 'lovefield';
import { TBN_NOTEBOOK } from 'configs/app';
export default function buildNotebookSchema(schemaBuilder) {
  schemaBuilder.createTable(TBN_NOTEBOOK)
    .addColumn('id', lf.Type.INTEGER)
    .addColumn('name', lf.Type.STRING)
    .addColumn('created_at', lf.Type.DATE_TIME)
    .addColumn('updated_at', lf.Type.DATE_TIME)
    .addPrimaryKey(['id'], true)
    .addNullable(['updated_at']);
}
