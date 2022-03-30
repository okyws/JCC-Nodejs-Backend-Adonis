import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Field from "./Field";
import User from "./User";

export default class Booking extends BaseModel {
  @belongsTo(() => Field, {
    foreignKey: "field_id",
  })
  public fields: BelongsTo<typeof Field>;
  
  @belongsTo(() => User, {
    foreignKey: "booking_user_id",
  })
  public users: BelongsTo<typeof User>;

  @hasMany(() => User, {
    foreignKey: "id"
  })
  public bookings: HasMany<typeof User>

  @column({ isPrimary: true })
  public id: number;

  @column()
  public field_id: number;

  @column()
  public booking_user_id: number;

  @column()
  public players_count: number;

  @column.dateTime()
  public play_date_start: DateTime;

  @column.dateTime()
  public play_date_end: DateTime;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
}
