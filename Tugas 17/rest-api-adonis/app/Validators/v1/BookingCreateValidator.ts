import { rules, schema } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BookingCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    // field_id: schema.number([
    //   rules.unsigned(),
    // ]),
    // user_id: schema.number([
    //   rules.unsigned(),
    // ]),
    // players_count: schema.number([
    //   rules.unsigned(),
    // ]),
    play_date_start: schema.date(
      {
        format: "yyyy-MM-dd HH:mm:ss",
        /**
         * sample value date "yyyy-MM-dd HH:mm:ss"
         * 2022-03-28 08:30:00
         *
         * sample value date "yyyy-MM-dd"
         * 2022-03-28
         * */
      },
      [rules.beforeField("play_date_end"), rules.after("today")]
    ),
    play_date_end: schema.date(
      {
        format: "yyyy-MM-dd HH:mm:ss",
        /**
         * sample value date "yyyy-MM-dd HH:mm:ss"
         * 2022-03-28 08:30:00
         *
         * sample value date "yyyy-MM-dd"
         * 2022-03-28
         * */
      },
      [rules.afterField("play_date_start")]
    ),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    // 'field_id.required': 'Id Arena harus diisi!',
    // 'field_id.number':'Id Arena harus berupa angka',
    // 'field_id.unsigned':'Id Arena harus berupa bilangan positif',
    // 'user_id.required': 'User Id harus diisi!',
    // 'user_id.number':'User Id harus berupa angka',
    // 'user_id.unsigned':'User Id harus berupa bilangan positif',
    // 'players_count.required': 'Jumlah pemain harus diisi!',
    // 'players_count.number':'Jumlah pemain harus berupa angka',
    // 'players_count.unsigned':'Jumlah pemain harus berupa bilangan positif',
    "play_date_start.required":
      'Tanggal Main harus diisi! (format: "yyyy-MM-dd HH:mm:ss")',
    "play_date_start.after": "Tanggal Main minimal 1 hari sebelum!",
    "play_date_start.date.format":
      "Tanggal harus sesuai format yyyy-MM-dd HH:mm:ss",
    "play_date_start.beforeField":
      "Waktu main tidak boleh sama dengan waktu selesai, dan tidak boleh sama dengan setelah waktu selesai!",
    "play_date_end.required":
      'Tanggal Main harus diisi! (format: "yyyy-MM-dd HH:mm:ss")',
    "play_date_end.after": "Tanggal selesai minimal 1 hari sebelum!",
    "play_date_end.date.format":
      "Tanggal harus sesuai format yyyy-MM-dd HH:mm:ss",
    "play_date_end.afterField":
      "Waktu selesai tidak boleh sama dengan waktu main, dan tidak boleh sama dengan sebelum waktu main!",
  };
}
