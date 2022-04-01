import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class UsersSchema extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name", 30).notNullable();
      table.string("email", 255).notNullable();
      table.string("password", 180).notNullable();
      table.boolean("is_verified").defaultTo(false);
      table
        .enum("role", ["admin", "owner", "user"])
        .notNullable()
        .defaultTo("user");
      table.string("remember_me_token").nullable();

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      // table.timestamp("created_at", { useTz: true }).notNullable();
      // table.timestamp("updated_at", { useTz: true }).notNullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
