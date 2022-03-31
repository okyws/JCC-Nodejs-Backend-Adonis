import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  computed,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Field from "App/Models/Field";
import User from "App/Models/User";

export default class Booking extends BaseModel {
  // public serializeExtras = true

  @column({ isPrimary: true })
  public id: number;

  @column()
  public fieldId: number;

  @column()
  public userId: number;

  @column.dateTime()
  public playDateStart: DateTime;

  @column.dateTime()
  public playDateEnd: DateTime;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @belongsTo(() => Field)
  public fields: BelongsTo<typeof Field>;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @manyToMany(() => User, {
    pivotTable: 'schedules'
  })
  public players: ManyToMany<typeof User>;

  @computed()
  public get players_count() {
    return this.players.length
  }
}
