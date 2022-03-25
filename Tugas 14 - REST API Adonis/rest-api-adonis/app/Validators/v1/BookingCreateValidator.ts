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
    name: schema.string({}, [
      rules.alpha({
        allow: ["space"],
      }),
      rules.maxLength(20),
    ]),
    nameVenue: schema.string({}, [rules.maxLength(20)]),
    playDate: schema.date(
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
      [rules.after('today')]
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
    'name.required': 'Nama harus diisi!',
    'name.alpha': 'Nama tidak boleh mengandung simbol dan angka',
    'name.maxLength': 'Nama tidak boleh lebih dari 20 huruf',
    'nameVenue.required': 'Nama Venue harus diisi!',
    'nameVenue.maxLength': 'Nama Venue tidak boleh lebih dari 20 huruf',
    'playDate.required': 'Tanggal Main harus diisi!',
    'playDate.after': 'Tanggal Main minimal 1 hari sebelum!',
    'playDate.date.format': 'Format tanggal dan waktu yang anda masukan salah! (format: "yyyy-MM-dd HH:mm:ss")',
  };
}
