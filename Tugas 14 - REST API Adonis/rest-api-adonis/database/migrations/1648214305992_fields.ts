import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Fields extends BaseSchema {
  protected tableName = "fields";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table
        .enum("type", ["futsal", "mini soccer", "basketball"])
        .notNullable()
        .defaultTo("futsal");
      table.integer("venue_id").notNullable().unsigned();
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      // table.timestamp("created_at", { precision: 6 });
      // table.timestamp("updated_at", { precision: 6 });
      table.timestamps(true, true);
    });

    this.schema.alterTable(this.tableName, (table) => {
      table
        .foreign("venue_id")
        .references("id")
        .inTable("venues")
        .onDelete("CASCADE");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
