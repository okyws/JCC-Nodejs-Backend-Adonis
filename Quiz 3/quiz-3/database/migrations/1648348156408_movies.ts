import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Movies extends BaseSchema {
  protected tableName = "movies";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("title").notNullable();
      table.text("resume").notNullable();
      table.dateTime("release_date", { useTz: true });
      table
        .integer("genre_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("genres")
        .onDelete("CASCADE");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.timestamps(true, true);
      // table.timestamp("created_at", { useTz: true });
      // table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
