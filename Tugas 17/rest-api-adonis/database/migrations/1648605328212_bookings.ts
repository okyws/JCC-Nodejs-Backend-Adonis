import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Bookings extends BaseSchema {
  protected tableName = "bookings";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary().notNullable();
      table
        .integer("field_id")
        .unsigned()
        .references("id")
        .inTable("fields")
        .notNullable()
        .onDelete("CASCADE");
      table.dateTime("play_date_start").notNullable();
      table.dateTime("play_date_end").notNullable();
      table
        .integer("booking_user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.integer("players_count").notNullable().unsigned();
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
