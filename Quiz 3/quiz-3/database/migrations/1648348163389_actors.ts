import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Actors extends BaseSchema {
  protected tableName = "actors";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.text("bio").notNullable();
      table.dateTime("date_of_birth", { useTz: true }).notNullable();;

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true);
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
