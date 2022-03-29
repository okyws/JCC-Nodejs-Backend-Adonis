import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Field from "./Field";

export default class Venue extends BaseModel {
  @hasMany(() => Field, {
    foreignKey: "venue_id",
  })

  public fields: HasMany<typeof Field>;
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public address: string;

  @column()
  public phone: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
